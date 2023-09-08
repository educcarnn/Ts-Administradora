import React from "react";

import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import PaymentIcon from "@material-ui/icons/Payment";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import InboxIcon from "@material-ui/icons/Inbox";
import { Input } from "@material-ui/core";
function Contrato({ data, handleInfoChange, isEditing }) {

  const formatarEndereco = (tipoImovel, localizacao) => {
    if (!localizacao) return "";
    return `${tipoImovel} no ${localizacao.Bairro}, ${localizacao.Endereco}, CEP: ${localizacao.CEP}`;
  };

  const enderecoFormatado = formatarEndereco(
    data?.imovel?.tipo,
    data?.imovel?.Localizacao
  );

  const verificarTarifa = (tipoCobranca, inquilino, proprietario) => {
    const chave =
      tipoCobranca === "Locatário"
        ? inquilino?.dadoBancarios
        : proprietario?.dadoBancarios;
    return chave
      ? "Cobrar tarifa bancária por pix"
      : "Cobrar tarifa bancária por DOC/TED";
  };

  const tarifa = verificarTarifa(
    data?.cobranca,
    data?.inquilino,
    data?.proprietario
  );

  return (
    <div className="contrato-container">
      <h2>Contrato</h2>

      <div>
        <HomeIcon />
        <strong>Imóvel:</strong>
        <Button
          component={RouterLink}
          to={`/admin/imovel/${data?.imovel?.id}`}
          style={{ textDecoration: "underline", color: "inherit" }}
        >
          {enderecoFormatado}
        </Button>
      </div>

      <div>
  <AttachMoneyIcon />
  <strong>Aluguel:</strong>
  {isEditing ? (
    <Input
      value={data?.detalhesContrato?.valor}
      onChange={(e) =>
        handleInfoChange("valor", e.target.value)  // Alterado para "valor"
      }
    />
  ) : (
    <p>R$ {data?.detalhesContrato?.valor}</p>
  )}
</div>

<div>
  <ReceiptIcon />
  <strong>Tx de adm:</strong>
  {isEditing ? (
    <Input
      value={data?.detalhesContrato?.taxaAdm}
      onChange={(e) =>
        handleInfoChange("taxaAdministracao", e.target.value)  // Alterado para "taxaAdministracao"
      }
    />
  ) : (
    <p>{data?.detalhesContrato?.taxaAdm} %</p>
  )}
</div>
      <div>
        <SwapHorizontalCircleIcon />
        <strong>Repasse: A definir</strong>
        <p>{data?.repasse}</p>
      </div>

      <div>
        <PaymentIcon />
        <strong>Tarifa:</strong>
        <p>{tarifa}</p>
      </div>

      <div>
        <MoneyOffIcon />
        <strong>Tarifa cobrança:</strong>
        <p>{data?.detalhesContrato?.cobranca}</p>
      </div>

      <div>
        <LocationOnIcon />
        <strong>Usar endereço do imóvel locado </strong>
        <p>{data?.enderecoCobranca}</p>
      </div>

      <div>
        <AccountBalanceIcon />
        <strong>Conta bancária: Definir</strong>
        <p>{data?.contaBancaria}</p>
      </div>

      <div>
        <InboxIcon />
        <strong>Forma entrega: Digital</strong>
        <p>{data?.formaEntrega}</p>
      </div>
    </div>
  );
}

export default Contrato;
