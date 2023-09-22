import { useFormularioContext } from "../../../../context/CadastroProvider"; // Importe o contexto de CadastroProviders
import {
  FormControl,
  FormLabel,
  Select,
  FormControlLabel,
  InputLabel,
  Input,
  Checkbox,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import styled from "styled-components";
import { useEffect } from "react";

const WhiteFormLabel = styled(FormLabel)`
  color: black;
`;

export default function IPTU() {
  const { register, setValue } = useFormularioContext();

  return (
    <div>
      <FormControl fullWidth margin="normal">
        <WhiteFormLabel htmlFor="numeroMatriculaIptu">
          Número de matrícula
        </WhiteFormLabel>
        <Input
          type="text"
          id="numeroMatriculaIptu"
          {...register("iptu.numero_matricula_iptu")}
          defaultValue=""
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <WhiteFormLabel htmlFor="valorMensal">Valor Mensal</WhiteFormLabel>
        <Input
          type="text"
          id="valorMensal"
          {...register("iptu.valor_mensal")}
          startAdornment={<InputAdornment position="start">R$</InputAdornment>}
        />
      </FormControl>
    </div>
  );
}
