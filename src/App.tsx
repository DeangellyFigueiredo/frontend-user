import {ThemeProvider} from '@emotion/react';

import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from './components/ToastContainer';

import {AppRoutes} from './routes';

import {ModalProvider} from './shared/hooks/useModal';
import {RefreshProvider} from './shared/hooks/useRefresh';
import {ToastProvider} from './shared/hooks/useToast';
import {LightTheme} from './shared/themes';
import {TokenProvider} from './shared/hooks/auth';
import {SignRoutes} from './routes/signIn.routes';

export function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <ModalProvider>
          <ToastProvider>
            <RefreshProvider>
              <TokenProvider>
                <AppRoutes />
              </TokenProvider>
            </RefreshProvider>
            <ToastContainer />
          </ToastProvider>
        </ModalProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
