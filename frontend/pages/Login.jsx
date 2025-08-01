import { useContext, useState } from "react";
import { loginUser } from "../services/userService";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { token, setToken, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await loginUser(email, password);

    if (data.success === false) {
      toast.error(data.message || "Unable to login");
      return;
    }

    if (data?.token) {
      setToken(data.token);
      setUser(data.userData);
      localStorage.setItem("token", data.token);
      toast.success("Login successful");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <form
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-indigo-700 text-center">
          Login
        </h2>

        <div>
          <label
            htmlFor="email"
            className="block text-indigo-600 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-indigo-600 font-medium mb-1"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-300 text-indigo-900 font-semibold py-2 rounded-xl hover:bg-yellow-200 hover:cursor-pointer transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
