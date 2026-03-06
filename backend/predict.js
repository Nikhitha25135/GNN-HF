import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { runPythonScript } from "./utils/runPython.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.resolve(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`)
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

router.post("/", (req, res, next) => {
  console.log("🎯 POST /api/predict hit");
  upload.single("ecgImage")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error("❌ Multer Error:", err.message);
      return res.status(400).json({
        status: "error",
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      console.error("❌ Upload middleware error:", err);
      return res.status(400).json({
        status: "error",
        message: `Upload error: ${err.message}`
      });
    }
    next();
  });
}, async (req, res) => {
  try {
    console.log("📥 Prediction request received");
    console.log("📦 req.file exists:", !!req.file);
    console.log("📦 typeof req.file:", typeof req.file);
    
    if (!req.file) {
      console.error("❌ No file was uploaded");
      return res.status(400).json({
        status: "error",
        message: "No file uploaded"
      });
    }

    // CRITICAL: Capture filename BEFORE anything else
    const filename = req.file.filename;
    const originalname = req.file.originalname;
    
    console.log("📄 File details:");
    console.log("  - filename:", filename);
    console.log("  - typeof filename:", typeof filename);
    console.log("  - filename is empty:", filename === "");
    console.log("  - originalname:", originalname);
    console.log("  - path:", req.file.path);
    console.log("  - size:", req.file.size);

    if (!filename || filename === "") {
      console.error("❌ CRITICAL: filename is empty or undefined!");
      console.error("❌ Full req.file object:", req.file);
      return res.status(400).json({
        status: "error",
        message: "File upload failed - filename not captured"
      });
    }

    const filePath = req.file.path;

    // Python script
    const script = path.resolve(__dirname, "ml", "predict_ecg.py");

    const result = await runPythonScript(script, [filePath], {
      timeoutMS: 45000
    });

    if (result.code !== 0) {
      console.error("❌ Python execution failed");
      console.error("stderr:", result.stderr);
      return res.status(500).json({
        status: "error",
        message: "Python execution failed",
        stderr: result.stderr
      });
    }

    let parsed = JSON.parse(result.stdout);

    // ⭐⭐ RETURN IMAGE PATH IN RESPONSE ⭐⭐
    const imagePath = `/uploads/${filename}`;
    parsed.imagePath = imagePath;
    
    console.log("✅ Prediction successful");
    console.log("✅ imagePath set to:", imagePath);
    console.log("✅ filename used:", filename);
    console.log("📊 Full result:", JSON.stringify(parsed, null, 2));

    return res.json({
      status: "success",
      result: parsed
    });

  } catch (err) {
    console.error("❌ PREDICTION ERROR:", err.message);
    console.error("Error stack:", err.stack);
    return res.status(500).json({
      status: "error",
      message: "Server error during prediction",
      details: err.toString()
    });
  }
});

export default router;
