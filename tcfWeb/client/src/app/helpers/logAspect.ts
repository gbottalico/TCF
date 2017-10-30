// LogAspect.ts
import { Injectable, Inject } from '@angular/core'
import { AdvicePool, adviceMetadata, IMetadata } from 'kaop-ts'
import { JL } from 'jsnlog';


export class LogAspect extends AdvicePool {

    @Inject('JSNLOG')
    static log(@adviceMetadata meta: IMetadata) {        
        JL().debug('Called: ' + meta.propertyKey);
        JL().debug('Args: ' + JSON.stringify(meta.args));        
    }

    @Inject('JSNLOG')
    public logger : JL.JSNLog;
}

/*
SETTING GENERICI
import { beforeMethod } from 'kaop-ts';import { LogAspect } from '../helpers/logAspect';

@beforeMethod(LogAspect.log)//da posizionare sopra il method del service

SETTING AD-HOC
constructor


*/ 