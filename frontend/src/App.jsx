import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import FormDialog from "../components/FormDialog";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user, setToken, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-indigo-600">ZenDrive</h1>

        <button
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500"
          onClick={() => {
            setShowModal(true);
          }}
        >
          ➕ Add Folder
        </button>

        <button
          className="w-full text-red-600 border border-red-600 py-2 rounded-lg hover:bg-red-50"
          onClick={handleLogout}
        >
          🔒 Logout
        </button>
      </aside>

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-indigo-700">
            Welcome, {user?.email}
          </h2>
        </div>

        {showModal && (
          <FormDialog setShowModal={setShowModal} showModal={showModal} />
        )}
        <Outlet />
        <Toaster position="top-right" reverseOrder={false} />
      </main>
    </div>
  );
};

export default App;
