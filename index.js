'use strict';

const LinkedList = require('./linkedlist');

function qSort(arr, start = 0, end = arr.length) {
  if (start >= end) {
    return arr;
  }

  const middle = partition(arr, start, end);
  arr = qSort(arr, start, middle);
  arr = qSort(arr, middle + 1, end);
  return arr;
}
function partition(arr, start, end) {
  const pivot = arr[end -1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (arr[i] <= pivot) {
      swap(arr, i, j);
      j++;
    }
  }
  swap(arr, end - 1, j);
  return j;
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}


function mSortList(list, count) {
  if (!list || !list.head || !list.head.next) {
    return list;
  }

  if (!count) {
    count = 0;
    let item = list.head;

    while (item) {
      count++;
      item = item.next;
    }
  }

  const middle = Math.floor(count / 2);
  let left = listCut(list, 0, middle);
  
  let right = listCut(list, middle, count);

  left = mSortList(left, middle);
  right = mSortList(right, count - middle);
  
  return mergeList(left, right, list);
}

function listCut(list, start, end) {
  const newList = new LinkedList();
  if (start >= end || !list.head) {
    return newList;
  }
  
  let node = list.head;

  let counter = 0;
  while (counter < end) {
    if (counter >= start) {
      newList.insertLast(node.value);
    }
    node = node.next;
    counter++;
  }

  return newList;
}

function mergeList(left, right) {
  let newList = new LinkedList();
  let leftNode = left.head;
  let rightNode = right.head;
  
  while (leftNode && rightNode) {
    if (leftNode.value < rightNode.value) {
      newList.insertLast(leftNode.value);
      leftNode = leftNode.next;
    } 
    else {
      newList.insertLast(rightNode.value);
      rightNode = rightNode.next;
    }
  }

  while (leftNode) {
    newList.insertLast(leftNode.value);
    leftNode = leftNode.next;
  }

  while (rightNode) {
    newList.insertLast(rightNode.value);
    rightNode = rightNode.next;
  }
  return newList;
}

function mSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mSort(left);
  right = mSort(right);
  return merge(left, right, array);
}
function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

let input = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5';
let arrNum = input.split(' ').map(i => Number(i));

console.log(mSort(arrNum));

let list1 = new LinkedList();
list1.insertFirst(5);
list1.insertLast(10);
list1.insertLast(2);
list1.insertLast(20);
list1.insertLast(15);

console.log(mSortList(list1));

