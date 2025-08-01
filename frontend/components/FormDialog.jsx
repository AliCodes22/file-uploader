import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { createFolder } from "../services/folderService";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function FormDialog({ showModal, setShowModal }) {
  const [name, setName] = useState("");
  const { token, setFolders } = useContext(UserContext);
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await createFolder(token, name);

    if (data.success === false) {
      toast.error("Unable to create folder");
    }

    queryClient.invalidateQueries(["folderData"]);
    setShowModal(false);
    toast.success("Folder created successfully!!");
  };

  return (
    <React.Fragment>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="normal"
              id="name"
              name="name"
              label="Untitled folder"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <DialogActions>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
