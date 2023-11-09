import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

export const SERVER_URL = 'http://localhost:8080';
export const API_URL = SERVER_URL + '/api/v1';
