import { Logging, LoggingBase } from '../src';

describe('empty base and properties', () => {
  it('has zero rows', () => {
    let logs = new Logging();

    expect(logs).toHaveProperty('base');
    expect(logs).toHaveProperty('properties');
    expect(logs).toHaveProperty('rows');
    expect(logs.rows).toHaveLength(0);
  });

  it('can set rows', () => {
    let logs = new Logging();

    logs.rows.fromArray([...logs.rows.toArray(), { x: 0, y: 0 }]);
    expect(logs.rows.toArray()).toHaveLength(1);
  });
});

describe('define base w/ empty properties', () => {
  it('can set point', () => {
    let logs = new Logging();

    logs.setBase('point');

    expect(logs.base).toEqual(LoggingBase.Point);
  });

  it('has point information on dump', () => {
    let logs = new Logging();

    logs.setBase('point');

    let inputRow = { at: 0, z0: 0, z1: 10 };
    logs.rows.fromArray([inputRow]);

    expect(logs.rows.toArray()).toHaveLength(1);

    let firstRow = logs.dump()[0];

    expect(firstRow).toHaveProperty('at');
    expect(firstRow.at).toEqual(inputRow.at);
  });

  it('can set interval', () => {
    let logs = new Logging();

    logs.setBase('interval');

    expect(logs.base).toEqual(LoggingBase.Interval);
  });

  it('has interval information on dump', () => {
    let logs = new Logging();

    logs.setBase('interval');

    let inputRow = { at: 0, z0: 0, z1: 10 };
    logs.rows.fromArray([inputRow]);

    expect(logs.rows.toArray()).toHaveLength(1);

    let firstRow = logs.dump()[0];

    expect(firstRow).toHaveProperty('z0');
    expect(firstRow).toHaveProperty('z1');
    expect(firstRow).toHaveProperty('interval');
    expect(firstRow.z0).toEqual(inputRow.z0);
    expect(firstRow.z1).toEqual(inputRow.z1);
    expect(firstRow.interval).toEqual(inputRow.z1 - inputRow.z0);
  });
});

describe('empty base and single properties', () => {});

describe('empty base and multiple properties', () => {});

describe('defined base and single properties', () => {});

describe('defined base and multiple properties', () => {});
