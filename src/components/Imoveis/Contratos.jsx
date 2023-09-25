import React, { useState, useEffect } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { useFormularioContext } from "../../context/CadastroProvider";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  thumbnail: {
    width: "50px",
    height: "50px",
    marginRight: theme.spacing(1),
  },
}));

function AnexosContrato() {
  const classes = useStyles();
  const { register, setValue } = useFormularioContext();

  const [addedFiles, setAddedFiles] = useState([]);
  const [arquivoAtual, setArquivoAtual] = useState(null);
  const [previewDocumento, setPreviewDocumento] = useState(null);

  useEffect(() => {
    register("contratos"); // Registrar o campo de contratos no formulário
  }, [register]);

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files);
    if (files[0] && files[0].type === "application/pdf") {
      // Verificar se é um arquivo PDF (ou outro tipo de contrato)
      const url = URL.createObjectURL(files[0]);
      setPreviewDocumento(url);
    } else {
      setPreviewDocumento(null);
    }
    setArquivoAtual(files[0]);
  };

  const handleAdd = () => {
    if (arquivoAtual) {
      const novosContratos = [...addedFiles, arquivoAtual];
      setAddedFiles(novosContratos);
      setValue("contratos", novosContratos, { shouldValidate: true });
      setArquivoAtual(null);
      setPreviewDocumento(null);
    }
  };

  const handleRemover = (index) => {
    const newDocs = [...addedFiles];
    newDocs.splice(index, 1);
    setAddedFiles(newDocs);
    setValue("contratos", newDocs, { shouldValidate: true });
  };

  return (
    <div>
      <h2>Anexar Contrato de prestação de serviço: </h2>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={10}>
          <input
            className={classes.input}
            id="contrato-button-file"
            type="file"
            accept="application/pdf"
            onChange={handleFilesChange}
          />
          <label htmlFor="contrato-button-file">
            <Button variant="contained" component="span" color="default">
              Selecione os Contratos
            </Button>
          </label>
          {previewDocumento && (
            <img 
              src={previewDocumento} 
              alt="Preview" 
              className={classes.thumbnail} 
            />
          )}
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            className={classes.addButton}
            variant="contained"
            color="primary"
            onClick={handleAdd}
            fullWidth
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
      <ul className={classes.list}>
        {addedFiles.map((file, index) => (
          <li key={index}>
            <img 
              src={URL.createObjectURL(file)} 
              alt={file.name} 
              className={classes.thumbnail} 
            />
            {file.name}
            <Button onClick={() => handleRemover(index)}>Remover</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnexosContrato;
