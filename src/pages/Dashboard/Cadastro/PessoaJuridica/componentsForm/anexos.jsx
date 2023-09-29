import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  list: {
    marginTop: theme.spacing(2),
  },
  listItem: {
    borderBottom: "1px solid #ddd",
  },
}));

const AnexosFormJuridica = ({ register, setValue }) => {
  const classes = useStyles();
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const inputFileRef = useRef(null);

  useEffect(() => {
    register("anexos");
  }, [register]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const updatedFiles = [...selectedFiles, ...newFiles]; // Usar uma variável local para atualizar os arquivos
    setSelectedFiles(updatedFiles);
    inputFileRef.current = updatedFiles;

    // Atualize os dados em react-hook-form usando a variável local
    setValue("anexos", updatedFiles);
  };

  const handleFileRemove = (indexToRemove) => {
    const newSelectedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFiles(newSelectedFiles);
    inputFileRef.current = newSelectedFiles;

    // Atualize os dados em react-hook-form usando a variável local
    setValue("anexos", newSelectedFiles);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Anexos
      </Typography>
      <input
        accept="image/*,application/pdf"
        className={classes.input}
        id="contained-button-file-juridica"
        multiple
        type="file"
        ref={inputFileRef}
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file-juridica">
        <Button variant="contained" color="primary" component="span">
          Carregar Anexos
        </Button>
      </label>
      <List className={classes.list}>
        {Array.from(selectedFiles || []).map((file, index) => (
          <ListItem key={index} className={classes.listItem}>
            <ListItemText primary={file.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleFileRemove(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AnexosFormJuridica;
