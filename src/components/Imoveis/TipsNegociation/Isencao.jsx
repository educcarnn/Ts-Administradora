import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  FormControlLabel,
  Input,
  Checkbox,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import { useNegociacao } from "../../../context/NegociationProvider"; // Importe o hook useNegociacao
import { useFormularioContext } from "../../../context/CadastroProvider"; // Importe o contexto de CadastroProvider

const DivContainer = styled.div`
  width: 50%;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  align-items: center;
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  lex-direction: column;
  align-items: center;
  max-width: 600px; /* Limita a largura do formulário */
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10%;
`;

const WhiteFormLabel = styled(FormLabel)`
  color: black;
`;

const StyledTitleText = styled(Typography)`
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

const FormControlLabelGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function Isencao() {
  const { dadosFormulario, setDadosFormulario } = useFormularioContext(); // Use o contexto adequado
  const { isCondoExempt, setIsCondoExempt, setIsIptuExempt, isIptuExempt } =
    useNegociacao();

  return (
    <CenterDiv>
      <FormControl fullWidth margin="normal">
        <WhiteFormLabel>Condomínio:</WhiteFormLabel>
        <div>
          <Checkbox
            onChange={(event) => {
              const isExempt = event.target.checked;
              setIsCondoExempt(isExempt);
              if (isExempt) {
                setDadosFormulario((prevData) => ({
                  ...prevData,
                  tipoCondominio: "isento",
                }));
              } else {
                setDadosFormulario((prevData) => ({
                  ...prevData,
                  tipoCondominio: "",
                }));
              }
            }}
            checked={isCondoExempt}
            value="isento"
            id="isento"
          />
          <WhiteFormLabel component="label" htmlFor="isento">
            Isento
          </WhiteFormLabel>
        </div>
        <div>
          <Checkbox
            onChange={() => {
              setIsCondoExempt(false);
              setDadosFormulario((prevData) => ({
                ...prevData,
                tipoCondominio: "",
              }));
            }}
            checked={!isCondoExempt}
            value="naoIsento"
            id="naoIsento"
          />
          <WhiteFormLabel component="label" htmlFor="naoIsento">
            Não Isento
          </WhiteFormLabel>
        </div>
        {!isCondoExempt && (
          <div>
            <RowContainer>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Nome Condominio</WhiteFormLabel>
                <Input
                  type="text"
                  onChange={(event) => {
                    setDadosFormulario((prevData) => ({
                      ...prevData,
                      condominio: {
                        ...prevData.condominio,
                        nome_condominio: event.target.value,
                      },
                    }));
                  }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Nome Administradora</WhiteFormLabel>
                <Input
                  type="text"
                  onChange={(event) => {
                    setDadosFormulario((prevData) => ({
                      ...prevData,
                      condominio: {
                        ...prevData.condominio,
                        nome_administradora: event.target.value,
                      },
                    }));
                  }}
                />
              </FormControl>
            </RowContainer>

            <FormControl fullWidth margin="normal">
              <WhiteFormLabel>Razão Social</WhiteFormLabel>
              <Input
                type="text"
                onChange={(event) => {
                  setDadosFormulario((prevData) => ({
                    ...prevData,
                    condominio: {
                      ...prevData.condominio,
                      razao_social: event.target.value,
                    },
                  }));
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <WhiteFormLabel>CNPJ </WhiteFormLabel>
              <Input
                type="text"
                onChange={(event) => {
                  setDadosFormulario((prevData) => ({
                    ...prevData,
                    condominio: {
                      ...prevData.condominio,
                      cnpj: event.target.value,
                    },
                  }));
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <WhiteFormLabel>Site </WhiteFormLabel>
              <Input
                type="text"
                onChange={(event) => {
                  setDadosFormulario((prevData) => ({
                    ...prevData,
                    condominio: {
                      ...prevData.condominio,
                      site: event.target.value,
                    },
                  }));
                }}
              />
            </FormControl>

            <RowContainer>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Login </WhiteFormLabel>
                <Input
                  type="text"
                  onChange={(event) => {
                    setDadosFormulario((prevData) => ({
                      ...prevData,
                      condominio: {
                        ...prevData.condominio,
                        login: event.target.value,
                      },
                    }));
                  }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Senha </WhiteFormLabel>
                <Input
                  type="text"
                  onChange={(event) => {
                    setDadosFormulario((prevData) => ({
                      ...prevData,
                      condominio: {
                        ...prevData.condominio,
                        senha: event.target.value,
                      },
                    }));
                  }}
                />
              </FormControl>
            </RowContainer>
            <RowContainer>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Telefone Fixo </WhiteFormLabel>
                <Input
                  type="text"
                  onChange={(event) => {
                    setDadosFormulario((prevData) => ({
                      ...prevData,
                      condominio: {
                        ...prevData.condominio,
                        telefone_fixo: event.target.value,
                      },
                    }));
                  }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Telefone Celular </WhiteFormLabel>
                <Input
                  type="text"
                  onChange={(event) => {
                    setDadosFormulario((prevData) => ({
                      ...prevData,
                      condominio: {
                        ...prevData.condominio,
                        telefone_celular: event.target.value,
                      },
                    }));
                  }}
                />
              </FormControl>
            </RowContainer>

            <FormControl fullWidth margin="normal">
              <WhiteFormLabel>Valor Mensal</WhiteFormLabel>
              <Input
                type="text"
                onChange={(event) => {
                  setDadosFormulario((prevData) => ({
                    ...prevData,
                    condominio: {
                      ...prevData.condominio,
                      valor_mensal: event.target.value,
                    },
                  }));
                }}
              />
            </FormControl>
          </div>
        )}
      </FormControl>
      <FormControl fullWidth margin="normal">
        <WhiteFormLabel>IPTU:</WhiteFormLabel>
        <div>
          <Checkbox
            onChange={(event) => {
              const isExempt = event.target.checked;
              setIsIptuExempt(isExempt);
              if (isExempt) {
                setDadosFormulario((prevData) => ({
                  ...prevData,
                  tipoIptu: "isento",
                }));
              } else {
                setDadosFormulario((prevData) => ({
                  ...prevData,
                  tipoIptu: "",
                }));
              }
            }}
            checked={isIptuExempt}
            value="isento"
            id="isento"
          />
          <WhiteFormLabel component="label" htmlFor="isento">
            Isento
          </WhiteFormLabel>
        </div>
        <div>
          <Checkbox
            onChange={() => {
              setIsIptuExempt(false);
              setDadosFormulario((prevData) => ({
                ...prevData,
                tipoIptu: "",
              }));
            }}
            checked={!isIptuExempt}
            value="naoIsento"
            id="naoIsento"
          />
          <WhiteFormLabel component="label" htmlFor="naoIsento">
            Não Isento
          </WhiteFormLabel>
        </div>
        {!isIptuExempt && (
          <div>
            <FormControl fullWidth margin="normal">
              <WhiteFormLabel>Número de matrícula</WhiteFormLabel>
              <Input
                type="text"
                value={dadosFormulario.iptu.numero_matricula_iptu}
                onChange={(event) => {
                  const numeroMatricula = event.target.value;
                  setDadosFormulario((prevData) => ({
                    ...prevData,
                    iptu: {
                      ...prevData.iptu,
                      numero_matricula_iptu: numeroMatricula,
                    },
                  }));
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <WhiteFormLabel>Valor Mensal</WhiteFormLabel>
              <Input
                type="number"
                inputProps={{ step: "0.01", min: "0" }}
                value={dadosFormulario.iptu.valorMensal}
                onChange={(event) => {
                  const valorMensal = parseFloat(event.target.value);
                  if (!isNaN(valorMensal)) {
                    setDadosFormulario((prevData) => ({
                      ...prevData,
                      iptu: {
                        ...prevData.iptu,
                        valorMensal,
                      },
                    }));
                  }
                }}
              />
            </FormControl>
          </div>
        )}
      </FormControl>
    </CenterDiv>
  );
}
