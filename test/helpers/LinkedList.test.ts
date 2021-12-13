import { LinkedList, LLItem } from '../../src/helpers/LinkedList';

describe('Empty linked list', () => {
  it('has default linked list properties', () => {
    let ll = new LinkedList();
    expect(ll).toHaveProperty('size');
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

    expect(llItem).toHaveProperty('value');
    expect(llItem).toHaveProperty('next');
    expect(llItem).toHaveProperty('prev');
    expect(val).toEqual(0);

    let nextItem = llItem.addNext(1);
    val = nextItem.value;
    expect(nextItem).toHaveProperty('value');
    expect(nextItem).toHaveProperty('next');
    expect(nextItem).toHaveProperty('prev');
    expect(val).toEqual(1);

    let prevItem = llItem.addPrev(2);
    val = prevItem.value;
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
