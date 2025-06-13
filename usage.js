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

let shiftSum = 0;
for (let i = 0; i < 10000; i++) {
  queue.push(1);
}

for (let i = 0; i < 10000; i++) {
  shiftSum += queue.shift();
}

console.log(shiftSum); // 10000


const f1 = () => { console.log('f1') };
const f2 = () => { console.log('f2') };
const f3 = () => { console.log('f3') };

queue.push(f1);
queue.push(f2);
queue.push(f3);

queue.shift()(); // f1
queue.shift()(); // f2
queue.shift()(); // f3
