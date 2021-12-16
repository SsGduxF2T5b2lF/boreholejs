import { v4 as uidv4 } from 'uuid';
import Collar from './Collar';
import BoreholeLogging from './BoreholeLogging';
import Logging from './Logging';

import { LinkedList } from './helpers/LinkedList';
import { CreateBoreholeProps } from './common/types';

class Borehole {
  _id: string | undefined;
  _collar: Collar;
  bhid: string | undefined;
  defaultLogging: Logging;

  // loggings container
  loggings: LinkedList;
  loggingMap: { [key: string]: BoreholeLogging };

  constructor({ ...props }: CreateBoreholeProps = {}) {
    this.bhid = undefined;
    this._id = undefined;
    // init as empty then update in _assignProps
    this._collar = new Collar();
    this.defaultLogging = new Logging();

    this.loggingMap = {};
    this.loggings = new LinkedList();

    // assignProps must be last
    this._assignProps(props);
  }

  public get id() {
    return this._id;
  }

  mapLogging(uuid: string, item: BoreholeLogging) {
    if (!uuid) return;
    if (!this.loggingMap[uuid]) {
      this.loggingMap[uuid] = item;
      return true;
    } else {
      return false;
    }
  }

  getLoggingByID(uuid: string | undefined): BoreholeLogging | undefined {
    if (uuid === undefined) return;
    return this.loggingMap[uuid];
  }

  /**
   * remove logging entity by logging.id
   * not to be confused with LinkedList.removeItemByID
   * which remove LLItem by LLItem.id
   */
  removeLoggingByID(uuid: string | undefined): void {
    if (!uuid) return;
    let llItem = undefined;
    let i = 0;
    llItem = this.loggings.iter();
    while (llItem?.hasNext && i < this.loggings.length) {
      llItem = llItem.next;
      if (llItem?.value?.id === uuid) {
        delete llItem.value;
        llItem.removeSelf();
        delete this.loggingMap[uuid];
        break;
      }
      i++;
    }
  }

  createEmptyLogging(name: string) {
    let newLogs = new BoreholeLogging({ name }, this);
    newLogs.setConfig(this.defaultLogging.getConfig());
    return newLogs;
  }

  addLogging(name: string) {
    let newLogs = this.createEmptyLogging(name);
    newLogs.setConfig(this.defaultLogging.getConfig());
    this.loggings.addLast(newLogs);
    return newLogs;
  }

  _assignProps(props: CreateBoreholeProps = {}) {
    let newId = uidv4();
    let { bhid } = props;

    if (bhid) {
      this.bhid = bhid;
    } else {
      this.bhid = newId;
    }

    this._collar.value = props;

    if (!this._id) {
      this._id = newId;
    }
  }

  getValues() {
    let result = {
      bhid: this.bhid,
      ...this.collar,
    };
    return result;
  }

  public get value(): CreateBoreholeProps {
    return this.getValues();
  }

  public set value({ ...props }: CreateBoreholeProps) {
    this._assignProps(props);
  }

  getCollar() {
    return this._collar;
  }

  public get collar() {
    return this.getCollar().value;
  }

  public set collar({ ...props }) {
    let collar = this.getCollar();
    let newCollar = {
      ...collar,
      ...props,
    };
    if (collar) {
      collar.value = newCollar;
    }
  }

  dump() {
    let result: { [key: string]: any } = {};
    let logging = undefined;
    logging = this.loggings.iter();
    while (logging?.next) {
      logging = logging?.next;
      let rows = logging?.value?.dump();
      result[logging?.value?.name] = rows.map(
        (item: { [key: string]: any }) => {
          return {
            ...this.value,
            ...item,
          };
        }
      );
    }

    return result;
  }
}

export default Borehole;
