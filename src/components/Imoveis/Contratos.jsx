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

  useEffect(() => {
    // Este useEffect será acionado sempre que os documentos (contratos) forem atualizados
    console.log("Documentos atualizados:", addedFiles);
  
    // Você pode realizar outras ações aqui com os documentos atualizados, se necessário
  
  }, [addedFiles]); 

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files);
    if (files[0] && files[0].type === "application/pdf") {
      // Verificar se é um arquivo PDF (ou outro tipo de contrato)
      const url = URL.createObjectURL(files[0]);
      setPreviewDocumento(url);

      // Adicionar automaticamente o contrato à lista
      const novosContratos = [...addedFiles, files[0]];
      setAddedFiles(novosContratos);
      setValue("contratos", novosContratos, { shouldValidate: true });
      setArquivoAtual(null);
      setPreviewDocumento(null);
    } else {
      setPreviewDocumento(null);
    }
  };

  const handleRemover = (index) => {
    const newContracts = [...addedFiles];
    newContracts.splice(index, 1);
    setAddedFiles(newContracts);
    setValue("contratos", newContracts, { shouldValidate: true });
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
        {/* Remova o botão "Adicionar" aqui */}
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
