class ArrayStack<T> {
  items: T[] = [];

  push(element: T) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  toString() {
    let result = "";
    for (let i = 0; i < this.size(); i++) {
      result += `${i === 0 ? "" : ","}${this.items[i]}`;
    }
    return result;
  }
}

const arrayStack = new ArrayStack<number>();

// console.log(arrayStack.isEmpty());
// arrayStack.push(0);
// arrayStack.push(1);
// arrayStack.push(2);
// console.log(arrayStack.toString());
// console.log(arrayStack.isEmpty());
// console.log(arrayStack);
// console.log(arrayStack.peek());
// console.log(arrayStack.pop());
// arrayStack.clear();
// console.log(arrayStack.isEmpty());
// console.log(arrayStack.size());

class ObjectStack<T> {
  items: { [propName: string]: T } = {};
  count = 0;

  push(element: T) {
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];

    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
  }

  size() {
    return this.count;
  }

  toString() {
    let result = "";
    Object.keys(this.items).forEach((value, index) => {
      result += `${index === 0 ? "" : ","}${value}`;
    });
    return result;
  }
}

const objectStack = new ObjectStack<number>();

// console.log(objectStack.isEmpty());
// objectStack.push(0);
// objectStack.push(1);
// objectStack.push(2);
// console.log(objectStack.toString());
// console.log(objectStack.isEmpty());
// console.log(objectStack);
// console.log(objectStack.peek());
// console.log(objectStack.pop());
// objectStack.clear();
// console.log(objectStack);
// console.log(objectStack.isEmpty());
// console.log(objectStack.size());

class MapStack<T> {
  items = new Map<number, T>();

  push(element: T) {
    this.items.set(this.items.size, element);
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items.get(this.items.size - 1);
    this.items.delete(this.items.size - 1);
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.get(this.items.size - 1);
  }

  isEmpty() {
    return this.items.size === 0;
  }

  clear() {
    this.items.clear();
  }

  size() {
    return this.items.size;
  }

  toString() {
    let result = "";
    this.items.forEach((value, index) => {
      result += `${index === 0 ? "" : ","}${value}`;
    });
    return result;
  }
}

const mapStack = new MapStack<string>();

// console.log(mapStack.isEmpty());
// objectStack.push(0);
// objectStack.push(1);
// objectStack.push(2);
// console.log(objectStack.toString());
// console.log(mapStack.isEmpty());
// console.log(mapStack);
// console.log(mapStack.peek());
// console.log(mapStack.pop());
// mapStack.clear();
// console.log(mapStack);
// console.log(mapStack.isEmpty());
// console.log(mapStack.size());

/**
 *
 *
 * @param {number} decimalNumber
 * @return {string}
 */
function decimal2binary(decimalNumber: number): string {
  if (decimalNumber === 0) return "0";
  let binaryString = "";
  const stack = new MapStack<number>();
  let number = decimalNumber;
  while (number > 0) {
    stack.push(Math.floor(number % 2));
    number = Math.floor(number / 2);
  }
  while (!stack.isEmpty()) {
    binaryString += stack.pop();
  }
  return binaryString;
}

function baseConverter(decimalNumber: number, base: number) {
  if (decimalNumber === 0) return "0";
  const stack = new MapStack<number>();
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let number = decimalNumber;
  let baseString = "";
  if (!(2 <= base && base <= 36)) {
    return "";
  }
  while (number > 0) {
    stack.push(Math.floor(number % base));
    number = Math.floor(number / base);
  }

  while (!stack.isEmpty()) {
    baseString += digits[stack.pop()!];
  }
  return baseString;
}
