'use strict';

const assert = require('assert');
const FixedQueue = require('./fixedQueue');

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

  // Bottom and top behaviour if only 1 buffer
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

// Add more than 2028(creation of new buffer inside queue)
{
  const queue = new FixedQueue();
  for (let i = 0; i < 2047; i++) {
    queue.push(i);
  }

  assert.equal(queue.head.top, 2047);
  assert.equal(queue.tail.bottom, 0);

  queue.push(12312);
  assert.equal(queue.head.top, 1);
}


// Shift more than list len
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

// Shift more than list len, bigger list
{
  const queue = new FixedQueue();

  for (let i = 0; i < 2047; i++) {
    queue.push(i);
  }

  queue.shift();
  assert.equal(queue.tail.bottom, 1);

  for (let i = 0; i < 2046; i++) {
    queue.shift();
  }

  assert.equal(queue.tail.bottom, 2047);
  queue.shift();
  queue.shift();
  assert.equal(queue.tail.bottom, 2047);
}


// Top and Bottom if more than 1 FixedCircularBuffer
{
  const queue = new FixedQueue();

  for (let i = 0; i < 5000; i++) {
    queue.push(i);
  }

  assert.equal(queue.head.top, 5000 - 2047 * 2);

  for (let i = 0; i < 4999; i++) {
    queue.shift();
  }

  assert.equal(queue.tail.bottom, 5000 - 2047 * 2 - 1);
  queue.shift();
  assert.equal(queue.tail.bottom, 5000 - 2047 * 2);
}


// Bottom behaviour if buffer count increases
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
