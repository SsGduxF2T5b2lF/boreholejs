import { LoggingBase } from '../../src';

const { Point } = LoggingBase;

describe('create empty point', () => {
  it('has default point', () => {
    let po = new Point();
    expect(po).toHaveProperty('at');
    expect(po).toHaveProperty('value');
    expect(po.value).toHaveProperty('at');
    expect(po.value.at).toEqual(po.at);
  });
});
