import React from "react";
import { TextField, Typography } from "@material-ui/core";
import { Label } from "../PessoaFisica";
import { RowContainer } from "../../../Imoveis/style";

function EnderecoForm({ register, errors, handleCEPBlur, classes }) {
  return (
    <div>
      <Typography variant="h6" className={classes.marginBottom}>
        Endereço
      </Typography>
      <Label>
        <Label>CEP: </Label>
        <TextField
          type="text"
          {...register("cep", { required: true })}
          errors={errors.cep}
          helperText={errors.cep ? "Preencha este campo" : ""}
          onBlur={handleCEPBlur}
        />
      </Label>
      <RowContainer>
        <Label>
          Bairro:
          <TextField type="text" {...register("bairro")} disabled/>
        </Label>
        <Label>
          Cidade:
          <TextField type="text" {...register("cidade")} disabled/>
        </Label>
      </RowContainer>
      <RowContainer>
        <Label>
          Estado:
          <TextField type="text" {...register("estado")} disabled/>
        </Label>
        <Label>
          Número:
          <TextField
            type="text"
            {...register("numero", { required: true })}
            errors={errors.numero}
            helperText={errors.numero ? "Preencha este campo" : ""}
            
          />
        </Label>
        <Label>
          Complemento:
          <TextField
            type="text"
            {...register("andar", { required: true })}
            errors={errors.andar}
            helperText={errors.andar ? "Preencha este campo" : ""}
          />
        </Label>
      </RowContainer>
    </div>
  );
}

export default EnderecoForm;
