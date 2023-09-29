import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PessoaJuridica from '../PessoaJuridica';

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

function ModalPessoaJuridica({ open, handleClose, setDadosPessoaJuridica }) {
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
          <PessoaJuridica onClose={handleClose} setDadosPessoaJuridica={setDadosPessoaJuridica}/>
        </div>
      </Fade>
    </Modal>
  );
}

export default ModalPessoaJuridica;
