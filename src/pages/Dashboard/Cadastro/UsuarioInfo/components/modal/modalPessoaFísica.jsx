import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PessoaFisica from '../../../Pessoa/PessoaFisica';
import PessoaModal from './pessoaModal';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto', 
    maxHeight: '90vh', 
    width: '50vw', 
  },
}));

function ModalPessoaFisica({ open, handleClose, setDadosPessoaFisica }) {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <PessoaModal handleClose={handleClose} setDadosPessoaFisica={setDadosPessoaFisica}/>
        </div>
      </Fade>
    </Modal>
  );
}

export default ModalPessoaFisica;
