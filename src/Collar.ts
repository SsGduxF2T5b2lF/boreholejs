interface CollarProps {
  x: number;
  y: number;
  z: number;
  azimuth: number;
  dip: number;
  totalDepth: number;
}

class Collar {
  x: number;
  y: number;
  z: number;
  azimuth: number;
  dip: number;
  totalDepth: number;

  constructor({...props}: CollarProps|any = {}) {
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

  public get value() {
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
