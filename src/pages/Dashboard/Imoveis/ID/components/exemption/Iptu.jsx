import React from "react";
import { ColumnContainer } from "../../../style";
import { Input, Typography } from "@mui/material";

export default function Iptu({ data, isEditing, handleInfoChange }) {

  return (
    <>
      {data?.tipoIptu === "Isento" ? (
        <Typography>Isento</Typography>
      ) : (
        <>
          {data?.iptu?.ValorMensal && (
            <div>
              <ColumnContainer>
                <label>Valor Mensal:</label>
                <Input
                  type="text"
                  value={data.iptu?.ValorMensal || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleInfoChange("ValorMensal", e.target.value)
                  }
                />
              </ColumnContainer>
            </div>
          )}

          {data?.iptu?.NumerodeMatriculaIPTU && (
            <div>
              <ColumnContainer>
                <label>Número de Matrícula IPTU:</label>
                <Input
                  type="text"
                  value={data.iptu?.NumerodeMatriculaIPTU || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleInfoChange("NumerodeMatriculaIPTU", e.target.value)
                  }
                />
              </ColumnContainer>
            </div>
          )}
        </>
      )}
    </>
  );
}
