import { Borehole, LoggingBase } from '../src';

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

describe('borehole logging', () => {
  let refNames = ['document01', 'document02'];
  let createBhMultiDocs = () => {
    let borehole = new Borehole();
    borehole.defaultLogging.setBaseEntity('interval');
    borehole.defaultLogging.addPropertyEntity('geology');
    refNames.forEach(item => borehole.addLogging(item));
    return borehole;
  };

  it('can print column name', () => {
    let bh = createBhMultiDocs();
    let columnMap: { [key: string]: any } = bh.getLoggingColumns();
    expect(columnMap).toHaveProperty(refNames[0]);
    expect(columnMap).toHaveProperty(refNames[1]);

    let doc = columnMap[refNames[0]];
    expect(doc).toHaveProperty('z0');
    expect(doc).toHaveProperty('z1');
    expect(doc).toHaveProperty('alteration');
    expect(doc).toHaveProperty('lithology');
    expect(doc).toHaveProperty('oxide');
    expect(doc).toHaveProperty('comment');
  });

  it('default logging config passed to created logging', () => {
    let borehole = createBhMultiDocs();
    let bhConfig = borehole.defaultLogging.getConfig();

    let item = undefined;
    let i = 0;
    item = borehole.loggings.iter();
    while (item?.hasNext && i < borehole?.loggings?.length) {
      item = item.next;
      let doc = item?.value;
      expect(doc?.getConfig()).toEqual(bhConfig);
      i++;
    }
  });

  it('can change specific logging config', () => {
    let borehole = createBhMultiDocs();
    let doc = borehole.loggings?.last?.value;

    borehole.loggings?.last?.value?.setConfig({
      baseEntity: 'point',
    });
    expect(doc?.baseEntity).toEqual(LoggingBase.Point);

    doc = borehole.loggings?.first?.value;
    expect(doc?.propertyEntities).toHaveLength(1);

    borehole.loggings?.first?.value?.setConfig({
      propertyEntities: [],
    });
    expect(doc?.propertyEntities).toHaveLength(0);
  });
});
