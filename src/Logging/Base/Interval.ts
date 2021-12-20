import { IntervalProps } from '../../common/types';

class Interval {
  z0: number | undefined;
  z1: number | undefined;

  constructor({ ...props }: IntervalProps = {}) {
    this.z0 = undefined;
    this.z1 = undefined;

    this._assignProps(props);
  }

  static getColumns() {
    return {
      z0: 'z0',
      z1: 'z1',
    };
  }

  _assignProps({ ...props }: IntervalProps = {}) {
    let { z0, z1 } = props;

    if (z0 !== null && z0 !== undefined) {
      this.z0 = z0;
    }
    if (z1 !== null && z1 !== undefined) {
      this.z1 = z1;
    }
  }

  public get interval() {
    return this.getInterval();
  }

  public get value() {
    return this.getValue();
  }

  public set value({ ...props }: IntervalProps | any) {
    this._assignProps(props);
  }

  getInterval(): number | undefined {
    let result = undefined;
    if (this.z0 === null || this.z0 === undefined) {
      return result;
    }
    if (this.z1 === null || this.z1 === undefined) {
      return result;
    }
    result = this.z1 - this.z0;
    return result;
  }

  getValue() {
    return {
      z0: this.z0,
      z1: this.z1,
      interval: this.interval,
    };
  }
}

export default Interval;
