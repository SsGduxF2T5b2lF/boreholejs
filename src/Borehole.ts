import { v4 as uidv4 } from 'uuid';
import Collar from './Collar';

// class Borehole extends Item {
class Borehole {
  _id: string;
  bhid: string;
  _collar: Collar;

  constructor({...props}: {}|any = {}) {
    let newId = uidv4();
    let {
      bhid,
      ...rest
    } = props;
    if (bhid) {
      this.bhid = bhid;
    } else {
      this.bhid = newId;
    }
    this._id = newId;
    this._collar = new Collar(rest);
  }

  public get id() {
    return this._id;
  }

  getValues() {
    let result = {
      'bhid': this.bhid,
    };
    return result;
  }

  public get value() {
    return this.getValues();
  }

  getCollar() {
    return this._collar;
  }

  public get collar() {
    return this.getCollar().value;
  }
}

export default Borehole;
