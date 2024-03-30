import {Route} from 'react-router-dom';

import SignInSide from '../pages/Login/signInSide';
export function SignRoutes() {
  return <Route key={'login'} path="/" element={<SignInSide />} />;
}
