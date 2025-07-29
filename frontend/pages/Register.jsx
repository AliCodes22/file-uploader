import { useContext, useState } from "react";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(email, password);
      console.log(data);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.newUser));
        setToken(data.token);
        navigate("/");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <form
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-indigo-700 text-center">
          Register
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
          className="w-full bg-yellow-300 text-indigo-900 font-semibold py-2 rounded-xl hover:bg-yellow-200 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
