import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AddNote from "../AddNote/AddNote";
import AddMatiere from "../AddMatiere/AddMatiere";

import "./Bloc.css";

export function Bloc(props) {
  const [matieres, setMatieres] = useState([]);
  const [moyenne, setMoyenne] = useState(0);

  useEffect(() => {
    props.setBlocs((prev) => {
      let newBlocs = [...prev];
      newBlocs[props.index].matieres = matieres;
      return newBlocs;
    });
  }, [matieres]);
  const updateMoyenne = () => {
    let sommeBloc = 0;
    let diviseurBloc = 0;
    matieres.forEach((matiere) => {
      let sommeMatiere = 0;
      let diviseurMatiere = 0;
      matiere.notes.forEach((note) => {
        sommeMatiere += parseInt(note.note) * parseInt(note.coeff);
        diviseurMatiere += parseInt(note.coeff);
      });
      let moyenneMatiere = sommeMatiere / diviseurMatiere;
      sommeBloc += moyenneMatiere * parseInt(matiere.coeff);
      diviseurBloc += parseInt(matiere.coeff);
    });
    let moyenneBloc = sommeBloc / diviseurBloc;
    setMoyenne(moyenneBloc);
  };

  const addNote = (nom, note, coeff, index) => {
    let newNote = {
      nom: nom,
      note: note,
      coeff: coeff,
    };
    setMatieres((prev) => {
      let newMatieres = [...prev];
      newMatieres[index].notes.push(newNote);
      return newMatieres;
    });
    updateMoyenne();
  };
  const addMatiere = (nom, coeff) => {
    let newMatiere = {
      nom: nom,
      notes: [],
      coeff: coeff,
    };
    setMatieres((prev) => [...prev, newMatiere]);
  };
  const removeNote = (inote, imatiere) => {
    setMatieres((prev) => {
      let newMatieres = [...prev];
      newMatieres[imatiere].notes.splice(inote, 1);
      return newMatieres;
    });
    updateMoyenne();
  };
  const removeMatiere = (imatiere) => {
    setMatieres((prev) => {
      let newMatieres = [...prev];
      newMatieres.splice(imatiere, 1);
      return newMatieres;
    });
    updateMoyenne();
  };

  return (
    <div className="Bloc">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.bloc.nom}
          </Typography>
          <div className="matiere">
            {matieres.map((matiere, index) => {
              return (
                <Card key={index}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {matiere.nom}, cœff {matiere.coeff}
                      <IconButton>
                        <ClearIcon onClick={() => removeMatiere(index)} />
                      </IconButton>
                    </Typography>
                    {matiere.notes.map((note, i) => {
                      return (
                        <div key={i}>
                          {note.nom} : {note.note}, cœff {note.coeff}
                          <IconButton onClick={() => removeNote(i, index)}>
                            <RemoveIcon />
                          </IconButton>
                        </div>
                      );
                    })}
                    <AddNote
                      matieres={matieres}
                      addNote={addNote}
                      index={index}
                    />
                  </CardContent>
                </Card>
              );
            })}
            <AddMatiere matieres={matieres} addMatiere={addMatiere} />
          </div>
          <br />
          <p>Coeff du bloc : {props.bloc.coeff}</p>
          <div>Moyenne du bloc : {moyenne}</div>
        </CardContent>
        <CardActions>
          <IconButton
            size="small"
            sx={{ color: "red" }}
            onClick={() => props.removeBloc(props.index)}
          >
            <ClearIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
