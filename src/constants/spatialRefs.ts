/**
 * usage:
 * const proj4 = require('proj4');
 *
 * let srcDefs = refs['LONLAT'].proj4;
 * let targetDefs = refs['UTM51N'].proj4;
 *
 * from 1N 124E to utm 51N
 * let utm = proj4(srcDefs, targetDefs, [124, 1]);
 */

export const refs = {
  'LONLAT': {
    label: ['LonLat Degrees', 'EPSG:4326'],
    proj4: '+proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees +no_defs',
  },
  'UTM50N': {
    label: ['UTM 50N'],
    proj4: '+proj=utm +zone=50 +datum=WGS84 +units=m +no_defs',
  },
  'UTM50S': {
    label: ['UTM 50S'],
    proj4: '+proj=utm +zone=50 +south +datum=WGS84 +units=m +no_defs',
  },
  'UTM51N': {
    label: ['UTM 51N'],
    proj4: '+proj=utm +zone=51 +datum=WGS84 +units=m +no_defs',
  },
  'UTM51S': {
    label: ['UTM 51S'],
    proj4: '+proj=utm +zone=51 +south +datum=WGS84 +units=m +no_defs',
  },
};
