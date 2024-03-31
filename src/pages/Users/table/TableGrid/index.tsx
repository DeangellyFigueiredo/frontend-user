import EditIcon from '@mui/icons-material/Edit';
import {Button, Icon, IconButton, useMediaQuery} from '@mui/material';
import {Box} from '@mui/system';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {table, tableContainer} from './styles';
import {ModalDelete} from '../../../../components/ModalDelete/ModalDelete';
import {useToken} from '../../../../shared/hooks/auth';
import {useEffect, useState} from 'react';

interface TableGridProps {
  rows: any[];
  columns: GridColDef[];
  onDelete?: (id: string) => void;
  onEdit: (id: string) => void;
  titleDelete?: string;
  subtitleDelete?: string;
}
export function TableGrid(props: TableGridProps) {
  const {User_Access} = useToken();
  const [match, setMatch] = useState(useMediaQuery('(max-width:480px)'));

  const actionColumn: GridColDef[] = [
    {
      field: 'menu',
      headerName: 'Ações',
      type: 'string',
      align: 'right',
      disableColumnMenu: false,
      editable: false,
      renderCell: ({row}) => (
        <>
          {props.onDelete && User_Access == 'ADMIN' && (
            <ModalDelete
              title={props.titleDelete}
              subtitle={props.subtitleDelete}
              onDelete={() =>
                props.onDelete ? props.onDelete(row.id) : ''
              }></ModalDelete>
          )}

          {User_Access == 'ADMIN' && (
            <IconButton onClick={() => props.onEdit(row.id)}>
              <EditIcon color="primary" />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  const columns = [...props.columns, ...actionColumn];
  return (
    <Box sx={tableContainer}>
      <DataGrid
        rows={props.rows}
        pageSize={11}
        rowsPerPageOptions={[]}
        columns={columns.map((column: GridColDef) => ({
          ...column,
          width: match ? 150 : column.width,
          ...(!match
            ? {
                flex: 1,
              }
            : {}),
          sortable: false,
          headerClassName: 'super-app-theme--header',
        }))}
        sx={table}
      />
    </Box>
  );
}
