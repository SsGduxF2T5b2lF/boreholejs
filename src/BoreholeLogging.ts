import { v4 as uidv4 } from 'uuid';

import Borehole from './Borehole';
import Logging from './Logging';

/**
 * class BoreholeLogging
 * extending Logging and has reference to Borehole
 */
class BoreholeLogging extends Logging {
  private maxRetries: number;
  _id?: string;
  _name?: string;
  private parent?: Borehole;
  constructor({ ...props } = {}, parent?: any) {
    super();
    this.maxRetries = 10;
    this.parent = this.assignParent(parent);
    this.assignProps({ ...props });
    this._id = this.setID();
  }

  public get config() {
    let config = this.getConfig();
    config.name = this.name;
    config.id = this.id;
    return config;
  }

  private assignParent(parent: any) {
    if (!parent) {
      throw new Error('parent not Borehole');
    }
    if (!(parent instanceof Borehole)) {
      throw new Error('parent not Borehole');
    }
    return parent;
  }

  public get hasParent() {
    return !!this.parent;
  }

  private assignProps({ ...props }) {
    let { name } = props;

    this.name = name;
  }

  private setID(): string {
    let succeed = undefined;
    let newID = '';
    for (let i = 0; i < this.maxRetries; i++) {
      if (succeed) break;
      newID = uidv4();
      if (this.hasParent) {
        succeed = this.parent?.mapLogging(newID, this);
      } else {
        succeed = true;
      }
    }
    return newID;
  }

  public set name(val) {
    if (!val) return;
    this._name = val;
  }

  public get name() {
    return this._name;
  }

  public get id() {
    return this._id;
  }
}

export default BoreholeLogging;
