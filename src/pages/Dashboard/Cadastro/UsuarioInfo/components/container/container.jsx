import { RowContainer } from "../../../../style";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../../../../db/Api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Container({ pessoaInfo, fiador }) {
  const [showUltimosContratos, setShowUltimosContratos] = useState(false);
  const [showExtratoRepasse, setShowExtratoRepasse] = useState(false);
  const [showListaEmails, setShowListaEmails] = useState(false);
  const [showImoveis, setShowImoveis] = useState(false);
  const [showContratos, setShowContratos] = useState(false);

  const handleMostrarImoveis = () => {
    setShowUltimosContratos(false);
    setShowExtratoRepasse(false);
    setShowListaEmails(false);
    setShowImoveis(true);
    setShowContratos(false);
  };

  const handleShowUltimosContratos = () => {
    setShowUltimosContratos(true);
    setShowExtratoRepasse(false);
    setShowListaEmails(false);
    setShowImoveis(false);
    setShowContratos(false);
  };

  const handleShowContratoProprietario = () => {
    setShowUltimosContratos(false);
    setShowExtratoRepasse(false);
    setShowListaEmails(false);
    setShowImoveis(false);
    setShowContratos(true);
  };

  const handleShowExtratoRepasse = () => {
    setShowUltimosContratos(false);
    setShowExtratoRepasse(true);
    setShowListaEmails(false);
    setShowImoveis(false);
    setShowContratos(false);
  };

  const handleShowListaEmails = () => {
    setShowUltimosContratos(false);
    setShowExtratoRepasse(false);
    setShowListaEmails(true);
    setShowImoveis(false);
    setShowContratos(false);
  };

  const handleRemoveImovelDoFiador = async (fiadorId) => {
    try {
      const response = await API_URL.delete("/deletar-fiador", {
        data: { fiadorId },
      });
      toast.success("Fiador excluído com sucesso", response.data);
    } catch (error) {
      toast.error("Erro ao excluir fiador:", error);
      // Você pode tratar erros aqui ou mostrar uma mensagem de erro para o usuário.
    }
  };

  return (
    <>
      <RowContainer>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleShowUltimosContratos}
          >
            Contratos sendo Locatário
          </Button>
          {showUltimosContratos &&
            (pessoaInfo.contratosInquilinos &&
            pessoaInfo.contratosInquilinos.length > 0 ? (
              <div>Existem contratos vinculados como Locatário.</div>
            ) : (
              <div>Não há contratos vinculados como Locatário.</div>
            ))}
        </Box>

        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleShowContratoProprietario}
          >
            Contratos sendo Proprietário
          </Button>
          {showContratos &&
            (pessoaInfo.contratosProprietarios &&
            pessoaInfo.contratosProprietarios.length > 0 ? (
              <div>Existem contratos vinculados como Proprietário.</div>
            ) : (
              <div>Não há contratos vinculados como Proprietário.</div>
            ))}
        </Box>

        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleMostrarImoveis}
          >
            Propriedades
          </Button>
          {showImoveis && (
            <div>
              <div>
                {pessoaInfo.imoveisRelacionados.map((imovel) => (
                  <Link
                    key={imovel?.registroImovel?.id}
                    to={`/admin/imovel/${imovel?.registroImovel?.id}`}
                  >
                    <Typography variant="body2">
                      {imovel?.registroImovel?.id} -{" "}
                      {imovel?.registroImovel?.generoImovel} no{" "}
                      {imovel?.registroImovel?.localizacao?.bairro},{" "}
                      {imovel?.registroImovel?.localizacao?.endereco} N{" "}
                      {imovel?.registroImovel?.localizacao?.numero} CEP:{" "}
                      {imovel?.registroImovel?.localizacao?.cep}. Proprietário
                      possui {imovel?.percentualPropriedade}% do imóvel.
                    </Typography>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Box>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleShowExtratoRepasse}
          >
            Extrato de Repasse
          </Button>
          {showExtratoRepasse && <div>Extrato de repasse</div>}
        </Box>

        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleShowListaEmails}
          >
            Lista de E-mails
          </Button>
          {showListaEmails && <div>Lista de e-mails</div>}
        </Box>

        <Box mt={2}>
          {fiador.fiador.length !== 0 ? (
            <>
              {" "}
              <Button variant="outlined" color="primary">
                Esta pessoa é fiadora.
              </Button>
              <div>
                {fiador.fiador.map((fiador, index) => (
                  <div key={index}>
                    <div>{index}</div>
                    <Typography>
                      Número de Matrícula RGI: {fiador.numeroMatriculaRGI}
                    </Typography>

                    <Typography>
                      Localização do Imóvel:{" "}
                      <Link
                        key={fiador?.imovelComoFianca?.id}
                        to={`/admin/imovel/${fiador?.imovelComoFianca?.id}`}
                      >
                        {fiador?.imovelComoFianca?.generoImovel} no{" "}
                        {fiador?.imovelComoFianca?.localizacao?.bairro},{" "}
                        {fiador?.imovelComoFianca?.localizacao?.endereco} N{" "}
                        {fiador?.imovelComoFianca?.localizacao?.numero} CEP:{" "}
                        {fiador?.imovelComoFianca?.localizacao?.cep}.
                      </Link>
                    </Typography>
                    <IconButton
                      color="secondary"
                      onClick={() => handleRemoveImovelDoFiador(fiador.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Button variant="outlined" color="primary">
              Esta pessoa não é fiadora.
            </Button>
          )}
        </Box>
      </RowContainer>
    </>
  );
}
