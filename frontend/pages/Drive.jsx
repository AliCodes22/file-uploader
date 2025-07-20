import { useQuery } from "@tanstack/react-query";
import { getAllFolders } from "../services/folderService";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Drive = () => {
  const { token, user } = useContext(UserContext);

  const { isPending, error, data } = useQuery({
    queryKey: ["folderData"],
    queryFn: () => getAllFolders(token),
  });

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-800">
        Error loading folders.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Welcome, {user?.name || "User"}!
          </h1>
          <button className="bg-yellow-300 text-indigo-900 font-semibold px-4 py-2 rounded-xl hover:bg-yellow-200 transition duration-200">
            + Add Folder
          </button>
        </div>

        {data?.length === 0 ? (
          <div className="bg-white text-indigo-800 p-6 rounded-xl shadow-md text-center mt-10">
            <p className="text-lg">You don’t have any folders yet.</p>
            <p className="text-sm mt-2">
              Click the "+ Add Folder" button to create your first one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {data.map((folder) => (
              <div
                key={folder.id}
                className="bg-white text-indigo-800 p-4 rounded-xl shadow-md hover:shadow-lg transition"
              >
                {folder.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drive;
