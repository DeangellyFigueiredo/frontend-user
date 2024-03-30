import {useEffect, useState} from 'react';
import {ToolbarContainer} from '../../components/ToolbarContainer';
import {useToast} from '../../shared/hooks/useToast';
import {useModal} from '../../shared/hooks/useModal';
import {columns} from './table/columns';
import {deleteUser, findManyUsers} from '../../services/paciente';
import {useRefresh} from '../../shared/hooks/useRefresh';
import {UserProps} from '../../models/paciente';
import {TableGrid} from './table/TableGrid';
import {useToken} from '../../shared/hooks/auth';
import {CreateUser} from './createUser';

export function Users() {
  const [rows, setRows] = useState<UserProps[]>([]);
  const {actionToast} = useToast();
  const {setOpen, setIdObject} = useModal();
  const {User_Access} = useToken();
  const colunas = [
    {column: 'Nome', value: 'Nome'},
    {column: 'Sobrenome', value: 'Sobrenome'},
    {column: 'Email', value: 'Email'},
    {column: 'Nível de Acesso', value: 'Nível de Acesso'},
    {column: 'Status', value: 'Status'},
  ];

  const {count} = useRefresh();
  useEffect(() => {
    listAll();
  }, []);

  useEffect(() => {
    listAll();
  }, [count]);

  const listAll = () => {
    findManyUsers()
      .then(response => {
        console.log(response.data);
        setRows(response.data);
      })
      .catch(error => {
        actionToast({message: error.response.data.message, type: 'error'});
      });
  };

  const OpenModalEdit = async (id: string) => {
    const userProps = rows.find(user => user.id === id);
    setIdObject(userProps);
    setOpen(true);
  };

  const handleCreateUser = () => {
    setOpen(true);
  };

  const DeleteUser = async (id: string) => {
    try {
      const response = await deleteUser(id);
      if (response.status === 200) {
        listAll();
        actionToast({
          message: 'Usuário excluído com sucesso',
          type: 'success',
        });
      }
    } catch (error: any) {
      actionToast({message: error.response.data.message, type: 'error'});
    }
  };

  return (
    <>
      {<CreateUser />}
      {User_Access === 'ADMIN' && (
        <ToolbarContainer
          title="Usuários"
          captionButton="Novo Usuário"
          onCreate={handleCreateUser}
          column={colunas}
        />
      )}
      <TableGrid
        rows={rows}
        columns={columns}
        onEdit={OpenModalEdit}
        onDelete={DeleteUser}
        titleDelete="Excluir usuário"
        subtitleDelete="Deseja excluir dados do usuário?"
      />
    </>
  );
}
