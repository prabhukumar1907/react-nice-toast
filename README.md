# 🍞 react-nice-toast

A lightweight, elegant, and customizable **React toast notification** library — built with **React + TypeScript + Vite**.  
Easily show success, error, and info messages with smooth animations and Tailwind-based styling.

---

## ✨ Features

- ⚡ Built with Vite + TypeScript  
- 🎨 Beautiful default styles (Tailwind CSS)  
- 🧩 Fully customizable toast content and position  
- ⏱️ Auto-dismiss & manual close options  
- 🔄 Supports multiple concurrent toasts  
- 🪄 Easy integration with any React project  

---

## 📦 Installation

Install via npm, yarn, or pnpm:

```bash
npm install react-nice-toast
# or
yarn add react-nice-toast
# or
pnpm add react-nice-toast

⚙️ Basic Usage
1️⃣ Add the ToastContainer in your app entry (e.g. main.tsx)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer, Position } from "react-nice-toast";
import "react-nice-toast/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ToastContainer position={Position.TOP_RIGHT} maxToasts={5} />
  </React.StrictMode>
);
