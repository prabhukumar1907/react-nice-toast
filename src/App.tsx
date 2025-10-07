import { ToastContainer, toast, Position } from './lib/toast';

function App() {
  const showSuccessToast = () => {
    toast.success('Operation completed successfully!');
  };

  const showErrorToast = () => {
    toast.error('Something went wrong!', { duration: 5000 });
  };

  const showWarningToast = () => {
    toast.warning('Please be careful!');
  };

  const showInfoToast = () => {
    toast.info('Here is some information');
  };

  const showCustomToast = () => {
    toast('Custom styled toast', {
      duration: 4000,
      className: 'border-2 border-purple-300',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ToastContainer position={Position.TOP_RIGHT} maxToasts={5} />
      
      <div className="bg-white p-8 rounded-lg shadow-md space-y-4 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Toast Notifications</h1>
        
        <button
          onClick={showSuccessToast}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Show Success
        </button>
        
        <button
          onClick={showErrorToast}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Show Error
        </button>
        
        <button
          onClick={showWarningToast}
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
        >
          Show Warning
        </button>
        
        <button
          onClick={showInfoToast}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Show Info
        </button>

        <button
          onClick={showCustomToast}
          className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
        >
          Custom Toast
        </button>

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