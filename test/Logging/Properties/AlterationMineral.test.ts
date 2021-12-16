import { LoggingProperties } from '../../../src';

const { AlterationMineral } = LoggingProperties;

describe('empty alteration properties', () => {
  let alMinerals = ['Sil', 'SiAr', 'SiCh', 'Ar', 'Ch', 'Ca', 'Ep', 'Se', 'Ad'];
  it('has default value', () => {
    let alm = new AlterationMineral();

    expect(alm).toHaveProperty('value');

    let value: { [index: string]: any } = alm.value;

    alMinerals.forEach(item => {
      expect(value).toHaveProperty(item);
      expect(value[item]).toBeUndefined();
    });
  });
});

describe('set properties', () => {
  let alMinerals = ['Sil', 'SiAr', 'SiCh', 'Ar', 'Ch', 'Ca', 'Ep', 'Se', 'Ad'];
  it('use value setter', () => {
    let alm = new AlterationMineral();

    let newVal = {
      Ad: 1,
      Ar: '',
      Ca: 2,
      Ch: 3,
      Ep: '',
      Se: '',
      Sil: 1,
      SiAr: 2,
      SiCh: 3,
    };

    alm.value = newVal;

    let value: { [key: string]: any } = alm.value;
    let ref: { [key: string]: any } = { ...newVal };

    alMinerals.forEach(item => {
      expect(value).toHaveProperty(item);
      expect(value[item]).toEqual(ref[item]);
    });
  });

  it('use properties to set new value', () => {
    let alm = new AlterationMineral();
    let newVal: { [key: string]: any } = {
      Ad: 1,
      Ar: '',
      Ca: 2,
      Ch: 3,
      Ep: '',
      Se: '',
      Sil: 1,
      SiAr: 2,
      SiCh: 3,
    };

    alMinerals.forEach(item => {
      alm[item] = newVal[item];
    });

    let values: { [key: string]: any } = alm.value;

    alMinerals.forEach(item => {
      values[item] = newVal[item];
    });
  });

  it('throws error if input not one of constants', () => {
    let alm = new AlterationMineral();
    alMinerals.forEach(item => {
      let newVal = 'not_value';
      let willThrow = () => {
        alm[item] = newVal;
      };

      expect(willThrow).toThrow(`not one of ${item.toUpperCase()}`);
    });
  });

  it('set new constants to prevents error', () => {
    let alm = new AlterationMineral();
    let newVal = 'newVal';

    alMinerals.forEach(item => {
      alm.setConstants({
        ...alm.setConstants,
        [item.toUpperCase()]: [...alm[item.toUpperCase()], newVal],
      });

      alm[item] = newVal;
    });

    alMinerals.forEach(item => {
      expect(alm[item]).toEqual(newVal);
    });
  });
});
