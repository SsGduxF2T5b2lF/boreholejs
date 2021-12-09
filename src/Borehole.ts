import { v4 as uidv4 } from 'uuid';
import Collar from './Collar';
import {
  // BoreholeProps,
  // CollarProps,
  CreateBoreholeProps,
} from './common/types';

class Borehole {
  _id: string|undefined;
  bhid: string|undefined;
  _collar: Collar;

  constructor({...props}: CreateBoreholeProps = {}) {
    this.bhid = undefined;
    this._id = undefined;
    // init as empty then update in _assignProps
    this._collar = new Collar();

    this._assignProps(props);
  }

  public get id() {
    return this._id;
  }

  _assignProps(props: CreateBoreholeProps = {}) {
    let newId = uidv4();
    let {
      bhid,
    } = props;

    if (bhid) {
      this.bhid = bhid;
    } else {
      this.bhid = newId;
    }

    this._collar.value = props;

    if (!this._id) {
      this._id = newId;
    }
  }

  getValues() {
    let result = {
      'bhid': this.bhid,
      ...this.collar
    };
    return result;
  }

  public get value(): CreateBoreholeProps {
    return this.getValues();
  }

  public set value({...props}: CreateBoreholeProps) {
    this._assignProps(props);
  }

  getCollar() {
    return this._collar;
  }

  public get collar() {
    return this.getCollar().value;
  }

  public set collar({...props}) {
    let collar = this.getCollar();
    let newCollar = {
      ...collar,
      ...props
    }
    if (collar) {
      collar.value = newCollar;
    }
  }
}

export default Borehole;
