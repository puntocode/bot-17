import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


// Locale language
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { provideHttpClient } from '@angular/common/http';
registerLocaleData(localeEs, 'es');

const toast = { timeOut: 3000, closeButton: true, progressBar: true };


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes),
    provideToastr(toast),
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ]
};

