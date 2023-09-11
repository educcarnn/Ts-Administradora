import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useModal } from '../../../../../context/ModalContext';
import PropertyForm from '../../../Imoveis/PropertyForm';

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

function Modalmovel({modalImovel, handleClose }) {
  const classes = useStyles();
  const { isModalOpen } = useModal();

  return (
    <Modal
      className={classes.modal}
      open={modalImovel} // Correção aqui: alterado de isModalOpen para open
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isModalOpen}>
        <div className={classes.paper}>
          <PropertyForm onClose={handleClose} />
        </div>
      </Fade>
    </Modal>
  );
}

export default Modalmovel;
