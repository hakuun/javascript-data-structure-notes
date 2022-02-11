#### 定义

> 栈是一种遵从后进先出（Last In First Out，LIFO）原则的有序集合。新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。
>
> — 学习 JavaScript 数据结构与算法（第 3 版）

现实中的例子：

> 叠放的书或者餐厅里叠放的盘子。
>
> — 学习 JavaScript 数据结构与算法（第 3 版）

使用场景：

> 栈也被用在编程语言的编译器和内存中保存变量、方法调用等，也被用于浏览器历史记录（浏览器的返回按钮）
>
> — 学习 JavaScript 数据结构与算法（第 3 版）

#### 实现

方法：
❑ push(element(s))：添加一个（或几个）新元素到栈顶。

❑ pop()：移除栈顶的元素，同时返回被移除的元素。

❑ peek()：返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）。

❑ isEmpty()：如果栈里没有任何元素就返回 true，否则返回 false。

❑ clear()：移除栈里的所有元素。

❑ size()：返回栈里的元素个数。该方法和数组的 length 属性很类似。

使用数组实现：

```typescript
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
```

使用对象实现：

```typescript
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
```

使用 map 实现：

```typescript
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
```

#### 栈的实际应用

十进制转二进制

```typescript
/**
 *
 *
 * @param {number} decimalNumber
 * @return {string}
 */
function decimal2binary(decimalNumber: number): string {
  if (decimalNumber === 0) return "0";

  const stack = new MapStack<number>();
  let binaryString = "";
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
```

也可以新增一个基数参数，使之能把十进制转换成基数为 2 ～ 36 的任意进制

```typescript
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
```
