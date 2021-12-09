interface SurveyProps {
  at?: number;
  dip?: number;
  azimuth?: number;
}

class Survey {
  at: number | undefined;
  dip: number;
  azimuth: number;

  constructor({ ...props }: SurveyProps = {}) {
    let { at, dip, azimuth } = props;

    this.at = at;
    this.dip = this.dipVal(dip);
    this.azimuth = this.azimuthVal(azimuth);
  }

  dipVal(val: number = 90): number {
    return val % 360;
  }

  azimuthVal(val: number = 0): number {
    return val % 360;
  }
}

export default Survey;
