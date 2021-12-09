import { BoreholeList } from '../src';

describe('create borehole list entity', () => {
  it('has id and name', () => {
    let projectName = 'FIELD01~';

    let bhList = new BoreholeList({
      name: projectName,
    });

    expect(bhList).toHaveProperty('id');
    expect(bhList).toHaveProperty('name');
    expect(bhList).toHaveProperty('boreholes');
    expect(typeof(bhList.id)).toEqual('string');
    expect(bhList.name).toEqual(projectName);
    expect(bhList.boreholes).toHaveLength(0);
  });
});

describe('Create borehole list w/o detail', () => {
  it('has list of default borehole', () => {
    let bhList = new BoreholeList();

    let inputList = [
      {
        bhid: 'BHID01#',
        x: 101,
        y: 103,
        z: 105,
        dip: 363,
        azimuth: 231,
        totalDepth: 92,
      },
      {
        bhid: 'BHID02#A',
        x: 102,
        y: 104,
        z: 106,
        dip: 364,
        azimuth: 234,
        totalDepth: 92,
      },
    ];

    inputList.forEach(item => {
      bhList.addBorehole(item);
    });

    expect(bhList.boreholes).toHaveLength(inputList.length);

    let boreholes = bhList.boreholes;

    inputList.forEach((item, idx) => {
      let borehole = boreholes[idx];
      let boreholeInfo = boreholes[idx].value;

      expect(borehole.bhid).toEqual(item.bhid);

      expect(borehole.collar.x).toEqual(item.x);
      expect(borehole.collar.y).toEqual(item.y);
      expect(borehole.collar.z).toEqual(item.z);
      expect(borehole.collar.azimuth).toEqual(item.azimuth%360);
      expect(borehole.collar.dip).toEqual(item.dip%360);
      expect(borehole.collar.totalDepth).toEqual(item.totalDepth);

      expect(borehole.collar.x).toEqual(boreholeInfo.x);
      expect(borehole.collar.y).toEqual(boreholeInfo.y);
      expect(borehole.collar.z).toEqual(boreholeInfo.z);
      expect(borehole.collar.azimuth).toEqual(boreholeInfo.azimuth);
      expect(borehole.collar.dip).toEqual(boreholeInfo.dip);
      expect(borehole.collar.totalDepth).toEqual(boreholeInfo.totalDepth);
    });
  });

  it('can use boreholes setter', () => {
    let bhList = new BoreholeList();

    let inputList = [
      {
        bhid: 'BHID01#',
        x: 101,
        y: 103,
        z: 105,
        dip: 363,
        azimuth: 231,
        totalDepth: 92,
      },
      {
        bhid: 'BHID02#A',
        x: 102,
        y: 104,
        z: 106,
        dip: 364,
        azimuth: 234,
        totalDepth: 92,
      },
    ];

    bhList.boreholes = inputList;

    expect(bhList.boreholes).toHaveLength(inputList.length);

    let boreholes = bhList.boreholes;

    inputList.forEach((item, idx) => {
      let borehole = boreholes[idx];
      let boreholeInfo = boreholes[idx].value;

      expect(borehole.bhid).toEqual(item.bhid);

      expect(borehole.collar.x).toEqual(item.x);
      expect(borehole.collar.y).toEqual(item.y);
      expect(borehole.collar.z).toEqual(item.z);
      expect(borehole.collar.azimuth).toEqual(item.azimuth%360);
      expect(borehole.collar.dip).toEqual(item.dip%360);
      expect(borehole.collar.totalDepth).toEqual(item.totalDepth);

      expect(borehole.collar.x).toEqual(boreholeInfo.x);
      expect(borehole.collar.y).toEqual(boreholeInfo.y);
      expect(borehole.collar.z).toEqual(boreholeInfo.z);
      expect(borehole.collar.azimuth).toEqual(boreholeInfo.azimuth);
      expect(borehole.collar.dip).toEqual(boreholeInfo.dip);
      expect(borehole.collar.totalDepth).toEqual(boreholeInfo.totalDepth);
    });
  });
});

describe('Borehole list', () => {
  it('cannot add duplicate bhid', () => {
    let bhList = new BoreholeList();

    let bhidList = [
      {
        bhid: 'BHID01#',
        x: 101,
        y: 103,
        z: 105,
        dip: 363,
        azimuth: 231,
        totalDepth: 92,
      },
      {
        bhid: 'BHID01#',
        x: 102,
        y: 104,
        z: 106,
        dip: 364,
        azimuth: 234,
        totalDepth: 92,
      },
    ];
    let updateWithDupes = () => {
      bhList.boreholes = bhidList;
    }

    expect(updateWithDupes).toThrow('BHID already used');
  });

  it('can update borehole detail', () => {
    let bhList = new BoreholeList();

    let bhidList = [
      {
        bhid: 'BHID01#',
        x: 101,
        y: 103,
        z: 105,
        dip: 363,
        azimuth: 231,
        totalDepth: 92,
      },
      {
        bhid: 'BHID02#',
        x: 102,
        y: 104,
        z: 106,
        dip: 364,
        azimuth: 234,
        totalDepth: 92,
      },
    ];

    bhList.boreholes = bhidList;
    let newCollar = {
      x: 121,
      dip: 90,
    };

    // updating second borehole from reference
    let secondBorehole = bhList.boreholes[1];
    secondBorehole.value = newCollar;

    expect(bhList.boreholes[1].value.x).toEqual(newCollar.x);
    expect(bhList.boreholes[1].value.dip).toEqual(newCollar.dip);

    // old value unchanged
    expect(bhList.boreholes[1].value.y).toEqual(secondBorehole.collar.y);
    expect(bhList.boreholes[1].value.z).toEqual(secondBorehole.collar.z);
    expect(bhList.boreholes[1].value.azimuth).toEqual(secondBorehole.collar.azimuth);
    expect(bhList.boreholes[1].value.totalDepth).toEqual(secondBorehole.collar.totalDepth);
  });
});

