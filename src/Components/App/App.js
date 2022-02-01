import "./App.css";
import React, { useEffect, useState } from "react";
import { Bloc } from "../Bloc/Bloc";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddBloc from "../AddBloc/AddBloc";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  const [blocs, setBlocs] = useState([]);
  const [moyenne, setMoyenne] = useState();

  const addBloc = (bloc) => {
    setBlocs((prev) => [...prev, bloc]);
  };
  const removeBloc = (index) => {
    setBlocs((prev) => {
      let newBlocs = [...prev];
      newBlocs.splice(index, 1);
      return newBlocs;
    });
  };
  useEffect(() => {
    let sommeGenerale = 0;
    let diviseurGeneral = 0;
    blocs.forEach((bloc) => {
      let sommeBloc = 0;
      let diviseurBloc = 0;
      bloc.matieres.forEach((matiere) => {
        let sommeMatiere = 0;
        let diviseurMatiere = 0;
        matiere.notes.forEach((note) => {
          sommeMatiere += parseInt(note.note) * parseInt(note.coeff);
          diviseurMatiere += parseInt(note.coeff);
          console.log({ sommeMatiere });
        });
        let moyenneMatiere = sommeMatiere / diviseurMatiere;
        console.log({ moyenneMatiere });
        sommeBloc += moyenneMatiere * parseInt(matiere.coeff);
        diviseurBloc += parseInt(matiere.coeff);
      });
      let moyenneBloc = sommeBloc / diviseurBloc;
      console.log({ diviseurBloc });
      sommeGenerale += moyenneBloc * parseInt(bloc.coeff);
      diviseurGeneral += parseInt(bloc.coeff);
    });
    let moyenneGenerale = sommeGenerale / diviseurGeneral;
    setMoyenne(moyenneGenerale);
  }, [blocs]);
  console.log(blocs);
  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <h1 className="titre">Calculateur de moyenne</h1>
      <h2 className="moyenne">Moyenne générale : {moyenne}</h2>
      <div className="blocContainer">
        {blocs.map((bloc, index) => {
          return (
            <Bloc
              key={index}
              bloc={bloc}
              removeBloc={removeBloc}
              index={index}
              setBlocs={setBlocs}
            />
          );
        })}
      </div>
      <AddBloc blocs={blocs} addBloc={addBloc} />
    </div>
    // </ThemeProvider>
  );
}

export default App;
