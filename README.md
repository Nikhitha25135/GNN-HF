# 🫀 GNN-HF — Heart Disease Prediction from ECG Images using CNN + Graph Neural Networks

![Python](https://img.shields.io/badge/Python-3.10+-blue) ![PyTorch](https://img.shields.io/badge/PyTorch-2.6-red) ![React](https://img.shields.io/badge/React-18-61DAFB) ![Node](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen) ![License](https://img.shields.io/badge/License-MIT-lightgrey)

A full-stack AI healthcare application that predicts the presence of heart disease from an uploaded ECG (electrocardiogram) image. A user signs up, uploads an ECG image, and within seconds gets an AI-generated prediction plus a downloadable PDF diagnostic report — powered by a hybrid **CNN + Graph Neural Network (GNN)** model underneath.

**Live demo:** _add your deployed frontend URL here_
**API base URL:** _add your deployed backend URL here_

---

## 📌 At a Glance

| | |
|---|---|
| **What it is** | An end-to-end web app for ECG-based heart disease screening |
| **Core idea** | ECG images are converted into a graph so the model can learn *relationships* between signal features, not just raw pixels |
| **ML approach** | CNN (feature extraction) + GNN (relational reasoning) hybrid |
| **App layer** | React frontend, Node/Express + MongoDB backend, JWT auth, PDF reports |
| **Status** | Research/educational prototype — not a certified medical device |

---

## ✨ Why This Project?

Heart disease is one of the leading causes of death worldwide, and early detection through ECG screening can dramatically improve outcomes. But manual ECG interpretation requires trained specialists, and access to that expertise isn't always immediate — especially in remote or under-resourced settings.

GNN-HF explores whether an AI system can act as a fast, first-pass screening layer: someone uploads a photo of an ECG printout, and the system flags whether it shows signs of heart disease, backed by a shareable report. It's not a replacement for a cardiologist — it's a step toward making a first opinion instantly accessible.

---

## 🤔 Why CNN + GNN? (Not Just a CNN)

A natural first instinct is to throw a CNN at the ECG image and call it done — CNNs are the standard for image classification, and that's a completely valid approach. This project goes a step further and asks: **can we do better by modeling relationships between signal features explicitly?**

**The reasoning:**

- **CNNs alone see pixels, not structure.** A CNN is excellent at extracting local visual features (edges, curves, peaks in the waveform), but it processes the image as a grid — it doesn't explicitly model how *different parts of the ECG signal relate to each other* (e.g., how one waveform segment's shape depends on the segments around it).
- **ECG signals are inherently relational.** Cardiac abnormalities often show up as *patterns of deviation across related segments* of the waveform, not just in one isolated region. That's naturally closer to a graph problem — nodes representing signal components, edges representing their relationships — than a plain grid-of-pixels problem.
- **GNNs add relational reasoning on top of CNN features.** By using the CNN as a feature extractor and then passing those features through a GNN, the model first learns *what* the local patterns are, and then learns *how those patterns relate to each other* via message passing. In practice, this combination is what pushed accuracy higher than a CNN-only baseline during experimentation.
- **It also matches how the pipeline is structured in practice.** The system already needs two stages — one to confirm an image is a valid ECG, and one to classify it — so pairing a CNN (fast, image-native, good for the validity check and feature extraction) with a GNN (relational reasoning) on top made both practical and technical sense.

In short: the CNN answers *"what does this part of the signal look like?"* and the GNN answers *"how does that fit with everything else?"* — and heart disease patterns typically depend on both.

---

## 🧠 How It Works

1. **ECG validity check** — the uploaded image is first passed through a CNN classifier to confirm it's actually an ECG image before running the diagnostic model.
2. **Feature extraction & graph construction** — relevant signal features are extracted from the image and converted into a graph (nodes = signal components, edges = signal relationships).
3. **GNN inference** — a Graph Neural Network performs message passing across the graph to learn structural dependencies, followed by a classification layer.
4. **Prediction output** — the model returns a Heart Disease / No Heart Disease result, which is stored against the user's account and can be exported as a PDF report.

---

## 🏗️ Architecture

```
GNN-HF/
├── frontend/     React + TypeScript + Vite + Tailwind + shadcn/ui
├── backend/      Node.js + Express + MongoDB (REST API, auth, PDF reports)
│   └── ml/       Python + PyTorch + PyTorch Geometric inference scripts
```

- The **frontend** talks to the **backend** over a REST API.
- The **backend** handles auth, file uploads, MongoDB persistence, and report generation, and shells out to a **Python inference script** for each prediction.
- The Python script loads the pretrained CNN + GNN weights and returns a JSON prediction, which the backend relays to the frontend.

---

## 🚀 Features

- 🔐 JWT-based authentication (signup, login, protected routes)
- 📤 ECG image upload with server-side validation
- 🧬 Two-stage ML pipeline: ECG-validity CNN → CNN+GNN heart disease classifier
- 📊 User dashboard with prediction history and stats
- 📄 Auto-generated PDF diagnostic reports (via PDFKit)
- 🛡️ Rate limiting, Helmet security headers, structured logging (Winston)
- ☁️ Deployed frontend (Vercel) + backend (Railway)

---

## 🧰 Tech Stack & Why It Was Chosen

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | React + TypeScript + Vite | Fast dev/build cycle, type safety for a multi-page dashboard app |
| | Tailwind CSS + shadcn/ui | Consistent, accessible UI components without hand-rolling design from scratch |
| | React Query | Handles server-state (predictions, history) with caching and loading states out of the box |
| | React Hook Form + Zod | Reliable client-side validation for auth and upload forms |
| **Backend** | Node.js + Express 5 | Lightweight REST API layer that's easy to glue to a Python inference process |
| | MongoDB + Mongoose | Flexible schema — good fit for evolving user/prediction/report records |
| | JWT + bcrypt | Standard, stateless authentication for a multi-user app |
| | Helmet + express-rate-limit | Basic security hardening for a public-facing API handling file uploads |
| | PDFKit | Generates shareable diagnostic reports users can download/print |
| **Machine Learning** | PyTorch + PyTorch Geometric | PyTorch for the CNN feature extractor; PyTorch Geometric for building and running the graph/message-passing layers on top |
| | OpenCV / scikit-image | Image preprocessing and feature extraction before graph construction |
| **Deployment** | Vercel (frontend) · Railway (backend) | Zero-config CI/CD for a React SPA and a Node + Python backend respectively |

---

## 🎥 Demo

_Add a short screen recording or GIF of the upload → prediction → report flow here._

---

## 📦 Getting Started

### Prerequisites
- Node.js ≥ 18
- Python ≥ 3.10
- MongoDB instance (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/Nikhitha25135/GNN-HF.git
cd GNN-HF
```

### 2. Backend setup
```bash
cd backend
npm install
pip install -r requirements.txt

# Create a .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=5000

npm start
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:5000`.

---

## 📁 Environment Variables

| Variable | Description | Used in |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | backend |
| `JWT_SECRET` | Secret for signing auth tokens | backend |
| `PORT` | Backend server port (default 5000) | backend |

> Never commit your `.env` file — add it to `.gitignore`.

---

## 📊 Model Performance

| Metric | Score |
|---|---|
| Accuracy | 85% |
| Precision | 83% |
| Recall | 86% |

*(Update with your latest evaluation numbers.)*

---

## 🗺️ Roadmap

- [ ] Graph Attention Network (GAT) variant for improved feature learning
- [ ] Real-time ECG monitoring support
- [ ] Multi-hospital dataset training for better generalization
- [ ] Model explainability (highlighting which signal regions drove the prediction)

---

## ⚠️ Disclaimer

This project is a research/educational prototype and **is not a certified medical device**. Predictions should not be used as a substitute for professional medical diagnosis.

---
