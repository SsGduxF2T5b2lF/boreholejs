import { v4 as uidv4 } from 'uuid';
import Borehole from './Borehole';
import Logging from './Logging';
import {
  BHListProps,
  BoreholeProps,
  CollarProps,
  CreateBoreholeProps,
} from './common/types';

const ERROR_BHID_DUPES = new Error(`BHID already used`);
const ERROR_ID_DUPES = new Error(`ID already used`);

// TODO: change boreholes to LinkedList instead of array?
// TODO: give BoreholeList a logging entity, without dump
// so new Borehole can inherit logging entity from BoreholeList

/**
 * TODO: in a project set loggingProperties enums
 * currently enums for ALTERATIONS, etc are set
 * at ./loggingProperties/constants.ts.
 * might be better if these are configurable through methods
 * such as this.setAlterationEnums()
 */
/*
 * TODO: change Borehole logging props when BoreholeList changing logging props
 * if BoreholeList.logging.setBase('interval')
 * then all Borehole.logging.setBase('interval')
 * so existing Borehole can have matching logging entity properties
 */

class BoreholeList {
  _id: string | undefined;
  _name: string | undefined;
  _boreholes: Borehole[];
  defaultLogging: Logging;

  constructor({ ...props }: BHListProps = {}) {
    this._id = undefined;
    this._name = undefined;
    this._boreholes = [];

    this._assignProps(props);

    this.defaultLogging = this.createDefaultLogging();
  }

  private createDefaultLogging() {
    let newLog = new Logging();
    return newLog;
  }

  _assignProps(props: BHListProps) {
    let newId = uidv4();
    let { name } = props;

    if (!name) {
      this._name = '';
    } else {
      this._name = name;
    }

    if (!this._id) {
      this._id = newId;
    }
  }

  // append new borehole
  public addBorehole({ ...props }: BoreholeProps & CollarProps = {}) {
    let bh = new Borehole({ ...props });
    bh.defaultLogging.setConfig(this.defaultLogging.getConfig());

    // HACK: prevent duplicates, though id already random uuid
    if (this.getBorehole(bh.id)) {
      throw ERROR_ID_DUPES;
    }
    if (this.getBoreholeByBHID(bh.bhid)) {
      throw ERROR_BHID_DUPES;
    }

    this._boreholes.push(bh);
    return bh;
  }

  /**
   * search borehole by id
   * returning none if not found
   */
  public getBorehole(id: string | undefined): Borehole | undefined {
    if (!id) return;
    let boreholes = this._boreholes;
    return boreholes.filter(borehole => borehole.id === id)[0];
  }

  /**
   * search borehole by bhid
   * returning none if not found
   */
  public getBoreholeByBHID(bhid: string | undefined): Borehole | undefined {
    if (!bhid) return;
    let boreholes = this._boreholes;
    return boreholes.filter(borehole => borehole.bhid === bhid)[0];
  }

  /**
   * remove borehole by id
   */
  public removeBorehole(id: string | undefined): void {
    if (!id) return;
    this._boreholes = this._boreholes.filter(borehole => borehole.id !== id);
  }

  public removeBoreholeByBHID(bhid: string | undefined): void {
    if (!bhid) return;
    this._boreholes = this._boreholes.filter(
      borehole => borehole.bhid !== bhid
    );
  }

  public get name() {
    return this._name;
  }

  public set name(val) {
    this._name = val;
  }

  public get boreholes(): Borehole[] | any[] {
    return this._boreholes;
  }

  public isBorehole(input: any) {
    return input instanceof Borehole;
  }

  private _setBoreholesFromProps(input: CreateBoreholeProps[]) {
    let newBoreholes = input.map(item => new Borehole(item));
    let hasDupes = this._hasDuplicateBHID(newBoreholes);
    if (!hasDupes) {
      this._boreholes = newBoreholes;
    } else {
      throw ERROR_BHID_DUPES;
    }
  }

  _hasDuplicateBHID(boreholes: Borehole[]) {
    let ids = boreholes.map(item => item.bhid);
    let dupes = ids.filter((item, index) => ids.indexOf(item) !== index);
    return dupes.length > 0;
  }

  public set boreholes(input: Borehole[] | any[]) {
    let isBoreholes = true;
    try {
      input.forEach(item => {
        isBoreholes = this.isBorehole(item);
      });
    } catch (e) {
      isBoreholes = false;
    }

    if (isBoreholes) {
      this._boreholes = input;
    } else {
      try {
        this._setBoreholesFromProps(input);
      } catch (e) {
        throw e;
      }
    }
  }

  public get id() {
    return this._id;
  }

  dump() {
    let result: {[key: string]: any} = {};
    this.boreholes.forEach(bh => {
      let logging = undefined;
      logging = bh?.loggings?.iter();
      while (logging?.next) {
        logging = logging?.next;
        let loggingDump = logging?.value?.dump();
        let docName = logging?.value?.name;
        if (!result[docName]) {
          result[docName] = [];
        }
        loggingDump = loggingDump.map((item:{[key:string]: any}) => {
          return {
            name: this.name,
            ...bh.value,
            ...item,
          }
        });

        result[docName] = [...result[docName], ...loggingDump];
      }
    });
    return result;
  }
}

export default BoreholeList;
