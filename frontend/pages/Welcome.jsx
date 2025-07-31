import { Link } from "react-router-dom";

const Welcome = () => {
  console.log("rendered");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center drop-shadow-lg">
        Welcome to <span className="text-yellow-300">ZenDrive</span>
      </h1>

      <div className="flex space-x-6 mt-4">
        <Link
          to="/login"
          className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold shadow-md hover:bg-gray-100 transition duration-200"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 rounded-xl bg-yellow-300 text-indigo-900 font-semibold shadow-md hover:bg-yellow-200 transition duration-200"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
