import { useContext } from "react";
import {
  deleteFile,
  downloadFile,
  getDownloadUrl,
} from "../services/fileService";
import { Download, Trash, Trash2Icon } from "lucide-react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const File = ({ file }) => {
  const { token } = useContext(UserContext);
  const queryClient = useQueryClient();

  const handleDelete = async (id) => {
    try {
      const data = await deleteFile(token, id);
      queryClient.invalidateQueries({
        queryKey: ["files"],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow border hover:shadow-md transition flex justify-between items-center">
      <div>
        <p className="text-indigo-700 font-medium">{file.originalName}</p>
        <p className="text-sm text-gray-500">{file.createdAt}</p>
      </div>
      <Link
        className="hover:cursor-pointer"
        to={file.path}
        download={file.originalName}
        target="_blank"
        rel="noreferrer"
      >
        <Download />
      </Link>
      <Trash2Icon onClick={() => handleDelete(file.id)} />
    </div>
  );
};
export default File;
