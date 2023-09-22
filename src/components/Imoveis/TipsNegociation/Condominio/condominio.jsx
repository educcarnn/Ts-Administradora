import {
  FormControl,
  FormLabel,
  Select,
  FormControlLabel,
  InputLabel,
  Input,
  TextField,
  Checkbox,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import styled from "styled-components";
import { formatarCNPJ } from "../../../../utils/utils";
import { formatarTelefone } from "../../../../utils/utils";
import { useFormularioContext } from "../../../../context/CadastroProvider"; // Importe o contexto de CadastroProviders

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10%;
`;
const WhiteFormLabel = styled(FormLabel)`
  color: black;
`;

function handleInputChange(event) {
  const valorFormatado = formatarCNPJ(event.target.value);
  event.target.value = valorFormatado;
}

export default function Condominio() {
  const { register } = useFormularioContext();

  return (
    <div>
      <div>
        <RowContainer>
          <FormControl fullWidth margin="normal">
            <WhiteFormLabel htmlFor="nomeCondominio">
              Nome Condomínio
            </WhiteFormLabel>
            <Input
              type="text"
              id="nomeCondominio"
              {...register("condominio.nome_condominio")}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <WhiteFormLabel htmlFor="nomeAdministradora">
              Nome Administradora
            </WhiteFormLabel>
            <Input
              type="text"
              id="nomeAdministradora"
              {...register("condominio.nome_administradora")}
            />
          </FormControl>
        </RowContainer>

        <FormControl fullWidth margin="normal">
          <WhiteFormLabel htmlFor="razaoSocial">Razão Social</WhiteFormLabel>
          <Input
            type="text"
            id="razaoSocial"
            {...register("condominio.razao_social")}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel htmlFor="cnpj">CNPJ</WhiteFormLabel>
          <TextField
            type="text"
            {...register("condominio.cnpj", { required: true })}
            maxLength="18"
            onKeyPress={(event) => {
              if (event.which < 48 || event.which > 57) {
                event.preventDefault();
              }
            }}
            onBlur={(event) => {
              const value = event.target.value.replace(/\D/g, "");
              if (value.length === 14) {
                event.target.value = value.replace(
                  /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                  "$1.$2.$3/$4-$5"
                );
              }
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel htmlFor="site">Site</WhiteFormLabel>
          <Input type="text" id="site" {...register("condominio.site")} />
        </FormControl>

        <RowContainer>
          <FormControl fullWidth margin="normal">
            <WhiteFormLabel htmlFor="login">Login</WhiteFormLabel>
            <Input type="text" id="login" {...register("condominio.login")} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <WhiteFormLabel htmlFor="senha">Senha</WhiteFormLabel>
            <Input type="text" id="senha" {...register("condominio.senha")} />
          </FormControl>
        </RowContainer>
        <RowContainer>
          <FormControl fullWidth margin="normal">
            <WhiteFormLabel htmlFor="telefoneFixo">
              Telefone Fixo
            </WhiteFormLabel>
            <Input
              type="text"
              id="telefoneFixo"
              {...register("condominio.telefone_fixo")}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <WhiteFormLabel htmlFor="telefoneCelular">
              Telefone Celular
            </WhiteFormLabel>
            <Input
              type="text"
              id="telefoneCelular"
              {...register("condominio.telefone_celular")}
            />
          </FormControl>
        </RowContainer>

        <FormControl fullWidth margin="normal">
          <WhiteFormLabel htmlFor="valorMensal">Valor Mensal</WhiteFormLabel>
          <Input
            type="text"
            id="valorMensal"
            {...register("condominio.valor_mensal")}
            startAdornment={
              <InputAdornment position="start">R$</InputAdornment>
            }
          />
        </FormControl>
      </div>
    </div>
  );
}
