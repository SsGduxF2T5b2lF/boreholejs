import * as LoggingBase from '../Logging/Base';
import * as LoggingProperties from '../Logging/Properties';
import { LoggingDumpProps } from '../common/types';
import { LinkedList } from '../helpers/LinkedList';

import { enumGeology } from './constants';

const { Geology } = LoggingProperties;

class Logging {
  baseEntity?: any;
  propertyEntities: any[];
  rows: LinkedList;
  constants: { [key: string]: string[] };
  utilValues: { [key: string]: any };

  constructor() {
    this.baseEntity = undefined;
    this.propertyEntities = [];
    this.utilValues = {};

    this.rows = new LinkedList();
    this.constants = this.initConstants();
  }

  remapConfigOut(input: any) {
    if (!input || !(input instanceof Object)) return {};
    let result = { ...input };
    if (result.baseEntity === LoggingBase.Point) {
      result.baseEntity = 'point';
    } else if (result.baseEntity === LoggingBase.Interval) {
      result.baseEntity = 'interval';
    }
    result['propertyEntities'] = [];
    result.propertyEntities = input.propertyEntities.map((item: any) => {
      if (item === LoggingProperties.Geology) {
        return 'geology';
      } else {
        return undefined;
      }
    });
    return result;
  }

  remapConfigIn(input: any) {
    if (!input || !(input instanceof Object)) return;
    if (Object.keys(input).includes('baseEntity')) {
      this.setBaseEntity(input.baseEntity);
    }
    if (Object.keys(input).includes('propertyEntities')) {
      this.propertyEntities = [];
      input.propertyEntities.forEach((item: any) => {
        if (item === 'geology') {
          this.addPropertyEntity('geology');
        }
      });
    }
    if (Object.keys(input).includes('constants')) {
      this.constants = input.constants;
    }
  }

  getConfig() {
    return this.remapConfigOut({
      baseEntity: this.baseEntity,
      propertyEntities: this.propertyEntities,
      constants: this.constants,
    });
  }

  setConfig({ ...props }) {
    this.remapConfigIn(props);
  }

  setConstant(key: string, items: string[]) {
    this.constants[key] = items;
  }

  /**
   * init constants (enumerated values) for properties
   */
  private initConstants() {
    return {
      ALTERATIONS: enumGeology.ALTERATIONS,
      LITHOLOGIES: enumGeology.LITHOLOGIES,
      OXIDES: enumGeology.OXIDES,
    };
  }

  // opt create constants so setBase can be executed something like this
  // setBase(Logging.constant.INTERVAL);
  setBaseEntity(opt: string) {
    switch (opt) {
      case 'interval':
        this.baseEntity = LoggingBase.Interval;
        break;
      case 'point':
        this.baseEntity = LoggingBase.Point;
        break;
    }
  }

  addPropertyEntity(opt: string) {
    if (!opt) return;
    let LeProp = undefined;
    switch (opt.toUpperCase()) {
      case 'GEOLOGY':
        LeProp = Geology;
        break;
    }

    if (LeProp && !this.propertyEntities.includes(LeProp)) {
      this.propertyEntities.push(LeProp);
    }
  }

  removePropertyEntity(opt: string) {
    switch (opt) {
      case 'geology':
        this.propertyEntities = this.propertyEntities.filter(
          item => item !== Geology
        );
        break;
    }
  }

  dumpObject(row: any = {}): LoggingDumpProps {
    let result = {};
    let leRow = undefined;

    this.propertyEntities.forEach(Item => {
      leRow = new Item(row, this.constants);
      result = { ...result, ...leRow.value };
    });

    if (this.baseEntity) {
      leRow = new this.baseEntity();
      leRow.value = row;
      result = { ...result, ...leRow.value };
    }

    return result;
  }

  /**
   * return structured data from rows[] using baseEntity and propertyEntities class
   * rows = [{ x: 1, y: 2, z: 3, lithology: 'DCT' }];
   * baseEntity=Interval, propertyEntities=[Geology];
   * result = { ...valueOfBase, ...valueOfGeology };
   */
  dump(): LoggingDumpProps[] {
    let result = [];
    let row = this.rows.first;
    while (row) {
      result.push(this.dumpObject(row?.value));
      row = row.next;
    }
    return result;
    // return this.rows.toArray().map(row => this.dumpObject(row));
  }
}

export default Logging;
