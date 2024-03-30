import {Route, Routes} from 'react-router-dom';
import {DefaultLayout} from '../layouts/DefaultLayout';
import {NotFound} from '../pages/NotFound';
import {useToken} from '../shared/hooks/auth';
import {APP_PAGES} from './pages.routes';
import SignInSide from '../pages/Login/signInSide';

export function AppRoutes() {
  const {permission, token} = useToken();
  return (
    <Routes>
      {permission !== false ? (
        <Route path="/" element={<DefaultLayout />}>
          {APP_PAGES().map(({route, component}) => (
            <Route key={route} path={route} element={component} />
          ))}
        </Route>
      ) : (
        <Route key={'login'} path="/" element={<SignInSide />} />
      )}
      {((permission && token) || (!permission && !token)) && (
        <Route path="*" element={<NotFound />} />
      )}
    </Routes>
  );
}
