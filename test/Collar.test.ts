import { Collar } from '../src';

describe('Create empty collar', () => {
  it('has undefined values', () => {
    let co = new Collar();
    expect(co).toHaveProperty('x')
    expect(co).toHaveProperty('y')
    expect(co).toHaveProperty('z')
    expect(co).toHaveProperty('azimuth')
    expect(co).toHaveProperty('dip')
    expect(co).toHaveProperty('totalDepth')

    let {x, y, z, azimuth, totalDepth, dip} = co;
    expect(x).toEqual(undefined);
    expect(y).toEqual(undefined);
    expect(z).toEqual(undefined);
    expect(azimuth).toEqual(0);
    expect(dip).toEqual(90);
    expect(totalDepth).toEqual(undefined);
  });
});

describe('create collar w/ props', () => {
  it('has xyz values', () => {
    let co = new Collar({
      x: 0,
      y: 1000,
      z: -1,
      azimuth: 100,
      dip: 90,
      totalDepth: 100,
    });
    let {x, y, z, azimuth, dip, totalDepth} = co;

    expect(x).toEqual(0);
    expect(y).toEqual(1000);
    expect(z).toEqual(-1);
    expect(azimuth).toEqual(100);
    expect(dip).toEqual(90);
    expect(totalDepth).toEqual(100);
  });

  it('normalize azimuth and dip values', () => {
    let co = new Collar({
      azimuth: 720,
      dip: 370,
    });
    let {azimuth, dip} = co;

    expect(azimuth).toEqual(0);
    expect(dip).toEqual(10);
  });
});
