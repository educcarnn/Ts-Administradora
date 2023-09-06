import React from "react";
import { ColumnContainer } from "../../../Imoveis/style";
import { Input } from "@material-ui/core";

const CaracteristicasConstrucao = ({ data, isEditing, handleInfoChange }) => {

  return (
    <ColumnContainer>
      <strong>Tipo Imóvel:</strong>
      <Input
        value={data["TipoImovel"]}
        onChange={(e) => handleInfoChange("TipoImovel", e.target.value)}
        disabled={!isEditing}
      />

      <strong>Área Total:</strong>
      <Input
        value={data.caracteristicas?.AreaTotal}
        onChange={(e) => handleInfoChange("AreaTotal", e.target.value)}
        disabled={!isEditing}
      />

      <strong>Área Útil:</strong>
      <Input
        value={data.caracteristicas?.AreaUtil}
        onChange={(e) => handleInfoChange("AreaUtil", e.target.value)}
        disabled={!isEditing}
      />

      <strong>Número de Banheiros:</strong>
      <Input
     value={data.caracteristicas?.NumerodeBanheiros}
        onChange={(e) =>
          handleInfoChange("NumerodeBanheiros", e.target.value)
        }
        disabled={!isEditing}
      />

      <strong>Número de Quartos:</strong>
      <Input
        value={data.caracteristicas?.NumerodeQuartos}
        onChange={(e) => handleInfoChange("NumerodeQuartos", e.target.value)}
        disabled={!isEditing}
      />

      <strong>Número de Suítes:</strong>
      <Input
        value={data.caracteristicas?.NumerodeSuites}
        onChange={(e) => handleInfoChange("NumerodeSuites", e.target.value)}
        disabled={!isEditing}
      />

      <strong>Número de Vagas:</strong>
      <Input
 value={data.caracteristicas?.NumerodeQuartos}
        onChange={(e) => handleInfoChange("NumerodeVagas", e.target.value)}
        disabled={!isEditing}
      />

      <strong>Tipo de Construção:</strong>
      <Input
 value={data.caracteristicas?.TipodeConstrucao}
        onChange={(e) => handleInfoChange("TipodeConstrucao", e.target.value)}
        disabled={!isEditing}
      />
    </ColumnContainer>
  );
};

export default CaracteristicasConstrucao;
