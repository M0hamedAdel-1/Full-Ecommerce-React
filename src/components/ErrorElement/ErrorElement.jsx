
const ErrorElement = () => {

  let message = "Something went wrong 😢";

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold">🚨 Error</h1>
      <p className="text-gray-500">{message}</p>
      <button
        onClick={() => window.location.href = "/"}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorElement;