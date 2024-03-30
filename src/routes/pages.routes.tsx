import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import {useToken} from '../shared/hooks/auth';
import {Users} from '../pages/Users';
import {Graphs} from '../pages/Graphs';

export function APP_PAGES() {
  const {User_Access} = useToken();
  const pages = [
    {
      title: 'Usuários',
      route: '/',
      icon: <PermIdentityOutlinedIcon />,
      component: <Users />,
      showMenu: true,
    },
    {
      title: 'Gráficos',
      route: '/graphs',
      icon: <EqualizerIcon />,
      component: <Graphs />,
      showMenu: User_Access === 'ADMIN' ? true : false,
    },
  ];
  return pages;
}
