import BoreholeLogging from '../src/BoreholeLogging';
import { Borehole } from '../src';

describe('borehole logging entity', () => {
  it('cannot initialize without borehole as parent', () => {
    let parent = '';
    let willThrow = () => {
      new BoreholeLogging();
    };

    expect(willThrow).toThrow('parent not Borehole');

    willThrow = () => {
      new BoreholeLogging({ name: 'yes' }, parent);
    };

    expect(willThrow).toThrow('parent not Borehole');
  });

  it('can be accessed through linked list or get by id method', () => {
    let parent = new Borehole();
    let refName = 'document01';
    let ref = parent.addLogging(refName);
    let refID = ref.id;

    let loggingFromLL = parent.loggings?.first?.value;
    let loggingFromGetID = parent.getLoggingByID(refID);

    expect(loggingFromLL).toBeInstanceOf(BoreholeLogging);
    expect(loggingFromGetID).toBeInstanceOf(BoreholeLogging);

    expect(loggingFromLL?.id).toEqual(refID);
    expect(loggingFromGetID?.id).toEqual(refID);

    expect(ref?.name).toEqual(refName);
    expect(loggingFromLL?.name).toEqual(refName);
    expect(loggingFromGetID?.name).toEqual(refName);
  });
});

describe('borehole logging method', () => {
  it('add logging', () => {
    let borehole = new Borehole();
    let refNames = ['document01', 'document02'];
    let firstLog = borehole.addLogging(refNames[0]);
    let secondLog = borehole.addLogging(refNames[1]);

    expect(borehole.loggings.length).toEqual(2);
    expect(firstLog.name).toEqual(refNames[0]);
    expect(secondLog.name).toEqual(refNames[1]);
  });

  it('get logging by id', () => {
    let borehole = new Borehole();
    let refNames = ['document01', 'document02'];
    let firstLog = borehole.addLogging(refNames[0]);
    let secondLog = borehole.addLogging(refNames[1]);

    let getID0 = borehole.getLoggingByID(firstLog.id);
    let getID1 = borehole.getLoggingByID(secondLog.id);

    expect(getID0).toBeInstanceOf(BoreholeLogging);
    expect(getID0?.id).toEqual(firstLog.id);
    expect(getID1).toBeInstanceOf(BoreholeLogging);
    expect(getID1?.id).toEqual(secondLog.id);

    let newName = 'document01modified';
    firstLog.name = newName;
    expect(getID0?.name).toEqual(newName);
  });

  it('remove logging by id', () => {
    let borehole = new Borehole();
    let refNames = ['document01', 'document02'];
    let firstLog = borehole.addLogging(refNames[0]);
    // let secondLog = borehole.addLogging(refNames[1]);

    borehole.removeLoggingByID(firstLog.id);
    expect(borehole.getLoggingByID(firstLog.id)).toBeUndefined();
  });
});
