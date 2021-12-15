import { Logging, LoggingBase, LoggingProperties } from '../src';

describe('empty base and property entity', () => {
  it('has zero rows', () => {
    let logs = new Logging();

    expect(logs).toHaveProperty('baseEntity');
    expect(logs).toHaveProperty('propertyEntities');
    expect(logs).toHaveProperty('rows');
    expect(logs.rows).toHaveLength(0);
  });

  it('can set rows', () => {
    let logs = new Logging();

    logs.rows.fromArray([...logs.rows.toArray(), { x: 0, y: 0 }]);
    expect(logs.rows.toArray()).toHaveLength(1);
  });
});

describe('define base entity w/ empty property entity', () => {
  it('can set point', () => {
    let logs = new Logging();

    logs.setBaseEntity('point');

    expect(logs.baseEntity).toEqual(LoggingBase.Point);
  });

  it('has point information on dump', () => {
    let logs = new Logging();

    logs.setBaseEntity('point');

    let inputRow = { at: 0, z0: 0, z1: 10 };
    logs.rows.fromArray([inputRow]);

    expect(logs.rows.toArray()).toHaveLength(1);

    let firstRow = logs.dump()[0];

    expect(firstRow).toHaveProperty('at');
    expect(firstRow.at).toEqual(inputRow.at);
  });

  it('can set interval', () => {
    let logs = new Logging();

    logs.setBaseEntity('interval');

    expect(logs.baseEntity).toEqual(LoggingBase.Interval);
  });

  it('has interval information on dump', () => {
    let logs = new Logging();

    logs.setBaseEntity('interval');

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

describe('empty base entity and single property entity', () => {
  it('can set property entities', () => {
    let logs = new Logging();

    expect(logs.propertyEntities).toHaveLength(0);

    logs.addPropertyEntity('geology');

    expect(logs.propertyEntities).toHaveLength(1);

    let hasGeology = logs.propertyEntities.includes(LoggingProperties.Geology);
    expect(hasGeology).toBeTruthy();
  });

  it('cannot have duplicate property entities', () => {
    let logs = new Logging();

    expect(logs.propertyEntities).toHaveLength(0);

    logs.addPropertyEntity('geology');
    logs.addPropertyEntity('geology');
    expect(logs.propertyEntities).toHaveLength(1);
  });

  it('can set geology info and dump values', () => {
    let logs = new Logging();

    logs.addPropertyEntity('geology');

    expect(logs.rows.length).toEqual(0);

    let inputRow = {
      alteration: '',
      lithology: '',
      oxide: '',
      comment: '',
    };
    logs.rows.fromArray([inputRow]);

    expect(logs.rows.toArray()).toHaveLength(1);

    let firstRow = logs.dump()[0];

    expect(firstRow).toHaveProperty('lithology');
    expect(firstRow).toHaveProperty('alteration');
    expect(firstRow).toHaveProperty('oxide');
    expect(firstRow).toHaveProperty('comment');
    expect(firstRow.alteration).toEqual(inputRow.alteration);
    expect(firstRow.lithology).toEqual(inputRow.lithology);
    expect(firstRow.oxide).toEqual(inputRow.oxide);
    expect(firstRow.comment).toEqual(inputRow.oxide);
  });
});

describe('defined base and single property entity', () => {
  it('can dump values properly, interval #1', () => {
    let logs = new Logging();

    logs.setBaseEntity('interval');
    logs.addPropertyEntity('geology');

    let inputRow = {
      z0: 0,
      alteration: 'SIL',
      lithology: 'DCT',
      oxide: 'COX',
      comment: 'a comment',
    };
    logs.rows.fromArray([inputRow]);

    let firstRow = logs.dump()[0];

    expect(firstRow).toHaveProperty('z0');
    expect(firstRow).toHaveProperty('lithology');
    expect(firstRow).toHaveProperty('alteration');
    expect(firstRow).toHaveProperty('oxide');
    expect(firstRow).toHaveProperty('comment');
    expect(firstRow.z0).toEqual(inputRow.z0);
    expect(firstRow.alteration).toEqual(inputRow.alteration);
    expect(firstRow.lithology).toEqual(inputRow.lithology);
    expect(firstRow.oxide).toEqual(inputRow.oxide);
    expect(firstRow.comment).toEqual(inputRow.comment);
  });
  it('can dump values properly, interval #2', () => {
    let logs = new Logging();

    logs.setBaseEntity('interval');
    logs.addPropertyEntity('geology');

    let inputRow = {
      z0: 0,
      z1: 1,
      alteration: 'SIL',
      lithology: 'DCT',
      oxide: 'COX',
      comment: 'a comment',
    };
    logs.rows.fromArray([inputRow]);

    let firstRow = logs.dump()[0];
    let intervalCalc = inputRow.z1 - inputRow.z0;

    expect(firstRow).toHaveProperty('z0');
    expect(firstRow).toHaveProperty('z1');
    expect(firstRow).toHaveProperty('interval');
    expect(firstRow).toHaveProperty('lithology');
    expect(firstRow).toHaveProperty('alteration');
    expect(firstRow).toHaveProperty('oxide');
    expect(firstRow).toHaveProperty('comment');
    expect(firstRow.z0).toEqual(inputRow.z0);
    expect(firstRow.z1).toEqual(inputRow.z1);
    expect(firstRow.interval).toEqual(intervalCalc);
    expect(firstRow.alteration).toEqual(inputRow.alteration);
    expect(firstRow.lithology).toEqual(inputRow.lithology);
    expect(firstRow.oxide).toEqual(inputRow.oxide);
    expect(firstRow.comment).toEqual(inputRow.comment);
  });
});

describe('set logging constants', () => {
  it('set new geology constants', () => {
    let logs = new Logging();
    logs.addPropertyEntity('geology');
    let newAlteration = 'NEW_ALTERATION 01';
    let inputRow = {
      alteration: newAlteration,
    };
    logs.rows.fromArray([inputRow]);

    let willThrow = () => {
      logs.dump();
    };
    expect(willThrow).toThrow('not one of ALTERATIONS');

    logs.setConstant('ALTERATIONS', [
      ...logs.constants.ALTERATIONS,
      newAlteration,
    ]);
    logs.rows.fromArray([inputRow]);

    let firstRow = logs.dump()[0];
    expect(firstRow).toHaveProperty('alteration');
    expect(firstRow.alteration).toEqual(inputRow.alteration);
  });
});

describe('logging config', () => {
  let getPointLog = () => {
    let logs = new Logging();
    logs.setBaseEntity('point');
    logs.addPropertyEntity('geology');
    return logs;
  };
  let getIntervalLog = () => {
    let logs = new Logging();
    logs.setBaseEntity('interval');
    logs.addPropertyEntity('geology');
    return logs;
  };

  it('dump from existing config into json', () => {
    let logs = getPointLog();
    let config = logs.getConfig();

    expect(config).toHaveProperty('baseEntity');
    expect(config).toHaveProperty('propertyEntities');
    expect(config).toHaveProperty('constants');
    expect(config.baseEntity).toEqual('point');
    expect(config.propertyEntities).toEqual(['geology']);

    logs = getIntervalLog();
    config = logs.getConfig();

    expect(config).toHaveProperty('baseEntity');
    expect(config).toHaveProperty('propertyEntities');
    expect(config).toHaveProperty('constants');
    expect(config.baseEntity).toEqual('interval');
    expect(config.propertyEntities).toEqual(['geology']);
  });
  it('set existing config from json', () => {
    let logs = getPointLog();
    let newAlteration = [...logs.constants.ALTERATIONS, 'NEWVAL'];
    logs.setConstant('ALTERATIONS', newAlteration);
    let config = logs.getConfig();

    let newLog = new Logging();
    newLog.setConfig(config);
    expect(newLog.baseEntity).toEqual(LoggingBase.Point);
    expect(newLog.baseEntity).toEqual(logs.baseEntity);
    expect(newLog.propertyEntities[0]).toEqual(LoggingProperties.Geology);
    expect(newLog.propertyEntities).toEqual(logs.propertyEntities);

    expect(newLog.constants).toHaveProperty('ALTERATIONS');
    expect(newLog.constants.ALTERATIONS).toHaveLength(newAlteration.length);
    expect(newLog.constants.ALTERATIONS).toEqual(newAlteration);

    logs = getIntervalLog();
    let newOxide = [...logs.constants.OXIDES, 'NEWVAL'];
    logs.setConstant('OXIDES', newOxide);
    config = logs.getConfig();

    newLog.setConfig(config);
    expect(newLog.baseEntity).toEqual(LoggingBase.Interval);
    expect(newLog.baseEntity).toEqual(logs.baseEntity);
    expect(newLog.propertyEntities[0]).toEqual(LoggingProperties.Geology);
    expect(newLog.propertyEntities).toEqual(logs.propertyEntities);

    expect(newLog.constants).toHaveProperty('OXIDES');
    expect(newLog.constants.OXIDES).toHaveLength(newOxide.length);
    expect(newLog.constants.OXIDES).toEqual(newOxide);
  });
});

/*
describe('empty base and multiple properties', () => {});

describe('defined base and multiple properties', () => {});
 */
