import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule, ErrorHandler } from '@angular/core';
import { logConfig } from './app.config';

import { CustomHttpProvider } from './helpers/custom-http';
import { AppComponent } from './app.component';
import { MasterModule } from './master/master.module';
import { GestioneUtentiModule } from './amministrazione/gestioneUtenti/gestioneUtenti.module';
import { GestioneAttivitaModule } from './amministrazione/gestioneAttivita/gestioneAttivita.module';

import { JL } from 'jsnlog';

//LOGGER SETTING
export class UncaughtExceptionHandler implements ErrorHandler {
  handleError(error: any) {
      JL().fatalException('Arch Uncaught Exception', error);
  }
}

//per setting header custom
var addRequestHeaders = function (xhr: XMLHttpRequest) {
  //console.log(json);
  //xhr.setRequestHeader('Access-Control-Allow-Origin', 'true');
};


// Set the level of the nameless loggr to INFO, so only log items
// with severity WARN or higher get logged.
var ajaxAppender = JL.createAjaxAppender('ajaxAppender')
                     .setOptions({"beforeSend": addRequestHeaders});
var consoleAppender = JL.createConsoleAppender('consoleAppender');

JL().setOptions({ "level": logConfig.logLevel, 
                  "appenders": [ajaxAppender, consoleAppender] });
JL.setOptions({ "defaultAjaxUrl": logConfig.apiUrl });


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MasterModule,
    GestioneUtentiModule,
    GestioneAttivitaModule,
    NgbModule.forRoot()
  ],
  providers: [
    CustomHttpProvider,
    { provide: 'JSNLOG', useValue: JL },
    { provide: ErrorHandler, useClass: UncaughtExceptionHandler }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
