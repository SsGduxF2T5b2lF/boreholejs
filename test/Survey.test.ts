import { Survey } from '../src';

let hasDefaultSurvey = () => {
  let su = new Survey();

  expect(su).toHaveProperty('at')
  expect(su).toHaveProperty('dip')
  expect(su).toHaveProperty('azimuth')

  let {at, dip, azimuth} = su;

  expect(at).toEqual(undefined);
  expect(dip).toEqual(90);
  expect(azimuth).toEqual(0);
}

describe('Create empty survey', () => {
  it('has default values', hasDefaultSurvey);
});

