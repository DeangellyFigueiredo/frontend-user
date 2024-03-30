import {createContext, ReactNode, useContext, useState} from 'react';
import Cookies from 'universal-cookie';
import {Login} from '../../models/login';
import {useToast} from './useToast';
import {validation} from '../../services/api';
import {authToken, login} from '../../services/auth';

interface TokenContextData {
  permission?: Boolean;
  Login: (payload: Login) => void;
  User_Access: string;
  token: string;
}

export enum EAccessLevel {
  ADMIN = 1,
  COMMON = 2,
  GUEST = 3,
}

interface TokenProviderProps {
  children: ReactNode;
}

const TokenContext = createContext<TokenContextData>({} as TokenContextData);

export function TokenProvider({children}: TokenProviderProps) {
  const cookies = new Cookies();
  const {actionToast} = useToast();

  const [permission, setPermission] = useState(false);
  const [token, setToken] = useState(cookies.get('@frontend-user'));
  const [User_Access, setUser_Access] = useState('');

  async function UserValidation() {
    {
      if (token) {
        return await authToken(token)
          .then(async response => {
            setUser_Access(EAccessLevel[response.data.decodedToken.sub.role]);
            await validation();
            setPermission(true);
          })
          .catch(error => {
            if (error.response.status === 401) {
            }
            actionToast({message: error.response.data.message, type: 'error'});
          });
      }
    }
  }

  window.onload = async function () {
    await UserValidation();
  };

  async function Login(payload: Login) {
    await login(payload)
      .then(async response => {
        setUser_Access(EAccessLevel[response.data.role]);
        cookies.set('@frontend-user', response.data.access_token);
        await validation();
        setToken(response.data.token);
        setPermission(true);
        actionToast({message: 'Login realizado com sucesso!', type: 'success'});
      })
      .catch(error => {
        if (error.response.status === 401) {
          setPermission(false);
        }
        actionToast({message: error.response.data.message, type: 'error'});
      });
  }

  return (
    <TokenContext.Provider value={{permission, Login, User_Access, token}}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}
