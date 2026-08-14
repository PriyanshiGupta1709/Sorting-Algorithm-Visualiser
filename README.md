# Sorting Algorithm Visualizer 🚀

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://sorting-algorithm-visualiser-delta.vercel.app/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)](https://nginx.org/)

**Live Demo:** [sorting-algorithm-visualiser-delta.vercel.app](https://sorting-algorithm-visualiser-delta.vercel.app/)

An interactive web application built with **React** to visualize and compare the efficiency of various sorting algorithms in real-time. This project was developed to bridge the gap between theoretical time complexity and practical execution, complete with a containerized production deployment using **Docker** and **Nginx**.

---

## ✨ Key Features

- **Dual-Array Comparison:** A unique "Compare Mode" that allows two different algorithms to run side-by-side on identical datasets.
- **Real-Time Animation:** Visual feedback using color-coded bars to represent comparisons, swaps, and sorted states.
- **Customizable Controls:** 
  - Dynamic sorting speed adjustment (5ms to 100ms).
  - One-click random array generation with custom size controls.
  - Seamless toggle between single-view and dual-comparison mode.
- **Responsive Interface:** Dedicated control sidebar built with CSS Grid and Flexbox for intuitive navigation.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, JavaScript (ES6+), CSS3
- **Containerization & Deployment:** Docker (Multi-stage Build), Nginx Alpine, Vercel
- **Algorithms Implemented:**
  - **Merge Sort:** $O(n \log n)$
  - **Quick Sort:** $O(n \log n)$ avg / $O(n^2)$ worst
  - **Heap Sort:** $O(n \log n)$
  - **Insertion Sort:** $O(n^2)$
  - **Bubble Sort:** $O(n^2)$

---

## 🐳 Running with Docker

This application utilizes an optimized **multi-stage Docker build**:
1. **Build Stage:** Compiles the React application in a Node.js environment.
2. **Production Stage:** Serves the compiled static bundle using a lightweight **Alpine Nginx** image (~25MB), drastically reducing attack surface and eliminating Node.js runtime overhead.

### 1. Pull & Run Directly from Docker Hub (Zero Setup)
```bash
# Pull and run the container
docker run -d -p 3000:80 <YOUR_DOCKERHUB_USERNAME>/algo-visualizer:latest
