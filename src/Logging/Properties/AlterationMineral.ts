import { enumAlterationMineral } from '../constants';
import { ConstantsProps, AlterationMineralProps } from '../../common/types';

class AlterationMineral {
  [key: string]: any;
  _Sil: number | string | undefined;
  _SiAr: number | string | undefined;
  _SiCh: number | string | undefined;
  _Ar: number | string | undefined;
  _Ch: number | string | undefined;
  _Ca: number | string | undefined;
  _Ep: number | string | undefined;
  _Se: number | string | undefined;
  _Ad: number | string | undefined;
  // constants
  SIL: (string | number)[] | undefined;
  SIAR: (string | number)[] | undefined;
  SICH: (string | number)[] | undefined;
  AR: (string | number)[] | undefined;
  CH: (string | number)[] | undefined;
  CA: (string | number)[] | undefined;
  EP: (string | number)[] | undefined;
  SE: (string | number)[] | undefined;
  AD: (string | number)[] | undefined;

  constructor(
    { ...props }: AlterationMineralProps = {},
    { ...constants }: ConstantsProps = {}
  ) {
    this.setConstants(constants);
    this.assignProps(props);
  }

  setConstants({ ...constants }: ConstantsProps = {}) {
    this.AD = constants.AD || enumAlterationMineral.AD;
    this.AR = constants.AR || enumAlterationMineral.AR;
    this.CA = constants.CA || enumAlterationMineral.CA;
    this.CH = constants.CH || enumAlterationMineral.CH;
    this.EP = constants.EP || enumAlterationMineral.EP;
    this.SE = constants.SE || enumAlterationMineral.SE;
    this.SIL = constants.SIL || enumAlterationMineral.SIL;
    this.SIAR = constants.SIAR || enumAlterationMineral.SIAR;
    this.SICH = constants.SICH || enumAlterationMineral.SICH;
  }

  assignProps({ ...props }) {
    let { Sil, SiAr, SiCh, Ar, Ch, Ca, Ep, Se, Ad } = props;

    this.Ad = Ad;
    this.Se = Se;
    this.Ep = Ep;
    this.Ca = Ca;
    this.Ch = Ch;
    this.Ar = Ar;
    this.Sil = Sil;
    this.SiAr = SiAr;
    this.SiCh = SiCh;
  }

  getValues() {
    return {
      Ad: this.Ad,
      Ar: this.Ar,
      Ca: this.Ca,
      Ch: this.Ch,
      Ep: this.Ep,
      Se: this.Se,
      Sil: this.Sil,
      SiAr: this.SiAr,
      SiCh: this.SiCh,
    };
  }

  public set value({ ...props }) {
    this.assignProps({ ...props });
  }

  public get value() {
    return this.getValues();
  }

  // will throw if false
  private valueInList(value: any, list: any[]) {
    if (value === undefined || value === null) {
      return;
    }
    if (list === undefined || list === null) {
      return;
    }
    if (!list.includes(value)) {
      throw new Error('not value in list');
    }
  }

  public get Ad() {
    return this._Ad;
  }
  public set Ad(val: any) {
    if (!(val instanceof Number) || !(val instanceof String)) {
      this._Ad = '';
    }
    if (this.AD) {
      try {
        this.valueInList(val, this.AD);
      } catch (_) {
        throw new Error('not one of AD');
      }
    }
    this._Ad = val;
  }

  public get Se() {
    return this._Se;
  }
  public set Se(val: any) {
    if (!(val instanceof Number) || !(val instanceof String)) {
      this._Se = '';
    }
    if (this.SE) {
      try {
        this.valueInList(val, this.SE);
      } catch (_) {
        throw new Error('not one of SE');
      }
    }
    this._Se = val;
  }

  public get Ep() {
    return this._Ep;
  }
  public set Ep(val: any) {
    if (!(val instanceof Number) || !(val instanceof String)) {
      this._Ep = '';
    }
    if (this.EP) {
      try {
        this.valueInList(val, this.EP);
      } catch (_) {
        throw new Error('not one of EP');
      }
    }
    this._Ep = val;
  }

  public get Ca() {
    return this._Ca;
  }
  public set Ca(val: any) {
    if (!(val instanceof Number) || !(val instanceof String)) {
      this._Ca = '';
    }
    if (this.CA) {
      try {
        this.valueInList(val, this.CA);
      } catch (_) {
        throw new Error('not one of CA');
      }
    }
    this._Ca = val;
  }

  public get Ch() {
    return this._Ch;
  }
  public set Ch(val: any) {
    if (!(val instanceof Number) || !(val instanceof String)) {
      this._Ch = '';
    }
    if (this.CH) {
      try {
        this.valueInList(val, this.CH);
      } catch (_) {
        throw new Error('not one of CH');
      }
    }
    this._Ch = val;
  }

  public get Ar() {
    return this._Ar;
  }
  public set Ar(val: any) {
    if (!(val instanceof Number) || !(val instanceof String)) {
      this._Ar = '';
    }
    if (this.AR) {
      try {
        this.valueInList(val, this.AR);
      } catch (_) {
        throw new Error('not one of AR');
      }
    }
    this._Ar = val;
  }

  public get SiCh() {
    return this._SiCh;
  }
  public set SiCh(val: any) {
    if (!(val instanceof Number) || !(val instanceof String)) {
      this._SiCh = '';
    }
    if (this.SICH) {
      try {
        this.valueInList(val, this.SICH);
      } catch (_) {
        throw new Error('not one of SICH');
      }
    }
    this._SiCh = val;
  }

  public get SiAr() {
    return this._SiAr;
  }
  public set SiAr(val: any) {
    if (!(val instanceof Number) || !(val instanceof String)) {
      this._SiAr = '';
    }
    if (this.SIAR) {
      try {
        this.valueInList(val, this.SIAR);
      } catch (_) {
        throw new Error('not one of SIAR');
      }
    }
    this._SiAr = val;
  }

  public get Sil() {
    return this._Sil;
  }
  public set Sil(val: any) {
    if (!(val instanceof Number) || !(val instanceof String)) {
      this._Sil = '';
    }
    if (this.SIL) {
      try {
        this.valueInList(val, this.SIL);
      } catch (_) {
        throw new Error('not one of SIL');
      }
    }
    this._Sil = val;
  }
}

export default AlterationMineral;
