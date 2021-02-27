import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '@app/app.module';
import { environment } from '@env/environment';
import { hmrBootstrap } from './hmr';

/**
 *
 * Author: Yaroslav Skriaga
 * Date: 27.02.2021
 *
 *
 * Entry file
 *
 **/

if (environment.production) {
  enableProdMode();
}

switch (environment.dev) {
  case false:
    for (let func in console) { if (console.hasOwnProperty(func)) { console[func] = () => {} }}
    break;
  case true:
    console.log("%cDevelopment Mode!", "color: red; font-size: 1.5em; font-weight: bold; background-color:#dcf7ff; padding:10px 40px");
    break;
  default:
    console.error('[Error] Development mode param has invalid value');
    break;
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
  if ((module as any).hot) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch((err) => console.error(err));
}
