const FixedQueue = require('./fixedQueue');

const queue = new FixedQueue();

queue.push(1);
queue.push(2);
queue.push(3);

console.log(queue.shift()); // 1
console.log(queue.shift()); // 2
console.log(queue.shift()); // 3

const someArr = [];

for (let i = 0; i < 10; i++) {
  someArr[i] = i;
}

queue.push(someArr);
console.log(queue.shift()); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

queue.push("hello world");
console.log(queue.shift()); // hello world

