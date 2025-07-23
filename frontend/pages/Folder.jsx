import { UserContext } from "../context/UserContext";
import { getFolderFiles } from "../services/folderService";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

const Folder = () => {
  const { folderId } = useParams();
  const { token } = useContext(UserContext);

  const [file, setFile] = useState(null);

  const { isPending, error, data } = useQuery({
    queryKey: ["files", folderId],
    queryFn: () => getFolderFiles(token, folderId),
  });

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
        data.map((file) => (
          <div
            key={file.id}
            className="p-4 bg-white rounded-lg shadow border hover:shadow-md transition"
          >
            <p className="text-indigo-700 font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">{file.createdAt}</p>
          </div>
        ))
      )}

      {file && (
        <div>
          {file.name}
          {file.size}
          {file.type}

          <button type="submit">Upload</button>
        </div>
      )}
    </div>
  );
};

export default Folder;
