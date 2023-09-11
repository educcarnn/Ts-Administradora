import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PessoaFisica from '../../PessoaFisica/PessoaFisica';
import { useModal } from '../../../../../context/ModalContext';
import { useEffect } from 'react';

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
    overflowY: 'auto', // para adicionar scroll caso o conteúdo ultrapasse a altura da janela.
    maxHeight: '90vh', // 90% da altura da janela.
    width: '50vw', // 80% da largura da janela.
  },
}));

function ModalPessoaFisica({ open, handleClose }) {
  const classes = useStyles();

  const { setIsModalOpen } = useModal();

    useEffect(() => {
        setIsModalOpen(open);

        return () => {
            setIsModalOpen(false);
        }
    }, [open, setIsModalOpen]);

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
          <PessoaFisica onClose={handleClose} />
        </div>
      </Fade>
    </Modal>
  );
}

export default ModalPessoaFisica;
