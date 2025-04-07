import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css'
import { Notifications } from '@mantine/notifications';
import { DatesProvider } from '@mantine/dates';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
      <MantineProvider>
        <DatesProvider settings={{ locale: 'es', firstDayOfWeek: 0, weekendDays: [0, 6], timezone: 'America/Argentina/Buenos_Aires'}}>
            <Notifications />
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </DatesProvider>
      </MantineProvider>
  </StrictMode>
);
