import EditIcon from '@mui/icons-material/Edit';
import {IconButton, useMediaQuery} from '@mui/material';
import {Box} from '@mui/system';
import {DataGrid, GridCellParams, GridColDef} from '@mui/x-data-grid';
import {ModalDelete} from '../ModalDelete/ModalDelete';
import {table, tableContainer} from './styles';
import {useToken} from '../../shared/hooks/auth';

interface TableGridProps {
  rows: any[];
  columns: GridColDef[];
  onDelete?: (id: string) => void;
  onEdit: (id: string) => void;
  onView?: (id: string) => void;
  titleDelete?: string;
  subtitleDelete?: string;
}
export function TableGrid(props: TableGridProps) {
  const {User_Access} = useToken();
  const actionColumn: GridColDef[] = [
    {
      field: 'menu',
      headerName: 'Ações',
      type: 'string',
      align: 'right',
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
          {User_Access == 'Enfermeiro' && (
            <IconButton onClick={() => props.onEdit(row.id)}>
              <EditIcon />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  const handleOnCellClick = (params: GridCellParams) => {
    if (params.field !== 'menu' && props.onView) {
      props.onView(params.id.toString());
    }
  };

  const columns = [...props.columns, ...actionColumn];
  const matches = useMediaQuery('(max-width:480px)');
  return (
    <Box sx={tableContainer}>
      <DataGrid
        rows={props.rows}
        pageSize={11}
        rowsPerPageOptions={[]}
        onCellClick={handleOnCellClick}
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
