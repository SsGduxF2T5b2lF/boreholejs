import * as LoggingBase from './loggingBase';
import * as LoggingProperties from './loggingProperties';
import { LoggingDumpProps } from './common/types';
import { LinkedList } from './helpers/LinkedList';

const { Geology } = LoggingProperties;

class Logging {
  base?: any;
  properties: any[];
  rows: LinkedList;

  constructor() {
    this.base = undefined;
    this.properties = [];

    this.rows = new LinkedList();
  }

  // opt create constants so setBase can be executed something like this
  // setBase(Logging.constant.INTERVAL);
  setBase(opt: string) {
    switch (opt) {
      case 'interval':
        this.base = LoggingBase.Interval;
        break;
      case 'point':
        this.base = LoggingBase.Point;
        break;
    }
  }

  addProperties(opt: string) {
    let LeProp = undefined;
    switch (opt) {
      case 'geology':
        LeProp = Geology;
        break;
    }

    if (LeProp && !this.properties.includes(LeProp)) {
      this.properties.push(LeProp);
    }
  }

  dumpObject(row: any = {}): LoggingDumpProps {
    let result = {};
    let leRow = undefined;
    if (this.base) {
      leRow = new this.base();
      leRow.value = row;
      result = { ...leRow.value };
    }

    this.properties.forEach(Item => {
      leRow = new Item();
      leRow.value = row;
      result = { ...leRow.value };
    });

    return result;
  }

  /**
   * return structured data from rows[] using base and properties class
   * rows = [{ x: 1, y: 2, z: 3, lithology: 'DCT' }];
   * base=Interval, properties=[Geology];
   * result = { ...valueOfBase, ...valueOfGeology };
   */
  dump(): LoggingDumpProps[] {
    return this.rows.toArray().map(row => this.dumpObject(row));
  }
}

export default Logging;
