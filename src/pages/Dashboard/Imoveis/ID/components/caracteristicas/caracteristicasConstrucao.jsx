import React from "react";
import { ColumnContainer } from "../../../style";
import { Input } from "@material-ui/core";

const CaracteristicasConstrucao = ({
  handleTipoImovel ,
  camposCaracteristicas,
  tipoImovel,
  isEditing,
  handleCaracteristicasCampo,
}) => {

  return (
    <ColumnContainer>
      <strong>Tipo de Imóvel:</strong>
      <Input
        value={tipoImovel?.tipoImovel || "" }
        onChange={(e) => handleTipoImovel (e.target.value)}
        disabled={!isEditing}
      />
      
      <strong>Área Total:</strong>
      <Input
        value={camposCaracteristicas?.areaTotal || ""}
        onChange={(e) =>
          handleCaracteristicasCampo("areaTotal", e.target.value)
        }
        disabled={!isEditing}
      />

      <strong>Área Útil:</strong>
      <Input
        value={camposCaracteristicas?.areaUtil || ""}
        onChange={(e) => handleCaracteristicasCampo("areaUtil", e.target.value)}
        disabled={!isEditing}
      />

      <strong>Número de Banheiros:</strong>
      <Input
        value={camposCaracteristicas?.numeroBanheiros || ""}
        onChange={(e) =>
          handleCaracteristicasCampo("numeroBanheiros", e.target.value)
        }
        disabled={!isEditing}
      />

      <strong>Número de Quartos:</strong>
      <Input
        value={camposCaracteristicas?.numeroQuartos || ""}
        onChange={(e) =>
          handleCaracteristicasCampo("numeroQuartos", e.target.value)
        }
        disabled={!isEditing}
      />

      <strong>Número de Suítes:</strong>
      <Input
        value={camposCaracteristicas?.numeroSuites || ""}
        onChange={(e) =>
          handleCaracteristicasCampo("numeroSuites", e.target.value)
        }
        disabled={!isEditing}
      />

      <strong>Número de Vagas:</strong>
      <Input
        value={camposCaracteristicas?.numeroVagas || ""}
        onChange={(e) =>
          handleCaracteristicasCampo("numeroVagas", e.target.value)
        }
        disabled={!isEditing}
      />

      <strong>Tipo de Construção:</strong>
      <Input
        value={camposCaracteristicas?.tipoConstrucao || ""}
        onChange={(e) =>
          handleCaracteristicasCampo("tipoConstrucao", e.target.value)
        }
        disabled={!isEditing}
      />
    </ColumnContainer>
  );
};

export default CaracteristicasConstrucao;
