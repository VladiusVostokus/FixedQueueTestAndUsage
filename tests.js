'use strict';

const assert = require('node:assert/strict');
const FixedQueue = require('./fixedQueue');

// Simple correct usage
const queue = new FixedQueue();

queue.push(1);
queue.push(2);
queue.push(3);

assert.equal(queue.shift(), 1);
assert.equal(queue.shift(), 2);
assert.equal(queue.shift(), 3);

assert.equal(queue.isEmpty(), true);



