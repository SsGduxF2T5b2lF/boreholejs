import { v4 as uidv4 } from 'uuid';

/**
 * Doubly Linked List by DevMaking.com ( Andrew McShane )
 * article: https://www.devmaking.com/learn/data-structures/doubly-linked-list/
 * source: https://github.com/AndrewMcShane/DevMakingSource/blob/master/TypeScript/DataStructures/DoublyLinkedList.ts
 *
 * with modification
 * DoublyLinkedListNode => LLItem
 * DoublyLinkedList => LinkedList
 * null-based defaults => undefined
 */

export class LLItem {
  private _id: string;
  private maxRetries: number;
  public parent?: LinkedList;
  public value: any;
  public next?: LLItem;
  public prev?: LLItem;

  /**
   * Create LinkedList item
   * @param {any} item - The item
   * @param {LinkedList} parent - the parent LinkedList
   */
  constructor(value?: any, parent?: LinkedList) {
    this.maxRetries = 10;
    this.parent = parent;
    this.value = value;
    this.next = undefined;
    this.prev = undefined;
    this._id = this.setID();
  }

  public get id() {
    return (' ' + String(this._id)).slice(1);
  }

  /**
   */
  setID(): string {
    let succeed = undefined;
    let newID = '';
    for (let i = 0; i < this.maxRetries; i++) {
      if (succeed) break;
      newID = uidv4();
      if (this.hasParent()) {
        succeed = this.parent?.mapID(newID, this);
      } else {
        succeed = true;
      }
    }
    return newID;
  }

  /**
   * assign next as LLItem, LLItem.value = item;
   * returning inserted item
   */
  addNext(item: any): LLItem {
    let newVal = new LLItem(item, this.parent);
    newVal.next = this.next;
    newVal.prev = this;

    if (this.isTail && this.parent) {
      this.parent.tail = newVal;
    }
    this.next = newVal;

    this.parent?.increase();
    return this.next;
  }

  /**
   * assign next as LLItem, LLItem.value = item;
   * returning inserted item
   */
  addPrev(item: any): LLItem {
    let newVal = new LLItem(item, this.parent);
    newVal.prev = this.prev;
    newVal.next = this;

    if (this.isHead && this.parent) {
      this.parent.head = newVal;
    }
    this.prev = newVal;

    this.parent?.decrease();
    return this.prev;
  }

  /**
   * returning detached connection (cool words, amirite?)
   */
  private detach() {
    let { next, prev } = this;
    delete this.next;
    delete this.prev;
    delete this.parent;
    return { next, prev };
  }

  /**
   * detach, this.parent.removeItemByID
   */
  removeSelf() {
    let { next, prev } = this.detach();
    if (next) {
      next.prev = prev;
    }
    if (prev) {
      prev.next = next;
    }

    if (this.hasParent() && this.parent) {
      this.parent.deleteMapID(this.id);
      this.parent.decrease();
    }
  }

  /**
   * remove connection to this.next
   * also set this as this.parent.tail if this.next is tail
   */
  removeNext() {
    let nextItem = this.next;
    if (nextItem && this.parent) {
      if (nextItem.isTail) {
        this.parent.tail = this;
      }
      let { next } = nextItem.detach();
      this.next = next;
      if (next instanceof LLItem) {
        next.prev = this;
      }
      this.parent.decrease();
    }
  }

  /**
   * remove connection to this.prev
   * also set this as this.parent.head if this.prev is head
   */
  removePrev() {
    let prevItem = this.prev;
    if (prevItem && this.parent) {
      if (prevItem.isHead) {
        this.parent.head = this;
      }
      let { prev } = prevItem.detach();
      this.prev = prev;
      if (prev instanceof LLItem) {
        prev.next = this;
      }
      this.parent.decrease();
    }
  }

  hasParent() {
    return !!(this.parent && this.parent instanceof LinkedList);
  }

  hasPrev() {
    return !!this.prev;
  }

  hasNext() {
    return !!this.next;
  }

  // HACK: considered first if,
  // 1. parent is an instance of LinkedList
  // 2. prev is falsy
  isFirst() {
    if (this.hasParent()) {
      return this.hasParent() && !this.hasPrev();
    } else {
      return !this.hasPrev();
    }
  }
  public get isHead() {
    return this.isFirst();
  }

  // HACK: considered last if,
  // 1. parent is an instance of LinkedList
  // 2. next is falsy
  isLast() {
    if (this.hasParent()) {
      return !!(this.hasParent() && !this.next);
    } else {
      return !!!this.next;
    }
  }
  public get isTail() {
    return this.isLast();
  }
}

export class LinkedList {
  head?: LLItem;
  tail?: LLItem;
  private size: number;
  idMap: { [key: string]: LLItem | undefined };

  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this.size = 0;
    this.idMap = {};
  }

  public mapID(uuid: string | undefined, item: LLItem): boolean | undefined {
    if (!uuid) return;
    if (!this.idMap[uuid]) {
      this.idMap[uuid] = item;
      return true;
    } else {
      return false;
    }
  }

  public deleteMapID(uuid: string | undefined) {
    if (!uuid) return;
    delete this.idMap[uuid];
  }

  public getItemByID(uuid: string | undefined): LLItem | undefined {
    if (!uuid) return;
    return this.idMap[uuid];
  }

  public removeItemByID(uuid: string | undefined): void {
    if (!uuid) return;
    let llItem = this.getItemByID(uuid);
    if (!!llItem) {
      llItem.removeSelf();
    }
  }

  public increase() {
    this.size++;
  }

  public decrease() {
    this.size++;
  }

  public get length(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.size <= 0;
  }

  /**
   * binary search huh?
   */
  public get(index: number): LLItem | undefined {
    if (index > this.size || this.isEmpty()) {
      throw new RangeError('Index out of range.');
    }

    if (index > this.size / 2) {
      let i = this.size - 1 - index;
      let tmp = this.tail;
      while (i > 0 && tmp) {
        tmp = tmp.prev;
        i--;
      }
      return tmp;
    } else {
      let tmp = this.head;
      for (let i = 0; i < index && tmp; i++) {
        tmp = tmp.next;
      }
      return tmp;
    }
  }

  public fromArray(input: any[]) {
    if (!input) return;
    input.forEach(item => this.addLast(item));
  }

  public toArray(): any[] {
    let result = [];
    let llItem = this.first;
    if (!llItem) {
      return [];
    }
    do {
      result.push(llItem?.value);
      llItem = llItem?.next;
    } while (llItem?.hasNext);
    return result;
  }

  public get first(): LLItem | undefined {
    if (this.head) {
      return this.head;
    }
    return undefined;
  }

  public get last(): LLItem | undefined {
    if (this.tail) {
      return this.tail;
    }
    return undefined;
  }

  public addLast(value: any) {
    let tmp;
    if (this.isEmpty()) {
      tmp = new LLItem(value, this);
      tmp.value = value;
      this.head = tmp;
      this.tail = tmp;
      this.size++;
      // return;
    } else {
      tmp = this.last;
      tmp?.addNext(value);
    }
  }

  public addFirst(value: any) {
    let tmp;
    if (this.isEmpty()) {
      tmp = new LLItem(value, this);
      // tmp.value = value;
      this.head = tmp;
      this.tail = tmp;
      this.size++;
    } else {
      tmp = this.first;
      tmp?.addPrev(value);
    }
  }

  public remove(value: any) {
    if (this.isEmpty()) {
      return;
    }
    let tmp = this.head;
    while (tmp) {
      if (tmp.value === value) {
        if (tmp.prev) {
          tmp.prev.next = tmp.next;
        } else {
          this.head = tmp.next;
        }
        if (tmp.next) {
          tmp.next.prev = tmp.prev;
        } else {
          this.tail = tmp.prev;
        }
        this.size--;
        return;
      }
      tmp = tmp.next;
    }
  }

  public removeFirst() {
    if (this.isEmpty()) {
      return;
    }
    if (this.size === 1) {
      this.head = undefined;
      this.tail = undefined;
      this.size--;
    } else {
      if (this.head) {
        this.head = this.head.next;
      }
      if (this.head) {
        this.head.prev = undefined;
      }
      this.size--;
    }
  }

  public removeLast() {
    if (this.isEmpty()) {
      return;
    }
    if (this.size === 1) {
      this.head = undefined;
      this.tail = undefined;
      this.size--;
    } else {
      if (this.tail) {
        this.tail = this.tail.prev;
      }
      if (this.tail) {
        this.tail.next = undefined;
      }
      this.size--;
    }
  }
}