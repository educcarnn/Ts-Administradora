import React, { useState } from 'react';
import {
  Container, Grid, Typography, Table, TableBody, TableCell, 
  TableHead, TableRow, Paper, TextField, Button, Collapse
} from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function Cobrancas({ cobrancas }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [isExpanded, setIsExpanded] = useState(false);  // Adicionado para controlar a expansão

  const formatSelectedMonth = (month) => {
    const dateComponents = month.split('-'); 
    const date = new Date(dateComponents[0], dateComponents[1] - 1);
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  return (
    <Container>
      <Paper style={{ padding: '20px', backgroundColor: 'rgba(76, 175, 80, 0.2)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">
              COBRANÇAS DO CONTRATO - {formatSelectedMonth(selectedMonth)}
            </Typography>
            
            <TextField
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              InputProps={{
                startAdornment: <CalendarTodayIcon />,
              }}
              style={{ marginBottom: '10px', maxWidth: '150px' }}
            />

            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              {isExpanded ? "Mostrar menos" : "Mostrar mais"}
            </Button>

            <Collapse in={isExpanded}>  {/* Componente de colapso que irá mostrar/ocultar a tabela */}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vencimento</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Detalhes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cobrancas.map((cobranca, index) => (
                    <TableRow key={index}>
                      <TableCell>{cobranca.vencimento}</TableCell>
                      <TableCell>{cobranca.cliente}</TableCell>
                      <TableCell>{cobranca.valor}</TableCell>
                      <TableCell>{cobranca.detalhes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Cobrancas;
