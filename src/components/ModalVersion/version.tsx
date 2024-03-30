import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Dialog } from '@mui/material';
import { Description, Text } from './style';

export default function VersionModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const body = (
    <Box
      style={{
        padding: '35px',
      }}>
      <div>
        <Description>

          V0.1.0
          <Text>ÚLTIMA</Text>

          <h4>21 de Abril de 2023</h4>
          <p> As implementações nesta versão são : </p>
          <ul>
            <li>
              Crud: Paciente e Enfermeiro.
            </li>
          </ul>
          <br />
          <h4>Contribuições:</h4>
          <p>
            Carine Ferreira, Deangelly Coutinho, Leticia Alves e Marciete
            Dellarmelina.
          </p>
        </Description>
      </div>
    </Box>
  );

  return (
    <div>
      <Button onClick={handleOpen}>VERSION 0.1.0</Button>
      <Dialog
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
        sx={{ m: 2, p: 10 }}
        open={open}>
        {body}
      </Dialog>
    </div>
  );
}
