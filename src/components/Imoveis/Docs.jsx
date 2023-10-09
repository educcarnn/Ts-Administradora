import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  styled,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ModalImage from "react-modal-image";
import { useFormularioContext } from "../../context/CadastroProvider";
import { useEffect } from "react";

export const CenteredDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const TextPage = styled(Typography)({
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
});

function Anexos() {
  const { register, setValue } = useFormularioContext();

  const [documentos, setDocumentos] = useState([]);
  const [previewImagem, setPreviewImagem] = useState(null);

  useEffect(() => {
    // Quando o estado de "documentos" for atualizado, esta função será executada
    // Você pode realizar ações aqui quando os documentos são atualizados

    // Exemplo: Imprimir os documentos no console sempre que forem atualizados

  }, [documentos]); // Certifique-se de incluir "documentos" como dependência

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewImagem(url);
      } else {
        setPreviewImagem(null);
      }

      // Adicionar automaticamente o documento à lista
      const novosDocumentos = [...documentos, file];
      setDocumentos(novosDocumentos);
      setValue("anexos", novosDocumentos, { shouldValidate: true });
    }
  };

  const handleRemover = (index) => {
    const newDocs = [...documentos];
    newDocs.splice(index, 1);
    setDocumentos(newDocs);
    setValue("anexos", newDocs, { shouldValidate: true });
  };

  return (
    <CenteredDiv>
      <Typography variant="h6">Anexar Documentos</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="upload-button"
          />
          <label htmlFor="upload-button">
            <IconButton color="primary" component="span">
              <AttachFileIcon />
            </IconButton>
          </label>
        </Grid>

        {previewImagem && (
          <Grid item xs={12} sm={4}>
            <ModalImage
              small={previewImagem}
              large={previewImagem}
              alt="Preview"
              hideDownload={true}
              style={{ maxWidth: "50px", maxHeight: "50px" }}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={8}>
          <Typography variant="subtitle1">Documentos anexados:</Typography>
          <List>
            {documentos.map((doc, index) => (
              <ListItem key={index}>
                <ListItemText primary={doc.name} />
                <IconButton edge="end" onClick={() => handleRemover(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </CenteredDiv>
  );
}

export default Anexos;
