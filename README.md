# react-nice-toast

A lightweight, customizable toast notification system for React. Supports multiple toast types, promise-based toasts, positions, and transitions.  

---

## Installation

```bash
npm install react-nice-toast
# or
yarn add react-nice-toast

Also, import the default styles:

import "react-nice-toast/styles.css";


Usage

Import the Toast components:

import { ToastContainer, toast, Position } from "react-nice-toast";


Basic Example

function App() {
  return (
    <div>
      <ToastContainer
        position={Position.TOP_RIGHT}
        maxToasts={5}
        closeOnClick={true}
        pauseOnHover={true}
        theme="dark"
        transition="bounce"
        showProgressBar={false}
        showIcon={false}
      />

      <button onClick={() => toast.success("Operation completed successfully!")}>
        Show Success
      </button>

      <button onClick={() => toast.error("Something went wrong!")}>
        Show Error
      </button>
    </div>
  );
}

Toast Types

You can trigger different types of toasts:

toast.success(message, options?)

toast.error(message, options?)

toast.warning(message, options?)

toast.info(message, options?)

toast.loading(message, options?)

toast.update(message, options?)

toast.delete(message, options?)

toast.upload(message, options?)

toast.download(message, options?)

toast.network(message, options?)

toast.offline(message, options?)

toast(message, options?) — generic/custom toast

Options

duration — Time in milliseconds before toast disappears (default: 3000)

className — Custom CSS class

showIcon — Show or hide the icon

pauseOnHover — Pause toast timer when hovering

closeOnClick — Close toast when clicked


Promise Toasts

Attach toasts to promises:

const fakeApiCall = new Promise<string>((resolve, reject) => {
  setTimeout(() => resolve("Data loaded!"), 2000);
});

toast.promise(fakeApiCall, {
  loading: "Loading data...",
  success: "Data loaded successfully!",
  error: "Failed to load data!",
});

Automatically shows loading, then success or error.

Clear All Toasts
toast.clear(); - Removes all active toasts.

Positions

TOP_LEFT: 'top-left',
TOP_CENTER: 'top-center',
TOP_RIGHT: 'top-right',
BOTTOM_LEFT: 'bottom-left',
BOTTOM_CENTER: 'bottom-center',
BOTTOM_RIGHT: 'bottom-right',


Transitions

Available transitions:
"slide" | "zoom" | "bounce" | "fade"

Example App
import React from "react";
import { ToastContainer, toast, Position } from "react-nice-toast";
import "react-nice-toast/styles.css";

function App() {
  const handlePromiseToast = (state: "success" | "error") => {
    const fakeApiCall = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        state === "success" ? resolve("Data loaded successfully!") : reject("Failed to load data!");
      }, 2000);
    });

    toast.promise(fakeApiCall, {
      loading: "Loading data...",
      success: "Data loaded successfully!",
      error: "Failed to load data!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ToastContainer position={Position.TOP_RIGHT} maxToasts={5} theme="dark" transition="bounce" />

      <div className="bg-white p-8 rounded-lg shadow-md space-y-4 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Toast Notifications</h1>

        <button onClick={() => toast.success("Operation completed successfully!")} className="w-full bg-green-500 text-white px-4 py-2 rounded">Success</button>
        <button onClick={() => toast.error("Something went wrong!")} className="w-full bg-red-500 text-white px-4 py-2 rounded">Error</button>
        <button onClick={() => toast.warning("Please be careful!")} className="w-full bg-yellow-500 text-white px-4 py-2 rounded">Warning</button>
        <button onClick={() => toast.info("Here is some information")} className="w-full bg-blue-500 text-white px-4 py-2 rounded">Info</button>
        <button onClick={() => toast.loading("Loading...")} className="w-full bg-gray-400 text-white px-4 py-2 rounded">Loading</button>
        <button onClick={() => toast.update("Update completed!")} className="w-full bg-indigo-500 text-white px-4 py-2 rounded">Update</button>
        <button onClick={() => toast.delete("Item deleted successfully")} className="w-full bg-red-400 text-white px-4 py-2 rounded">Delete</button>
        <button onClick={() => toast.upload("Uploading your files...")} className="w-full bg-purple-500 text-white px-4 py-2 rounded">Upload</button>
        <button onClick={() => toast.download("Download started")} className="w-full bg-cyan-500 text-white px-4 py-2 rounded">Download</button>
        <button onClick={() => toast.network("Network restored")} className="w-full bg-teal-500 text-white px-4 py-2 rounded">Network</button>
        <button onClick={() => toast.offline("You are offline")} className="w-full bg-gray-600 text-white px-4 py-2 rounded">Offline</button>
        <button onClick={() => toast("Custom styled toast", { className: "border-2 border-purple-300", duration: 4000 })} className="w-full bg-purple-700 text-white px-4 py-2 rounded">Custom Toast</button>

        <h2 className="text-xl font-semibold mt-6">Promise Toasts</h2>
        <button onClick={() => handlePromiseToast("success")} className="w-full bg-green-500 text-white px-4 py-2 rounded">Promise Success</button>
        <button onClick={() => handlePromiseToast("error")} className="w-full bg-red-500 text-white px-4 py-2 rounded">Promise Error</button>
        <button onClick={() => toast.promise(new Promise((resolve) => setTimeout(() => resolve("Loaded!"), 2000)), { loading: "Loading...", success: "Loaded!", error: "Error!" })} className="w-full bg-orange-500 text-white px-4 py-2 rounded">Generic Promise</button>

        <button onClick={() => toast.clear()} className="w-full bg-gray-500 text-white px-4 py-2 rounded mt-4">Clear All</button>
      </div>
    </div>
  );
}

export default App;

License

MIT License

Author :- Prabhu Kumar
