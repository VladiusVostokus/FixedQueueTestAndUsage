'use strict';

const assert = require('assert');
const FixedQueue = require('./fixedQueue');

const kSize = 2047;

// Simple correct usage
{
  const queue = new FixedQueue();

  queue.push(1);
  queue.push(2);
  queue.push(3);

  assert.equal(queue.shift(), 1);
  assert.equal(queue.shift(), 2);
  assert.equal(queue.shift(), 3);

  assert.equal(queue.isEmpty(), true);

  // Should be null, because queue is empty
  assert.equal(queue.shift(), null);

  // Doesn't change pushed elements inside
  queue.push(2);
  assert.notEqual(queue.shift(), 3);
}

// Push an array
{
  const queue = new FixedQueue();
  const testArr = [];
  const expectedArray = [];

  for (let i = 0; i < 10; i++) {
    testArr[i] = i;
    expectedArray[i] = i;
  }

  queue.push(testArr);
  assert.deepEqual(queue.shift(), expectedArray);
}

  // Bottom and top behaviour if only 1 FixedCircularBuffer
{
  const queue = new FixedQueue();
  for (let i = 0; i < 10; i++) {
    queue.push(i);
  }

  assert.equal(queue.head.top, queue.tail.top);
  assert.equal(queue.head.bottom, queue.tail.bottom);

  assert.equal(queue.head.top, 10);
  assert.equal(queue.head.bottom, 0);

  queue.shift();

  assert.equal(queue.head.top, queue.tail.top);
  assert.equal(queue.head.bottom, queue.tail.bottom);

  assert.equal(queue.head.top, 10);
  assert.equal(queue.head.bottom, 1);

  queue.shift();
  assert.equal(queue.head.bottom, 2);
}

// Add more than 2028(creation of new FixedCircularBuffer inside queue)
{
  const queue = new FixedQueue();
  for (let i = 0; i < kSize; i++) {
    queue.push(i);
  }

  assert.equal(queue.head.top, kSize);
  assert.equal(queue.tail.bottom, 0);

  queue.push(12312);
  assert.equal(queue.head.top, 1);
}


// Shift more than FixedCircularBuffer len
{
  const queue = new FixedQueue();
  for (let i = 0; i < 10; i++) {
    queue.push(i);
  }

  for (let i = 0; i < 20; i++) {
    queue.shift();
  }

  assert.equal(queue.tail.bottom, 10);
}

// Shift more than FixedCircularBuffer len, more elements
{
  const queue = new FixedQueue();

  for (let i = 0; i < kSize; i++) {
    queue.push(i);
  }

  queue.shift();
  assert.equal(queue.tail.bottom, 1);

  for (let i = 0; i < kSize - 1; i++) {
    queue.shift();
  }

  assert.equal(queue.tail.bottom, kSize);
  queue.shift();
  queue.shift();
  assert.equal(queue.tail.bottom, kSize);
}


// Top and Bottom behaviour if more than 1 FixedCircularBuffer
{
  const queue = new FixedQueue();
  const countToPush = 5000;

  for (let i = 0; i < countToPush; i++) {
    queue.push(i);
  }
  
  const countOfFullBuffers = 2;
  const elemCount = kSize * countOfFullBuffers;
  assert.equal(queue.head.top, 5000 - elemCount);

  const countToShift = countToPush - 1;
  for (let i = 0; i < countToShift; i++) {
    queue.shift();
  }

  const expectedBottom =  countToShift - elemCount;
  
  assert.equal(queue.tail.bottom, expectedBottom);
  queue.shift();
  assert.equal(queue.tail.bottom, expectedBottom + 1);
}


// Bottom behaviour if FixedCircularBuffer count increases
{
  const queue = new FixedQueue();

  for (let i = 0; i < 1000; i++) {
    queue.push(i);
  }

  for (let i = 0; i < 500; i++) {
    queue.shift();
  }
  assert.equal(queue.tail.bottom, 500);
  assert.equal(queue.head.bottom, 500);

  for (let i = 0; i < 2000; i++) {
    queue.push(i);
  }
  assert.equal(queue.tail.bottom, 500);
  assert.equal(queue.head.bottom, 0);
}
