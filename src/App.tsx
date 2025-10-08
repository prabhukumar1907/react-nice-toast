import { useState } from "react";
import { ToastContainer, toast, Position } from "./lib/toast";
import { FiStar, FiClock, FiTool, FiPlay, FiArrowRight } from "react-icons/fi";
import {
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  CloudUpload,
  Download,
  WifiOff,
  RefreshCw,
  Loader2,
  ChevronsDown,
} from "lucide-react";

function App() {
  const [playgroundMessage, setPlaygroundMessage] = useState("Hello, Toast!");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [playgroundType, setPlaygroundType] = useState<
    "success" | "error" | "warning" | "info" | "loading" | "update"
  >("success");
  const [playgroundDuration, setPlaygroundDuration] = useState(3000);
  const links = [
    { href: "#features", label: "Features", icon: <FiStar size={18} /> },
    { href: "#demo", label: "Demo", icon: <FiPlay size={18} /> },
    { href: "#promise", label: "Promise Toasts", icon: <FiClock size={18} /> },
    { href: "#playground", label: "Playground", icon: <FiTool size={18} /> },
  ];
  const handlePromiseToast = (state: "success" | "error") => {
    const fakeApiCall = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        state === "success"
          ? resolve("Data loaded successfully!")
          : reject("Failed to load data!");
      }, 2000);
    });

    toast.promise(fakeApiCall, {
      loading: "Loading data...",
      success: "Data loaded successfully!",
      error: "Failed to load data",
    });
  };

  const handlePlaygroundToast = () => {
    switch (playgroundType) {
      case "success":
        toast.success(playgroundMessage, { duration: playgroundDuration });
        break;
      case "error":
        toast.error(playgroundMessage, { duration: playgroundDuration });
        break;
      case "warning":
        toast.warning(playgroundMessage, { duration: playgroundDuration });
        break;
      case "info":
        toast.info(playgroundMessage, { duration: playgroundDuration });
        break;
      case "loading":
        toast.loading(playgroundMessage, { duration: playgroundDuration });
        break;
      case "update":
        toast.update(playgroundMessage, { duration: playgroundDuration });
        break;
      default:
        toast(playgroundMessage, { duration: playgroundDuration });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 text-gray-800">
      <ToastContainer
        position={Position.TOP_RIGHT}
        maxToasts={5}
        closeOnClick
        pauseOnHover
        theme="light"
        transition="slide"
        showProgressBar
        showIcon
      />

      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">
            🎉React-Nice-Toast
          </h1>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-white hover:text-gray-800 font-medium transition-colors hover:shadow-2xl"
              >
                {link.icon} {link.label}
              </a>
            ))}

            <a
              href="#demo"
              className="px-5 py-2 flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white rounded-lg shadow-lg hover:shadow-2xl hover:from-yellow-500 hover:via-orange-500 hover:to-pink-500 font-semibold transition-all"
            >
              Get Started <FiArrowRight size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-black transition-colors focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 shadow-lg">
            <div className="flex flex-col px-6 py-4 space-y-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-white hover:text-black font-medium transition-colors"
                >
                  {link.icon} {link.label}
                </a>
              ))}

              <a
                href="#demo"
                className="px-5 py-2 flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white rounded-lg shadow-lg hover:shadow-2xl hover:from-yellow-500 hover:via-orange-500 hover:to-pink-500 font-semibold transition-all"
              >
                Get Started <FiArrowRight size={20} />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative py-14 shadow-2xl px-6 mb-3 bg-gradient-to-tr from-blue-400 via-teal-400 to-purple-400 text-gray-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full opacity-30 translate-x-1/3 translate-y-1/3"></div>

        {/* Main Content */}
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-md text-white">
            🎉 React-Nice-Toast
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Beautiful, lightweight, and highly customizable toast notifications
            for React. Show success, error, info, loading, promises, and more
            with style!
          </p>

          {/* Installation Commands */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-6">
            {/* NPM Install */}
            <div className="flex items-center gap-2 bg-white py-3 px-5 rounded-xl font-mono shadow-md transition w-full md:w-auto">
              <span className="text-gray-600">
                npm install react-nice-toast
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("npm install react-nice-toast");
                  toast.success("Copied npm install command!");
                }}
                className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 cursor-pointer text-white px-3 py-1 rounded-lg font-semibold shadow-md transition-all hover:brightness-110 hover:shadow-[0_0_12px_rgba(255,170,200,0.6)]"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Import CSS */}
          <div className="max-w-lg mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4">
            <p className="text-gray-700 text-center">
              To apply default styles, import them in your{" "}
              <span className="font-semibold">index.css</span> or{" "}
              <span className="font-semibold">App.css</span>:
            </p>
            <div className="flex items-center gap-2 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg font-mono w-full justify-between">
              <span>import "react-nice-toast/styles.css";</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    'import "react-nice-toast/styles.css";'
                  );
                  toast.success("Copied import statement!");
                }}
                className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 cursor-pointer text-white px-3 py-1 rounded-lg font-semibold shadow-md transition-all hover:brightness-110 hover:shadow-[0_0_12px_rgba(255,170,200,0.6)]"
              >
                Copy
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-4">
            <button
              onClick={() => toast.success("Installation successful!")}
              className="px-6 py-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white cursor-pointer font-bold rounded-full shadow-lg transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,180,200,0.6)]"
            >
              Try Now
            </button>
          </div>

          {/* Footer Note */}
          <p className="mt-2 text-white/80 text-sm">
            Made with ❤️ using React, Tailwind CSS, and Framer Motion
          </p>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-lg flex items-center justify-center">
            <a href="#features">
              {" "}
              <ChevronsDown className="h-6 w-6 text-white cursor-pointer" />
            </a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-6 relative overflow-hidden text-gray-900 bg-transparent shadow-lg"
      >
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-purple-200 rounded-full opacity-30 blur-2xl"></div>

        <h2 className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 drop-shadow-md">
          ✨ Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10">
          {[
            {
              icon: <CheckCircle size={48} className="text-blue-500 mb-4" />,
              title: "Success Toasts",
              desc: "Deliver instant positive feedback with beautiful success messages and icons.",
            },
            {
              icon: <XCircle size={48} className="text-rose-500 mb-4" />,
              title: "Error & Warning",
              desc: "Handle errors and warnings elegantly, making your app more interactive.",
            },
            {
              icon: (
                <Loader2
                  size={48}
                  className="text-teal-500 mb-4 animate-spin"
                />
              ),
              title: "Loading & Promises",
              desc: "Seamlessly integrate async actions with promise-based notifications.",
            },
            {
              icon: <CloudUpload size={48} className="text-purple-500 mb-4" />,
              title: "Upload Toasts",
              desc: "Show progress and success messages while files are uploading.",
            },
            {
              icon: <Download size={48} className="text-indigo-500 mb-4" />,
              title: "Download Toasts",
              desc: "Inform users about download progress, completion, or errors instantly.",
            },
            {
              icon: <WifiOff size={48} className="text-cyan-500 mb-4" />,
              title: "Network Status",
              desc: "Notify users about connectivity changes like online/offline states.",
            },
            {
              icon: <Info size={48} className="text-pink-500 mb-4" />,
              title: "Custom Toasts",
              desc: "Fully customize your toast notifications with colors, icons, and animations.",
            },
            {
              icon: <RefreshCw size={48} className="text-violet-500 mb-4" />,
              title: "Real-time Notifications",
              desc: "Instantly notify users about events or updates as they happen in real-time.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-8 rounded-3xl border border-gray-200 hover:border-transparent shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:via-teal-50 hover:to-purple-50 transition-all duration-300"
            >
              {feature.icon}
              <h3 className="font-semibold text-2xl mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-gray-700 max-w-3xl mx-auto text-lg relative z-10">
          React-Nice-Toast makes it effortless to build a polished, accessible,
          and visually consistent notification system in your React apps — all
          while keeping it lightweight and fast.
        </p>
      </section>

      {/* Demo Section */}
      <section
        id="demo"
        className="py-20 px-6 relative overflow-hidden bg-transparent shadow-xl"
      >
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-purple-200 rounded-full opacity-20 blur-2xl"></div>

        <h2 className="text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 relative z-10">
          🎮 Try It Yourself
        </h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12 text-lg relative z-10">
          Click the buttons below to see different toast notifications in
          action. Customize the type, duration, and style to fit your app’s look
          and feel.
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
          <button
            onClick={() => toast.success("Operation completed successfully!!")}
            className="flex items-center justify-center gap-3 bg-blue-500 cursor-pointer text-white px-6 py-4 rounded-xl shadow-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <CheckCircle size={20} /> Success
            <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              Default
            </span>
          </button>

          <button
            onClick={() =>
              toast.error("Something went wrong!", { duration: 5000 })
            }
            className="flex items-center justify-center gap-3 cursor-pointer bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg hover:bg-red-600 transition-colors font-medium"
          >
            <XCircle size={20} /> Error
            <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
              5s
            </span>
          </button>

          <button
            onClick={() => toast.warning("Please be careful!")}
            className="flex items-center justify-center gap-3 cursor-pointer bg-yellow-500 text-white px-6 py-4 rounded-xl shadow-lg hover:bg-yellow-600 transition-colors font-medium"
          >
            <AlertTriangle size={20} /> Warning
          </button>

          <button
            onClick={() => toast.info("Here is some information")}
            className="flex items-center justify-center gap-3 cursor-pointer bg-teal-500 text-white px-6 py-4 rounded-xl shadow-lg hover:bg-teal-600 transition-colors font-medium"
          >
            <Info size={20} /> Info
          </button>

          <button
            onClick={() => toast.loading("Loading...")}
            className="flex items-center justify-center gap-3 cursor-pointer bg-gray-500 text-white px-6 py-4 rounded-xl shadow-lg hover:bg-gray-600 transition-colors font-medium"
          >
            <Loader2 size={20} className="animate-spin" /> Loading
          </button>

          <button
            onClick={() => toast.update("Update completed!")}
            className="flex items-center justify-center gap-3 bg-purple-500 cursor-pointer text-white px-6 py-4 rounded-xl shadow-lg hover:bg-purple-600 transition-colors font-medium"
          >
            <RefreshCw size={20} /> Update
          </button>
        </div>

        {/* Tip Section */}
        <p className="mt-12 text-center text-gray-600 max-w-3xl mx-auto text-sm relative z-10">
          💡 Tip: You can customize the duration, style, icon, and position of
          each toast using React-Nice-Toast props. Experiment with different
          types to see live updates!
        </p>
      </section>

      {/* Promise Toasts Section */}
      <section
        id="promise"
        className="py-12 px-6 relative overflow-hidden bg-transparent shadow-xl"
      >
        {/* Decorative Circles */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-purple-200 rounded-full opacity-20 blur-2xl"></div>

        <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 relative z-10">
          ⏳ Promise Toasts
        </h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12 relative z-10 text-lg">
          Integrate your asynchronous actions seamlessly with promise-based
          toast notifications. Never leave your users guessing while data loads!
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
          <button
            onClick={() => handlePromiseToast("success")}
            className="flex items-center justify-center gap-3 cursor-pointer bg-blue-500 text-white px-6 py-4 rounded-xl shadow-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <CheckCircle size={20} /> Success Promise
          </button>

          <button
            onClick={() => handlePromiseToast("error")}
            className="flex items-center justify-center gap-3 cursor-pointer bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg hover:bg-red-600 transition-colors font-medium"
          >
            <XCircle size={20} /> Error Promise
          </button>

          <button
            onClick={() =>
              toast.promise(
                new Promise((resolve) =>
                  setTimeout(() => resolve("Loaded!"), 2000)
                ),
                { loading: "Loading...", success: "Loaded!", error: "Error!" }
              )
            }
            className="flex items-center justify-center gap-3 cursor-pointer bg-purple-500 text-white px-6 py-4 rounded-xl shadow-lg hover:bg-purple-600 transition-colors font-medium"
          >
            ⏳ Generic Promise
          </button>

          <button
            onClick={() => toast.clear()}
            className="flex items-center justify-center gap-3 bg-gray-500 cursor-pointer text-white px-6 py-4 rounded-xl shadow-lg hover:bg-gray-600 transition-colors font-medium"
          >
            🗑 Clear All
          </button>
        </div>

        <p className="mt-12 text-center text-gray-600 max-w-3xl mx-auto text-sm relative z-10">
          💡 Tip: Use promise toasts to provide real-time feedback on
          asynchronous actions. Customize icons, duration, and styles to match
          your app’s theme.
        </p>
      </section>

      {/* Live Toast Playground */}
      <section
        id="playground"
        className="py-12 px-6 bg-transparent relative overflow-hidden shadow-xl"
      >
        {/* Decorative Gradient Circles */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-purple-200 rounded-full opacity-20 blur-2xl"></div>

        <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 relative z-10">
          🛠️ Live Toast Playground
        </h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12 text-lg relative z-10">
          Customize your toast message, type, and duration to see how
          React-Nice-Toast behaves in real-time.
        </p>

        <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
          {/* Input */}
          <label className="block relative z-10">
            <span className="text-gray-700 font-medium">Message</span>
            <input
              type="text"
              value={playgroundMessage}
              onChange={(e) => setPlaygroundMessage(e.target.value)}
              className="mt-2 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm transition"
              placeholder="Enter your toast message..."
            />
          </label>

          {/* Type Select */}
          <label className="block relative z-10">
            <span className="text-gray-700 font-medium">Type</span>
            <select
              value={playgroundType}
              onChange={(e) => setPlaygroundType(e.target.value as any)}
              className="mt-2 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm transition"
            >
              <option value="success">Success ✅</option>
              <option value="error">Error ❌</option>
              <option value="warning">Warning ⚠️</option>
              <option value="info">Info ℹ️</option>
              <option value="loading">Loading ⏳</option>
              <option value="update">Update 🔄</option>
            </select>
          </label>

          {/* Duration Input */}
          <label className="block relative z-10">
            <span className="text-gray-700 font-medium">Duration (ms)</span>
            <input
              type="number"
              value={playgroundDuration}
              onChange={(e) => setPlaygroundDuration(Number(e.target.value))}
              className="mt-2 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm transition"
              placeholder="e.g., 3000"
            />
          </label>

          {/* Show Toast Button */}
          <button
            onClick={handlePlaygroundToast}
            className="w-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 cursor-pointer text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:via-teal-600 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl"
          >
            Show Toast
          </button>
        </div>
      </section>

      <footer className="py-3 text-center text-gray-100 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
        <p className="text-sm opacity-90">
          © {new Date().getFullYear()} React-Nice-Toast. All rights reserved.
        </p>
        <p className="text-sm mt-1 opacity-90">
          Made with <span className="text-pink-500">❤️</span> using React,
          Tailwind CSS, and Framer Motion
        </p>
      </footer>
    </div>
  );
}

export default App;
