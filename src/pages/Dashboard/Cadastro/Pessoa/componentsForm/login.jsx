import React from 'react';
import { Typography, TextField} from '@material-ui/core'; // Assumindo que está usando Material-UI
import { Label } from '../PessoaFisica';

function LoginFormFields({ register, errors, getValues }) {
    return (
        <div>
            <Typography variant="h6">Campos para Login</Typography>
            
            <Label>
                E-mail:
                <TextField
                  type="text"
                  {...register("dadosComuns.email", { required: true })}
                  error={!!errors.email}
                  helperText={errors.email ? "Preencha este campo" : ""}
                />
            </Label>

            <Label>
                Senha:
                <TextField
                  type="password"
                  {...register("password", { required: true })}
                  error={!!errors.password}
                  helperText={errors.password ? "Preencha este campo" : ""}
                />
            </Label>

            <Label>
                Confirmar Senha:
                <TextField
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirmação de senha é obrigatória",
                    validate: (value) =>
                      value === getValues().password ||
                      "As senhas não coincidem",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ""
                  }
                />
            </Label>
        </div>
    );
}

export default LoginFormFields;
