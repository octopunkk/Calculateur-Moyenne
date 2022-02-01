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
import "./AddBloc.css";

export default function AddNote(props) {
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [coeff, setCoeff] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    let newBloc = { nom: nom, coeff: coeff, matieres: [] };
    props.addBloc(newBloc);
    setOpen(false);
    setNom("");
    setCoeff("");
  };

  return (
    <div className="addBloc">
      <IconButton onClick={handleClickOpen}>
        <AddCircleIcon sx={{ color: "white" }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un nouveau bloc</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nom"
            label="Nom du bloc"
            value={nom}
            onChange={(e) => setNom(() => e.target.value)}
            autoComplete="off"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="coeff"
            label="Coeff"
            value={coeff}
            onChange={(e) => setCoeff(() => e.target.value)}
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
