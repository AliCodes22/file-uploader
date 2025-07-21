import { useQuery } from "@tanstack/react-query";
import { getAllFolders } from "../services/folderService";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import FormDialog from "../components/FormDialog";

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

  console.log(data);

  return <div>Drive</div>;
};

export default Drive;
