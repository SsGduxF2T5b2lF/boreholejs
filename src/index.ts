import Borehole from './Borehole';
import Collar from './Collar';
import Survey from './Survey';
import BoreholeList from './BoreholeList';

import * as LoggingBase from './loggingBase';

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export { BoreholeList, Borehole, Collar, Survey, LoggingBase };
