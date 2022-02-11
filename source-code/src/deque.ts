/**
 * 双端队列
 *
 * @class Deque
 */
class Deque<T> {
  items = new Map<number, T>();
  count = 0;
  lowestCount = 0;

  addFront(element: T) {
    if (this.isEmpty()) {
      this.items.set(this.count, element);
      this.count++;
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items.set(this.lowestCount, element);
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items.set(i, this.items.get(i - 1)!);
      }
      this.count++;
      this.lowestCount = 0;
      this.items.set(0, element);
    }
  }

  addBack(element: T) {
    this.items.set(this.count, element);
    this.count++;
  }

  removeFront() {
    if (this.isEmpty()) return undefined;

    const result = this.items.get(this.lowestCount);
    this.items.delete(this.lowestCount);
    this.lowestCount++;

    return result;
  }

  removeBack() {
    if (this.isEmpty()) return undefined;
    console.log(this.items);
    console.log(this.count);
    const result = this.items.get(this.count);
    this.items.delete(this.count);
    this.count--;

    return result;
  }

  peekFront() {
    if (this.isEmpty()) return undefined;
    return this.items.get(this.lowestCount);
  }

  peekBack() {
    if (this.isEmpty()) return undefined;
    return this.items.get(this.items.size - 1);
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    let result = "";

    this.items.forEach((value, key) => {
      result += `${key === this.lowestCount ? "" : ","}${value}`;
    });

    return result;
  }
}

const deque = new Deque();

console.log(deque.isEmpty());
deque.addBack("john"); // 2
deque.addBack("jack"); // 3
console.log(deque.toString());
deque.addBack("camila"); // 1
console.log(deque.toString());
console.log(deque.size());
console.log(deque.isEmpty());
console.log(deque.removeFront());
console.log(deque.toString());
console.log("remove back", deque.removeBack());
console.log(deque.toString());
deque.addFront("john");
console.log(deque.toString());
