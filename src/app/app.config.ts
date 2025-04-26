import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideQuillConfig, QuillModule } from 'ngx-quill';

import { routes } from './app.routes';
declare var ClassicEditor: any;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideQuillConfig({
    //   modules: {
    //     toolbar: [
    //       ['bold', 'italic', 'underline'],
    //       ['image', 'code-block'],
    //     ],
    //     imageResize: {}, // این قسمت برای پلاگین resize
    //   },
    //   theme: 'snow',
    // }),
  ],
};
