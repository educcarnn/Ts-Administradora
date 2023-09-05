import React, { useState } from 'react';
import {
  Container, Grid, Typography, Button, List, ListItem, ListItemText,
  Paper, Divider, TextField
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

function Despesas({ despesas }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const formatSelectedMonth = (month) => {
    const dateComponents = month.split('-'); 
    const date = new Date(dateComponents[0], dateComponents[1] - 1);
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  return (
    <Container>
      <Paper style={{ padding: '20px', backgroundColor: 'rgba(76, 175, 80, 0.2)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Despesas - {formatSelectedMonth(selectedMonth)}</Typography>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              style={{ marginBottom: '10px', marginRight: '10px' }}
            >
              Nova Despesa
            </Button>

            <TextField
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              InputProps={{
                startAdornment: <CalendarTodayIcon />,
              }}
              style={{ marginBottom: '10px', maxWidth: '150px' }}  // Adicionado o maxWidth aqui
            />

            <List>
              {despesas.map((despesa, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={despesa.descricao} secondary={`R$ ${despesa.valor}`} />
                  </ListItem>
                  {index !== despesas.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Despesas;
