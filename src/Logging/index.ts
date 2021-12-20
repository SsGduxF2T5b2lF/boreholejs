import * as LoggingBase from '../Logging/Base';
import * as LoggingProperties from '../Logging/Properties';
import { LoggingDumpProps } from '../common/types';
import { LinkedList } from '../helpers/LinkedList';

import { enumGeology, enumAlterationMineral, entityName } from './constants';

const { Geology, AlterationMineral } = LoggingProperties;

class Logging {
  baseEntity?: any;
  propertyEntities: any[];
  rows: LinkedList;
  constants: { [key: string]: (number | string)[] };
  utilValues: { [key: string]: any };

  constructor() {
    this.baseEntity = undefined;
    this.propertyEntities = [];
    this.utilValues = {};

    this.rows = new LinkedList();
    this.constants = this.initConstants();
  }

  getColumns() {
    let result = {};
    result = {
      ...result,
      ...this.baseEntity?.getColumns(),
    };

    this.propertyEntities.forEach((item: any) => {
      result = {
        ...result,
        ...item?.getColumns(),
      };
    });

    return result;
  }

  remapConfigOut(input: any) {
    if (!input || !(input instanceof Object)) return {};
    let result = { ...input };
    if (result.baseEntity === LoggingBase.Point) {
      result.baseEntity = entityName.point;
    } else if (result.baseEntity === LoggingBase.Interval) {
      result.baseEntity = entityName.interval;
    }
    result['propertyEntities'] = [];
    result.propertyEntities = input.propertyEntities.map((item: any) => {
      if (item === LoggingProperties.Geology) {
        return entityName.geology;
      } else if (item === LoggingProperties.AlterationMineral) {
        return entityName.alterationMineral;
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
        if (item.toUpperCase() === entityName.geology) {
          this.addPropertyEntity(entityName.geology);
        } else if (item.toUpperCase() === entityName.alterationMineral) {
          this.addPropertyEntity(entityName.alterationMineral);
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

  setConstant(key: string, items: (number | string)[]) {
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
      AD: enumAlterationMineral.AD,
      AR: enumAlterationMineral.AR,
      CA: enumAlterationMineral.CA,
      CH: enumAlterationMineral.CH,
      EP: enumAlterationMineral.EP,
      SE: enumAlterationMineral.SE,
      SIL: enumAlterationMineral.SIL,
      SIAR: enumAlterationMineral.SIAR,
      SICH: enumAlterationMineral.SICH,
    };
  }

  // opt create constants so setBase can be executed something like this
  // setBase(Logging.constant.INTERVAL);
  setBaseEntity(opt: string) {
    if (!opt) return;
    switch (opt.toUpperCase()) {
      case entityName.interval:
        this.baseEntity = LoggingBase.Interval;
        break;
      case entityName.point:
        this.baseEntity = LoggingBase.Point;
        break;
    }
  }

  addPropertyEntity(opt: string) {
    if (!opt) return;
    let LeProp = undefined;
    switch (opt.toUpperCase()) {
      case entityName.geology:
        LeProp = Geology;
        break;
      case entityName.alterationMineral:
        LeProp = AlterationMineral;
        break;
    }

    if (LeProp && !this.propertyEntities.includes(LeProp)) {
      this.propertyEntities.push(LeProp);
    }
  }

  removePropertyEntity(opt: string) {
    switch (opt.toUpperCase()) {
      case entityName.geology:
        this.propertyEntities = this.propertyEntities.filter(
          item => item !== Geology
        );
        break;
      case entityName.alterationMineral:
        this.propertyEntities = this.propertyEntities.filter(
          item => item !== AlterationMineral
        );
        break;
    }
  }

  dumpObject(row: any = {}): LoggingDumpProps {
    let result = {};
    let leRow = undefined;

    // if input is LLItem
    // - leRow = new Item(row.value, this.constants);
    // benefits?:
    // - has row id
    // - has isFirst(), hasNext(), etc
    // so we can make proper list of
    // - catched error and collect as array/linkedlist?

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
      // TODO: might as well use LLItem instead of LLItem.value,
      // since next() and prev() can be utilized especially for interval
      result.push(this.dumpObject(row?.value));
      row = row.next;
    }
    return result;
  }
}

export default Logging;
