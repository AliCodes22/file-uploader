import { UserContext } from "../context/UserContext";
import { addFile, getFolderFiles } from "../services/folderService";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import File from "../components/File";

const Folder = () => {
  const { folderId } = useParams();
  const { token } = useContext(UserContext);

  const [file, setFile] = useState(null);

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["files", folderId],
    queryFn: () => getFolderFiles(token, folderId),
  });

  const addFileMutation = useMutation({
    mutationFn: addFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["files", folderId],
      });
    },
  });

  const formData = new FormData();
  formData.append("file", file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      addFileMutation.mutate({
        token,
        folderId,
        file: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50 text-indigo-600">
        Loading files...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-700">
        Error loading files.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-indigo-700">Files</h2>

        <label className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition cursor-pointer inline-block">
          ⬆️ Upload File
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(e.target.files);
            }}
          />
        </label>
      </div>

      {data.length === 0 ? (
        <div className="text-center text-gray-600 mt-10">
          <p className="text-lg font-medium">📂 This folder is empty.</p>
          <p className="text-sm text-gray-500 mt-2">
            Use the upload button above to add files.
          </p>
        </div>
      ) : (
        data.map((file) => <File file={file} key={file.id} path={file.path} />)
      )}

      {file && (
        <div className="fixed bottom-4 right-4 w-72 bg-white border border-indigo-200 rounded-lg shadow-lg p-4 animate-slide-up">
          <h3 className="text-indigo-700 font-semibold mb-2 flex items-center">
            📄 File ready to upload
          </h3>

          <div className="space-y-1 text-sm text-gray-700 mb-3">
            <p>
              <span className="font-medium">Name:</span> {file.name}
            </p>
            <p>
              <span className="font-medium">Type:</span>{" "}
              {file.type || "Unknown"}
            </p>
            <p>
              <span className="font-medium">Size:</span>{" "}
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition"
          >
            Upload File
          </button>
        </div>
      )}
    </div>
  );
};

export default Folder;
