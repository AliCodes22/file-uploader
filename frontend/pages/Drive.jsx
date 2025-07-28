import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFolder, getAllFolders } from "../services/folderService";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import FormDialog from "../components/FormDialog";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Drive = () => {
  const { token, user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["folderData"],
    queryFn: () => getAllFolders(token),
  });

  const { mutate } = useMutation({
    mutationFn: ({ token, folderId }) => deleteFolder(token, folderId),
    onSuccess: () => queryClient.invalidateQueries(["folderData"]),
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

  const handleDelete = (folderId) => {
    mutate({
      token,
      folderId,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Your Folders</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((folder) => {
          const { createdAt, id, name } = folder;

          return (
            <li
              key={id}
              className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
            >
              <Link to={`/drive/${id}`}>
                <div className="text-indigo-600 font-semibold text-lg mb-1">
                  📁 {name}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(createdAt).toLocaleDateString()}
                </p>
              </Link>
              <Trash2 onClick={() => handleDelete(id)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Drive;
