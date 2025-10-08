import { ToastContainer, toast, Position } from "./lib/toast";

function App() {
  const handlePromiseToast = (state: "success" | "error") => {
    const fakeApiCall = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (state === "success") resolve("Data loaded successfully!");
        else reject("Failed to load data!");
      }, 2000);
    });

    toast.promise(fakeApiCall, {
      loading: "Loading data...",
      success: "Data loaded successfully!",
      error: "Failed to load data",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
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

      <div className="bg-white p-8 rounded-lg shadow-md space-y-4 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Toast Notifications</h1>

        {/* Core Toasts */}
        <button
          onClick={() => toast.success("Operation completed successfully!!")}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Show Success
        </button>

        <button
          onClick={() =>
            toast.error("Something went wrong!", { duration: 5000})
          }
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Show Error
        </button>

        <button
          onClick={() => toast.warning("Please be careful!")}
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
        >
          Show Warning
        </button>

        <button
          onClick={() => toast.info("Here is some information")}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Show Info
        </button>

        {/* Extended Toasts */}
        <button
          onClick={() => toast.loading("Loading...")}
          className="w-full bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
        >
          Show Loading
        </button>

        <button
          onClick={() => toast.update("Update completed!")}
          className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
        >
          Show Update
        </button>

        <button
          onClick={() => toast.delete("Item deleted successfully")}
          className="w-full bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors"
        >
          Show Delete
        </button>

        <button
          onClick={() => toast.upload("Uploading your files...")}
          className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
        >
          Show Upload
        </button>

        <button
          onClick={() => toast.download("Download started")}
          className="w-full bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
        >
          Show Download
        </button>

        <button
          onClick={() => toast.network("Network restored")}
          className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors"
        >
          Show Network
        </button>

        <button
          onClick={() => toast.offline("You are offline")}
          className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Show Offline
        </button>

        {/* Custom Toast */}
        <button
          onClick={() =>
            toast("Custom styled toast", {
              duration: 4000,
              className: "border-2 border-purple-300",
            })
          }
          className="w-full bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors"
        >
          Custom Toast
        </button>

        {/* Promise Toasts Section */}
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold">Promise Toasts</h2>

          <button
            onClick={() => handlePromiseToast("success")}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Show Promise Success
          </button>

          <button
            onClick={() => handlePromiseToast("error")}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Show Promise Error
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
            className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            Show Generic Promise
          </button>
        </div>

        {/* Clear All */}
        <button
          onClick={() => toast.clear()}
          className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default App;
