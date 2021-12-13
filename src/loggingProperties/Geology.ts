import { enumGeology } from './constants';

import { GeologyProps } from '../common/types';

const { LITHOLOGIES, OXIDES, ALTERATIONS } = enumGeology;

class Geology {
  _lithology: string | undefined;
  _oxide: string | undefined;
  _alteration: string | undefined;
  _comment: string | undefined;

  constructor({ ...props }: GeologyProps = {}) {
    this._assignProps(props);
  }

  _assignProps({ ...props }: GeologyProps = {}) {
    let { lithology, oxide, alteration, comment } = props;

    if (lithology) {
      this._lithology = lithology;
    }
    if (oxide) {
      this._oxide = oxide;
    }
    if (alteration) {
      this._alteration = alteration;
    }
    if (comment) {
      this._comment = comment;
    }
  }

  getValues() {
    return {
      lithology: this.lithology,
      oxide: this.oxide,
      alteration: this.alteration,
      comment: this.comment,
    };
  }

  public get value() {
    return this.getValues();
  }

  public set value({ ...props }: GeologyProps) {
    this._assignProps(props);
  }

  public get lithology() {
    return this._lithology;
  }

  public set lithology(val) {
    if (!val) return;
    else if (LITHOLOGIES.includes(val)) {
      this._lithology = val;
    } else {
      throw new Error('not one of LITHOLOGIES');
    }
  }

  public get oxide() {
    return this._oxide;
  }

  public set oxide(val) {
    if (!val) return;
    else if (OXIDES.includes(val)) {
      this._oxide = val;
    } else {
      throw new Error('not one of OXIDES');
    }
  }

  public get alteration() {
    return this._alteration;
  }

  public set alteration(val) {
    if (!val) return;
    else if (ALTERATIONS.includes(val)) {
      this._alteration = val;
    } else {
      throw new Error('not one of ALTERATIONS');
    }
  }

  public get comment() {
    return this._comment;
  }

  public set comment(val) {
    this._comment = val;
  }
}

export default Geology;
