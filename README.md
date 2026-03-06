# Graph Neural Network for Heart Disease Prediction using ECG Images

## Project Overview

Heart disease is one of the leading causes of mortality worldwide. Early detection can significantly improve treatment outcomes. This project proposes a **Graph Neural Network (GNN)** based deep learning approach to predict the presence of heart disease using **ECG (Electrocardiogram) images**.

The system converts ECG image features into a **graph representation**, allowing the model to learn relationships between signal components and detect abnormal cardiac patterns. By leveraging the power of **Graph Neural Networks**, the model captures structural dependencies in ECG signals that traditional models may overlook.

---

## Problem Statement

Most existing approaches for heart disease detection rely on conventional machine learning models or convolutional neural networks that treat ECG signals independently. However, ECG signals contain **interconnected patterns and temporal relationships**.

This project explores how **Graph Neural Networks can model these relationships effectively**, enabling improved prediction of heart disease conditions.

---

## Key Features

* Automated heart disease prediction from ECG images
* Graph-based representation learning for ECG signals
* Deep learning model built using **Graph Neural Networks (GNN)**
* End-to-end pipeline including preprocessing, graph construction, training, and evaluation
* Designed for scalable medical AI research and healthcare applications

---

## Dataset

The dataset consists of **ECG images representing cardiac electrical activity**. Each image corresponds to a patient sample labeled with the presence or absence of heart disease.

Typical preprocessing steps include:

* Image normalization
* Feature extraction from ECG signals
* Graph construction from extracted features

---

## Model Architecture

The proposed system follows a **Graph Neural Network pipeline**:

1. **ECG Image Preprocessing**

   * Resize and normalize ECG images
   * Extract relevant signal features

2. **Graph Construction**

   * Convert ECG signal features into nodes
   * Define edges based on signal relationships

3. **Graph Neural Network**

   * Graph Convolution Layer
   * Non-linear activation (ReLU)
   * Feature aggregation
   * Fully connected classification layer

4. **Prediction Output**

   * Heart Disease
   * No Heart Disease

The GNN learns node representations by performing **message passing between connected nodes**, capturing structural dependencies in ECG signals.

---

## Tech Stack

* **Python**
* **PyTorch**
* **PyTorch Geometric**
* **NumPy**
* **OpenCV / Image Processing Libraries**

---

## Installation

Clone the repository:

---
git clone https://github.com/Nikhitha25135/GNN-HF.git
cd GNN-HF
---

Install required libraries:

---
pip install torch torch-geometric numpy opencv-python
---

---

## Results

The Graph Neural Network model successfully learns structural relationships within ECG signals and predicts heart disease with promising performance.

Example evaluation metrics:

| Metric    | Score |
| --------- | ----- |
| Accuracy  | 85%   |
| Precision | 83%   |
| Recall    | 86%   |

---

## Future Improvements

* Integrate **Graph Attention Networks (GAT)** for improved feature learning
* Support **real-time ECG monitoring systems**
* Deploy the model as a **web-based healthcare diagnostic tool**
* Train on larger multi-hospital ECG datasets

---

## Applications

* AI-assisted medical diagnosis
* Remote cardiac monitoring systems
* Clinical decision support tools
* Healthcare research in cardiology

---

## Conclusion

This project demonstrates the potential of **Graph Neural Networks in medical AI**, particularly for analyzing ECG data and detecting heart disease patterns. By modeling relationships within ECG signals as graphs, the system provides a powerful approach for improving automated cardiac diagnosis.
