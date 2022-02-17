/**
 * 队列(数组实现)
 *
 * @class ArrayQueue
 * @template T
 */
class ArrayQueue<T> {
  items: T[] = [];

  enqueue(element: T) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  toString() {
    let result = "";

    this.items.forEach((value, index) => {
      result += `${index === 0 ? "" : ","}${value}`;
    });

    return result;
  }
}

class ObjectQueue<T> {
  items: { [propName: string]: T } = {};
  lowestCount = 0;
  count = 0;

  enqueue(element: T) {
    this.items[this.count] = element;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;

    return result;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.lowestCount];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    let result = `${this.items[this.lowestCount]}`;

    for (let i = this.lowestCount + 1; i < this.count; i++) {
      result += `,${this.items[i]}`;
    }

    return result;
  }
}

class MapQueue<T> {
  items = new Map<number, T>();
  count = 0;
  lowestCount = 0;

  enqueue(element: T) {
    this.items.set(this.count, element);
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    const result = this.items.get(this.lowestCount);
    this.items.delete(this.lowestCount);
    this.lowestCount++;

    return result;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.items.get(this.lowestCount);
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    let result = `${this.items.get(this.lowestCount)}`;

    for (let i = this.lowestCount + 1; i < this.count; i++) {
      result += `,${this.items.get(i)}`;
    }

    return result;
  }
}
// const queue = new ArrayQueue();
// const queue = new ObjectQueue();
// const queue = new MapQueue();

// console.log(queue.isEmpty());
// queue.enqueue("a");
// queue.enqueue("b");
// queue.enqueue("c");

// console.log(queue.toString());
// console.log(queue.isEmpty());
// console.log(queue.size());
// queue.dequeue();
// console.log(queue.toString());
// console.log(queue.size());
// console.log("peek", queue.peek());


function hotPotato(list:string[], number:number){
  const queue = new MapQueue<string>();
  const loserList:string[] = []

  for(let i = 0; i < list.length; i++){
    queue.enqueue(list[i]);
  }

  while (queue.size() > 1){
    for(let i = 0; i < number; i++){
      queue.enqueue(queue.dequeue()!);
    }
    const loser = queue.dequeue()!;
    console.log(loser,'被淘汰了');
    loserList.push(loser);
  }

  console.log('-------------------------------')
  console.log(queue.dequeue(),'获胜了');
  return queue.dequeue();
}

// hotPotato(["Bill", "David", "Susan", "Jane", "Kent", "Brad"], 7);
