import { LinkedList, LLItem } from '../../src/helpers/LinkedList';

describe('Empty linked list', () => {
  it('has default linked list properties', () => {
    let ll = new LinkedList();
    expect(ll).toHaveProperty('size');
    expect(ll).toHaveProperty('idMap');
    expect(ll).toHaveProperty('head');
    expect(ll).toHaveProperty('tail');
    expect(ll).toHaveProperty('length');
    expect(ll.isEmpty()).toEqual(true);
    expect(ll.first).toBeUndefined();
    expect(ll.last).toBeUndefined();
    expect(ll.length).toEqual(0);
  });

  it('can append new item', () => {
    let ll = new LinkedList();
    let first = 1;
    let second = 2;

    let firstItem = undefined;
    let firstValue = undefined;
    let secondItem = undefined;
    let secondValue = undefined;

    ll.addLast(first);
    firstItem = ll?.first;
    firstValue = ll?.first?.value;
    expect(ll.length).toEqual(1);
    expect(firstItem).toBeInstanceOf(LLItem);
    expect(firstValue).toEqual(first);

    ll.addLast(second);

    firstItem = ll?.first;
    secondItem = ll?.last;
    firstValue = ll?.first?.value;
    secondValue = ll?.last?.value;
    expect(ll.length).toEqual(2);
    expect(firstValue).toEqual(first);
    expect(secondItem).toBeInstanceOf(LLItem);
    expect(secondValue).toEqual(second);

    secondValue = firstItem?.next?.value;
    expect(secondValue).toEqual(second);
  });
});

describe('Linked list item', () => {
  it('has default item properties', () => {
    let llItem = new LLItem(0);
    let val = llItem.value;

    expect(llItem).toHaveProperty('id');
    expect(llItem).toHaveProperty('value');
    expect(llItem).toHaveProperty('next');
    expect(llItem).toHaveProperty('prev');
    expect(val).toEqual(0);

    let nextItem = llItem.addNext(1);
    val = nextItem.value;
    expect(nextItem).toHaveProperty('id');
    expect(nextItem).toHaveProperty('value');
    expect(nextItem).toHaveProperty('next');
    expect(nextItem).toHaveProperty('prev');
    expect(val).toEqual(1);

    let prevItem = llItem.addPrev(2);
    val = prevItem.value;
    expect(prevItem).toHaveProperty('id');
    expect(prevItem).toHaveProperty('value');
    expect(prevItem).toHaveProperty('next');
    expect(prevItem).toHaveProperty('prev');
    expect(val).toEqual(2);
  });

  it('can update LinkedList state', () => {
    let llist = new LinkedList();
    expect(llist.length).toEqual(0);

    llist.addLast(0);
    expect(llist.length).toEqual(1);

    let llItem = llist.first;
    llItem?.addNext(1);
    expect(llist.length).toEqual(2);

    llItem?.addPrev(2);
    expect(llist.length).toEqual(3);

    let firstVal = llist?.first?.value;
    let lastVal = llist?.last?.value;
    expect(firstVal).toEqual(2);
    expect(lastVal).toEqual(1);
  });
});

describe('Create from array', () => {
  it('assign each item into LLItem.value', () => {
    let inputArr = [0, 1, 2, 3, 4];
    let llist = new LinkedList();
    llist.fromArray(inputArr);
    // inputArr.forEach(item => llist.addLast(item));

    expect(llist.length).toEqual(inputArr.length);
  });

  it('has toArray method', () => {
    let inputArr = [0, 1, 2, 3, 4];
    let llist = new LinkedList();
    inputArr.forEach(item => llist.addLast(item));
    let refArr = llist.toArray();

    expect(refArr).toEqual(inputArr);
  });
});

describe('Linked list idMap', () => {
  it('map item id in a container', () => {
    let llist = new LinkedList();
    expect(llist.length).toEqual(0);
    llist.addLast(0);
    llist.addLast(1);
    llist.addLast(2);
    expect(llist.length).toEqual(3);
    expect(llist).toHaveProperty('idMap');

    let mapLength = Object.keys(llist.idMap).length;
    expect(llist.length).toEqual(mapLength);

    let first = llist.first;
    let theID = first?.id;
    let getByID = llist.getItemByID(theID);

    let secondIdA = first?.next?.id;
    let secondIdB = getByID?.next?.id;

    expect(getByID).toBeInstanceOf(LLItem);

    expect(secondIdA).toBeTruthy();
    expect(secondIdB).toBeTruthy();
    expect(secondIdA).toEqual(secondIdB);
  });

  it('can get and remove item by id', () => {});
});

describe('Linked list method', () => {
  const inputArray = [1, 2, 3, 4];
  let getLl = () => {
    let leList = new LinkedList();
    leList.fromArray(inputArray);
    return leList;
  };
  it('remove prev', () => {
    let ll = getLl();
    let refLength = ll.length + 0;
    expect(ll.toArray()).toEqual([1, 2, 3, 4]);

    ll?.first?.next?.removePrev();
    expect(ll.toArray()).toEqual([2, 3, 4]);
    expect(ll.length).toEqual(refLength - 1);
    ll?.last?.removePrev();
    expect(ll.toArray()).toEqual([2, 4]);
    expect(ll.length).toEqual(refLength - 2);
  });
  it('remove next', () => {
    let ll = getLl();
    let refLength = 0 + ll.length;
    expect(ll.toArray()).toEqual(inputArray);

    ll?.last?.prev?.removeNext();
    expect(ll.toArray()).toEqual([1, 2, 3]);
    expect(ll.length).toEqual(refLength - 1);
    ll?.first?.removeNext();
    expect(ll.toArray()).toEqual([1, 3]);
    expect(ll.length).toEqual(refLength - 2);
  });
  it('remove self', () => {
    let ll = getLl();
    let refLength = 0 + ll.length;
    expect(ll.toArray()).toEqual(inputArray);
    expect(ll.length).toEqual(inputArray.length);

    ll?.first?.next?.removeSelf();
    expect(ll.toArray()).toEqual([1, 3, 4]);
    expect(ll.length).toEqual(refLength - 1);
  });
  it('remove by id', () => {
    let ll = getLl();
    let refLength = 0 + ll.length;
    expect(ll.toArray()).toEqual(inputArray);
    expect(ll.length).toEqual(inputArray.length);

    ll.removeItemByID(ll.last?.id);
    expect(ll.toArray()).toEqual([1, 2, 3]);
    expect(ll.length).toEqual(refLength - 1);

    ll = getLl();
    ll.removeItemByID(ll.first?.next?.id);
    expect(ll.toArray()).toEqual([1, 3, 4]);
    expect(ll.length).toEqual(refLength - 1);

    ll = getLl();
    ll.removeItemByID(ll.first?.id);
    expect(ll.toArray()).toEqual([2, 3, 4]);
    expect(ll.length).toEqual(refLength - 1);
  });
  it('get by index', () => {
    let ll = getLl();
    expect(ll?.get(0)?.id).toEqual(ll?.first?.id);
    expect(ll?.get(3)?.id).toEqual(ll?.last?.id);
  });
  it('add first', () => {
    let ll = getLl();
    ll.addFirst(0);
    expect(ll?.first?.value).toEqual(0);
  });
  it('remove first', () => {
    let ll = getLl();
    let refLength = ll.length + 0;
    ll.removeFirst();
    expect(ll.toArray()).toEqual([2, 3, 4]);
    expect(ll.length).toEqual(refLength - 1);
  });
  it('remove last', () => {
    let ll = getLl();
    let refLength = ll.length + 0;
    ll.removeLast();
    expect(ll.toArray()).toEqual([1, 2, 3]);
    expect(ll.length).toEqual(refLength - 1);
  });
});
