import EditIcon from '@mui/icons-material/Edit';
import {Button, Icon, IconButton, useMediaQuery} from '@mui/material';
import {Box} from '@mui/system';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {table, tableContainer} from './styles';
import {ModalDelete} from '../../../../components/ModalDelete/ModalDelete';
import {useToken} from '../../../../shared/hooks/auth';

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
  const actionColumn: GridColDef[] = [
    {
      field: 'menu',
      headerName: '',
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
  const matches = useMediaQuery('(max-width:480px)');
  return (
    <Box sx={tableContainer}>
      <DataGrid
        rows={props.rows}
        pageSize={11}
        rowsPerPageOptions={[]}
        columns={columns.map((column: GridColDef) => ({
          ...column,
          ...(!matches
            ? {
                flex: 1,
              }
            : {width: 230}),
          sortable: false,
          headerClassName: 'super-app-theme--header',
        }))}
        sx={table}
      />
    </Box>
  );
}
