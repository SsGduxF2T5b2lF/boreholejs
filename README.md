# BoreholeJS

Example
```javascript
const boreholeHelper = require('boreholejs');

const {
  Borehole,
  BoreholeList,
} = boreholeHelper;

// assume a project has several boreholes
// could be a field too

let _projectName = 'project01';

let boreholeData = [
  {
    bhid: 'BH0001',
    x: 101,
    y: 102,
    z: 103,
    azimuth: 370,
    dip: 360,
    totalDepth: 100,
  },
  {
    bhid: 'BH0002',
    x: 102,
    y: 103,
    z: 104,
    azimuth: 3130,
    dip: 10,
    totalDepth: 100,
  },
];

// init with empty BoreholeList, then add borehole data
// currently only support collar
let project = new BoreholeList({ name: _projectName });
console.log('Project Name: ', project.name);

project.boreholes = boreholeData;

// append new borehole data
project.addBorehole({
  bhid: 'BH0003',
  x: 102,
  y: 103,
  z: 104,
  azimuth: 3130,
  dip: 10,
  totalDepth: 100,
});

// console.log(project.boreholes.map(item => item.value));

// will throw error on adding duplicate bhid
try {
  project.addBorehole({
    bhid: 'BH0003',
    x: 102,
    y: 103,
    z: 104,
    azimuth: 3130,
    dip: 10,
    totalDepth: 100,
  });
} catch(e) {
  console.error(e);
}
```
