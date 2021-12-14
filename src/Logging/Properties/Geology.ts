import { enumGeology } from '../constants';

import { GeologyProps } from '../../common/types';

interface ConstantsProps {
  [key: string]: string[];
}

class Geology {
  // property values
  _lithology: string | undefined;
  _oxide: string | undefined;
  _alteration: string | undefined;
  _comment: string | undefined;
  // constants, enumerations
  ALTERATIONS: string[] | undefined;
  LITHOLOGIES: string[] | undefined;
  OXIDES: string[] | undefined;

  constructor(
    { ...props }: GeologyProps = {},
    { ...constants }: ConstantsProps = {}
  ) {
    this.setConstants(constants);
    this.assignProps(props);
  }

  private setConstants({ ...constants }: ConstantsProps = {}) {
    if (constants.ALTERATIONS) {
      this.ALTERATIONS = constants.ALTERATIONS;
    } else {
      this.ALTERATIONS = enumGeology.ALTERATIONS;
    }
    if (constants.LITHOLOGIES) {
      this.LITHOLOGIES = constants.LITHOLOGIES;
    } else {
      this.LITHOLOGIES = enumGeology.LITHOLOGIES;
    }
    if (constants.OXIDES) {
      this.OXIDES = constants.OXIDES;
    } else {
      this.OXIDES = enumGeology.OXIDES;
    }
  }

  private assignProps({ ...props }: GeologyProps = {}) {
    let { lithology, oxide, alteration, comment } = props;

    this.lithology = lithology;
    this.oxide = oxide;
    this.alteration = alteration;
    this.comment = comment;
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
    this.assignProps(props);
  }

  public get lithology() {
    return this._lithology;
  }

  public set lithology(val) {
    if (!val && val !== '') return;
    if (this.LITHOLOGIES) {
      if (this.LITHOLOGIES.includes(val)) {
        this._lithology = val;
      } else {
        throw new Error('not one of LITHOLOGIES');
      }
    } else {
      this._lithology = val;
    }
  }

  public get oxide() {
    return this._oxide;
  }

  public set oxide(val) {
    if (!val && val !== '') return;
    if (this.OXIDES) {
      if (this.OXIDES.includes(val)) {
        this._oxide = val;
      } else {
        throw new Error('not one of OXIDES');
      }
    } else {
      this._oxide = val;
    }
  }

  public get alteration() {
    return this._alteration;
  }

  public set alteration(val) {
    if (!val && val !== '') return;
    if (this.ALTERATIONS) {
      if (this.ALTERATIONS.includes(val)) {
        this._alteration = val;
      } else {
        throw new Error('not one of ALTERATIONS');
      }
    } else {
      this._alteration = val;
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
