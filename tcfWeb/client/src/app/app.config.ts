import { JL } from 'jsnlog';

export const appConfig = {
    apiUrl: 'http://localhost:4000'
};

export const logConfig = {
    apiUrl: 'http://localhost:4000/tcf/api/jsnlog.logger',
    logLevel: JL.getDebugLevel()
};