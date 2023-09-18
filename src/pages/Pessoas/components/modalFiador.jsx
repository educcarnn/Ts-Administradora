import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';

function FiadorModal({ open, handleClose }) {

  // Você precisaria pegar os dados dos fiadores e imóveis de alguma fonte de dados. 
  // Para simplificar, estou usando arrays estáticos como exemplo.
  const fiadores = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
    // ... outros fiadores
  ];

  const imoveis = [
    { id: 1, endereco: 'Rua A, 123' },
    { id: 2, endereco: 'Rua B, 456' },
    // ... outros imóveis
  ];

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Fiador</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
          

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="fiador-label">Fiador</InputLabel>
                <Select
                  labelId="fiador-label"
                  id="fiador"
                >
                  {fiadores.map(fiador => (
                    <MenuItem key={fiador.id} value={fiador.id}>{fiador.nome}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="imovel-label">Imóvel dado como fiança</InputLabel>
                <Select
                  labelId="imovel-label"
                  id="imovelComoFianca"
                >
                  {imoveis.map(imovel => (
                    <MenuItem key={imovel.id} value={imovel.id}>{imovel.endereco}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="numeroMatriculaRGI"
                label="Número de Matrícula RGI"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="endereco"
                label="Endereço"
                type="text"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FiadorModal;
