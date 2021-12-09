import { LoggingBase } from '../src';

const { Interval } = LoggingBase;

let hasDefaultInterval = () => {
  let inv = new Interval();

  expect(inv).toHaveProperty('z0');
  expect(inv).toHaveProperty('z1');

  let { z0, z1 } = inv;
  expect(z0).toEqual(undefined);
  expect(z1).toEqual(undefined);
}

describe('Create empty interval', () => {
  it('has default values', hasDefaultInterval);
});

describe('Create interval', () => {
  it('has z0, z1 as input', () => {
    let from = 101;
    let to = 202;

    let inv = new Interval({ z0: from, z1: to });
    expect(inv).toHaveProperty('z0');
    expect(inv).toHaveProperty('z1');
    expect(inv).toHaveProperty('interval');

    let { z0, z1, interval } = inv;
    expect(z0).toEqual(from);
    expect(z1).toEqual(to);
    expect(interval).toEqual(to-from);
  });
});

describe('Update interval', () => {
  it('use setter', () => {
    let from_ = 101;
    let to_ = 202;

    let inv = new Interval({ z0: from_, z1: to_ });
    expect(inv.value.z0).toEqual(from_);
    expect(inv.value.z1).toEqual(to_);
    expect(inv.value.interval).toEqual(to_-from_);

    // update new from to
    from_ = 0;
    inv.value = {
      z0: from_,
    }
    expect(inv.value.z0).toEqual(from_);
    expect(inv.value.interval).toEqual(to_-from_);

    to_ = 10;
    inv.value = {
      z1: to_,
    }
    expect(inv.value.z1).toEqual(to_);
    expect(inv.value.interval).toEqual(to_-from_);
  });
});
