import { useContext } from "react";
import { downloadFile, getDownloadUrl } from "../services/fileService";
import { Download } from "lucide-react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const File = ({ file }) => {
  const { token } = useContext(UserContext);
  console.log(file);

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
    </div>
  );
};
export default File;
