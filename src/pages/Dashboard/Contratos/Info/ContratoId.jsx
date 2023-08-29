import React, { useState, useEffect } from "react";
import { API_URL } from "../../../../db/Api";
import { useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Divider,
  makeStyles 
} from "@material-ui/core";
import { DashboarDiv } from "../../style";
import Sidebar from "../../../../components/DashboardComponents/Sidebar/index"

const useStyles = makeStyles((theme) => ({
  inputField: {
      '& .MuiInputBase-root': {
          fontSize: '0.9rem'
      },
      '& .MuiFormLabel-root': {
          fontSize: '0.9rem'
      }
  }
}));


function ContractEdit() {
  const { id } = useParams();
  const classes = useStyles();
  const [contractDetails, setContractDetails] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  const propertyNames = {
    id: "ID",
    tipoContrato: "Tipo de Contrato",
    tipo: "Tipo de Garantia",
    valor: "Valor",
    apolice: "Apólice",
    dataInicio: "Data Início",
    observacao: "Observação",
    seguradora: "Seguradora",
    dataTermino: "Data Término",
    numeroParcelas: "Número de Parcelas",
    cpf: "CPF",
    nome: "Nome",
    telefoneCelular: "Telefone Celular",
  };

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/obter-contrato/${id}`);
        const data = await response.json();
        setContractDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do contrato:", error);
      }
    };

    fetchContractDetails();
  }, [id]);

  const getLabel = (key) => propertyNames[key] || key;

  return (
    <div>
      <DashboarDiv>Ts Administradora </DashboarDiv>
      <Sidebar/>
      <Container>
        <Typography variant="h6" gutterBottom>
          Detalhes do Contrato
        </Typography>

        {contractDetails.fiador ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={getLabel("fiador")}
                value={contractDetails.fiador || ""}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid container spacing={2}>
              {/* Aqui você pode adicionar outros campos gerais se precisar */}
              {contractDetails.detalhesContrato &&
                Object.entries(contractDetails.detalhesContrato).map(
                  ([key, value]) => (
                    <Grid key={key} item xs={6}>
                      <TextField
                        label={getLabel(key)}
                        value={value || ""}
                        fullWidth
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                  )
                )}
            </Grid>

            <Divider style={{ margin: "20px 0" }} />

            <Typography variant="h6" gutterBottom>
              Garantia
            </Typography>
            <Grid container spacing={2}>
              {contractDetails.garantia &&
                Object.entries(contractDetails.garantia).map(([key, value]) => (
                  <Grid key={key} item xs={6}>
                    <TextField
                      label={getLabel(key)}
                      value={value || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                ))}
            </Grid>
          </>
        )}
        <Typography variant="h6" gutterBottom>
          Informações do Inquilino
        </Typography>
        <Grid container spacing={2}>
          {contractDetails.inquilino &&
            ["cpf", "nome", "telefoneCelular"].map((key) => (
              <Grid key={key} item xs={4}>
                <TextField
                  label={getLabel(key)}
                  value={contractDetails.inquilino[key] || ""}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            ))}
        </Grid>

        <Divider style={{ margin: "20px 0" }} />

        <Typography variant="h6" gutterBottom>
          Informações do Proprietário
        </Typography>
        <Grid container spacing={2}>
          {contractDetails.proprietario &&
            ["cpf", "nome", "telefoneCelular"].map((key) => (
              <Grid key={key} item xs={4}>
                <TextField
                  label={getLabel(key)}
                  value={contractDetails.proprietario[key] || ""}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default ContractEdit;
