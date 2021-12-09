import { Borehole } from '../src';

let hasDefaultCollar = () => {
  let bh = new Borehole();
  let co = bh.collar;
  expect(co).toHaveProperty('x');
  expect(co).toHaveProperty('y');
  expect(co).toHaveProperty('z');
  expect(co).toHaveProperty('azimuth');
  expect(co).toHaveProperty('dip');
  expect(co).toHaveProperty('totalDepth');

  let { x, y, z, azimuth, dip, totalDepth } = co;
  expect(x).toEqual(undefined);
  expect(y).toEqual(undefined);
  expect(z).toEqual(undefined);
  expect(azimuth).toEqual(0);
  expect(dip).toEqual(90);
  expect(totalDepth).toEqual(undefined);
};

describe('Create borehole w/o bhid', () => {
  it('bhid has same value as id', () => {
    let bh = new Borehole();
    expect(bh.id).toEqual(bh.value['bhid']);
  });

  it('has default collar', hasDefaultCollar);
});

describe('Create borehole w/ bhid', () => {
  it('bhid has set value', () => {
    let bhid = 'ID=1;YES';
    let bh = new Borehole({ bhid });
    expect(bh.bhid).toEqual(bhid);
  });

  it('has default collar', hasDefaultCollar);
});

describe('Create borehole w/ collar properties', () => {
  it('has collar properties', () => {
    let x = 10;
    let y = 11;
    let z = 12;
    let totalDepth = 100;
    let azimuth = 30;
    let dip = 20;

    let bh = new Borehole({
      x,
      y,
      z,
      totalDepth,
      dip,
      azimuth,
    });

    let co = bh.collar;
    expect(co.x).toEqual(x);
    expect(co.y).toEqual(y);
    expect(co.z).toEqual(z);
    expect(co.azimuth).toEqual(azimuth);
    expect(co.dip).toEqual(dip);
    expect(co.totalDepth).toEqual(totalDepth);
  });

  /**
   */
  it('can update collar properties', () => {
    let x = 10;
    let y = 11;
    let z = 12;
    let totalDepth = 100;
    let azimuth = 30;
    let dip = 20;

    let bh = new Borehole({
      x,
      y,
      z,
      totalDepth,
      dip,
      azimuth,
    });
    let oldId = bh._id;

    let co = bh.collar;
    expect(co.x).toEqual(x);
    expect(co.y).toEqual(y);
    expect(co.z).toEqual(z);
    expect(co.azimuth).toEqual(azimuth);
    expect(co.dip).toEqual(dip);
    expect(co.totalDepth).toEqual(totalDepth);

    let updatedCollar = {
      ...co,
      x: 101,
      y: 102,
      azimuth: 356,
    };
    bh.collar = updatedCollar;
    co = bh.collar;

    expect(co.x).toEqual(updatedCollar.x);
    expect(co.y).toEqual(updatedCollar.y);
    expect(co.z).toEqual(updatedCollar.z);
    expect(co.azimuth).toEqual(updatedCollar.azimuth);
    expect(co.dip).toEqual(updatedCollar.dip);
    expect(co.totalDepth).toEqual(updatedCollar.totalDepth);

    // id not updated
    expect(bh.id).toEqual(oldId);
  });
});
