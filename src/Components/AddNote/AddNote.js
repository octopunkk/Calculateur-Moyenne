import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import { PinDropSharp } from "@mui/icons-material";

export default function AddNote(props) {
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [note, setNote] = useState();
  const [coeff, setCoeff] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    props.addNote(nom, note, coeff, props.index);
    setOpen(false);
    setNom("");
    setNote("");
    setCoeff("");
  };

  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <AddCircleIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter une nouvelle note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nom"
            label="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="note"
            label="Note"
            onChange={(e) => setNote(e.target.value)}
            value={note}
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="coeff"
            label="Coeff"
            onChange={(e) => setCoeff(e.target.value)}
            value={coeff}
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
          <Button onClick={handleAdd}>Ajouter</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
