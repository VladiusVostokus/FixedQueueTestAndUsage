'use strict';

const assert = require('assert');
const FixedQueue = require('./fixedQueue');

// Simple correct usage
let queue = new FixedQueue();

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


// Push an array
queue = new FixedQueue();
const testArr = [];
const expectedArray = [];

for (let i = 0; i < 10; i++) {
  testArr[i] = i;
  expectedArray[i] = i;
}

queue.push(testArr);
assert.deepEqual(queue.shift(), expectedArray);



