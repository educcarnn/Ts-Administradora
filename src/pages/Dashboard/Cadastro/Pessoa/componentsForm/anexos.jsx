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

const AnexosForm = ({ register, setValue}) => {
  const classes = useStyles();
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    register("anexos");
  }, [register]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Use o setValue para atualizar os dados em react-hook-form
    setValue("anexos", [...selectedFiles, ...newFiles]);
  };

  const handleFileRemove = (indexToRemove) => {
    const newSelectedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFiles(newSelectedFiles);

    // Atualize os dados no react-hook-form
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
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
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

export default AnexosForm;
