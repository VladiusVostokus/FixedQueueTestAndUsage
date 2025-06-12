'use strict';

const assert = require('node:assert/strict');
const FixedQueue = require('./fixedQueue');

// Simple correct usage
const queue = new FixedQueue();

queue.push(1);
queue.push(2);
queue.push(3);

assert(queue.shift(), 1);
assert(queue.shift(), 2);
assert(queue.shift(), 3);

assert(queue.isEmpty, true);

// Example of full Queue

while(!queue.head.isFull) {
    queue.push(1);
}
assert(!queue.head.isFull, true);

// Example of overflow
queue.push(1);

