import {Stack, Chip} from '@mui/material';
import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Nome',
  },
  {
    field: 'surname',
    headerName: 'Sobrenome',
  },
  {
    field: 'email',
    headerName: 'Email',
  },
  {
    field: 'accessLevel',
    headerName: 'Nível de Acesso',
    renderCell: params => (
      <Stack direction="row" spacing={1}>
        {(() => {
          switch (params.value) {
            case 1:
              return <Chip label="Administrativo" color="info" />;
            case 2:
              return <Chip label="Comum" color="warning" />;
            case 3:
              return <Chip label="Convidado" color="error" />;
            default:
              return <Chip label="Usuário" color="default" />;
          }
        })()}
      </Stack>
    ),
  },
  {
    field: 'isActive',
    headerName: 'Status',
    renderCell: params => (
      <Chip
        label={params.value ? 'Ativo' : 'Inativo'}
        color={params.value ? 'info' : 'default'}
      />
    ),
  },
];
