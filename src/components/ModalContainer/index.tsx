import React from 'react';
import Button from '@mui/material/Button';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import {colors} from '../../shared/themes';
import {Dialog, DialogProps, Typography, useMediaQuery} from '@mui/material';

interface ModalContainerProps extends DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  actions?: boolean;
  children: React.ReactNode;
}

export function ModalContainer({
  open,
  setOpen,
  title,
  children,
  actions = true,
  ...props
}: ModalContainerProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const matches = useMediaQuery('(max-width:480px)');
  return (
    <>
      <Dialog open={open} {...props} fullScreen={matches}>
        <DialogContent>{children}</DialogContent>
        {actions && (
          <DialogActions sx={{padding: '0 2.5rem 2.5rem 2.5rem'}}>
            <Button variant="text" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained">Cadastrar</Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
