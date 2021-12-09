import {
  CollarProps,
} from './common/types';

class Collar {
  x: number|undefined;
  y: number|undefined;
  z: number|undefined;
  azimuth: number|undefined;
  dip: number|undefined;
  totalDepth: number|undefined;

  constructor({...props}: CollarProps|any = {}) {
    this.x = undefined;
    this.y = undefined;
    this.z = undefined;
    this.azimuth = undefined;
    this.dip = undefined;
    this.totalDepth = undefined;

    this._assignProps(props);
  }

  _assignProps(props: CollarProps = {}) {
    const {
      x,
      y,
      z,
      azimuth,
      dip,
      totalDepth,
    } = props;

    this.x = x;
    this.y = y;
    this.z = z;
    this.azimuth = this.azimuthVal(azimuth);
    this.dip = this.dipVal(dip);
    this.totalDepth = totalDepth;
  }

  public set value({...props}: CollarProps) {
    this._assignProps(props);
  }

  public get value(): CollarProps {
    let result = {
      'x': this.x,
      'y': this.y,
      'z': this.z,
      'azimuth': this.azimuth,
      'dip': this.dip,
      'totalDepth': this.totalDepth,
    };

    return result;
  }

  azimuthVal(val:number = 0): number {
    return val%360;
  }
  dipVal(val:number = 90): number {
    return val%360;
  }
}

export default Collar;
