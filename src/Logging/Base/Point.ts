import { PointProps } from '../../common/types';

/**
 * class Point seems ambiguous with geometry Point
 */
class Point {
  at: number | undefined;

  constructor({ ...props }: PointProps = {}) {
    this.at = undefined;

    this._assignProps(props);
  }

  _assignProps({ ...props }: PointProps = {}) {
    let { at } = props;

    if (at !== null && at !== undefined) {
      this.at = at;
    }
  }

  getValues() {
    let result = {
      at: this.at,
    };

    return result;
  }

  public get value() {
    return this.getValues();
  }

  public set value({ ...props }: PointProps) {
    this._assignProps(props);
  }
}

export default Point;
