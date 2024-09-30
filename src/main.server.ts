import { ApplicationRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

export function bootstrap(): Promise<ApplicationRef> {
  return bootstrapApplication(AppComponent, appConfig);
}

export default bootstrap;