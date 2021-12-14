import { LoggingProperties } from '../../../src';

const { Geology } = LoggingProperties;

describe('Empty geology properties', () => {
  it('has default value', () => {
    let geol = new Geology();

    expect(geol).toHaveProperty('value');

    let value = geol.value;
    expect(value).toHaveProperty('lithology');
    expect(value).toHaveProperty('oxide');
    expect(value).toHaveProperty('alteration');
    expect(value).toHaveProperty('comment');

    let { lithology, oxide, alteration, comment } = value;
    expect(lithology).toBeUndefined();
    expect(oxide).toBeUndefined();
    expect(alteration).toBeUndefined();
    expect(comment).toBeUndefined();
  });
});

describe('set properties', () => {
  it('use value setter', () => {
    let geol = new Geology();

    let newVal = {
      lithology: 'DCT',
      oxide: 'COX',
      alteration: 'SIL',
      comment: 'cava',
    };

    geol.value = newVal;

    let { lithology, oxide, alteration, comment } = geol.value;
    expect(lithology).toEqual(newVal.lithology);
    expect(oxide).toEqual(newVal.oxide);
    expect(alteration).toEqual(newVal.alteration);
    expect(comment).toEqual(newVal.comment);
  });

  it('use value properties setter', () => {
    let geol = new Geology();

    let newVal = {
      lithology: 'DCT',
      oxide: 'COX',
      alteration: 'SIL',
      comment: 'cava',
    };

    geol.lithology = newVal.lithology;
    geol.oxide = newVal.oxide;
    geol.alteration = newVal.alteration;
    geol.comment = newVal.comment;

    let { lithology, oxide, alteration, comment } = geol.value;
    expect(lithology).toEqual(newVal.lithology);
    expect(oxide).toEqual(newVal.oxide);
    expect(alteration).toEqual(newVal.alteration);
    expect(comment).toEqual(newVal.comment);
  });

  it('throws error if input not one of constants', () => {
    let geol = new Geology();
    let notLithology = 'DCTDD';
    let notOxide = 'COXXX';
    let notAlteration = 'SILK';

    let lithologyThrow = () => {
      geol.lithology = notLithology;
    };
    let oxideThrow = () => {
      geol.oxide = notOxide;
    };
    let alterationThrow = () => {
      geol.alteration = notAlteration;
    };

    expect(lithologyThrow).toThrow('not one of LITHOLOGIES');
    expect(oxideThrow).toThrow('not one of OXIDES');
    expect(alterationThrow).toThrow('not one of ALTERATIONS');
  });
});
