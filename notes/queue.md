#### 定义

> 队列是遵循先进先出（First In First Out，FIFO，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。
>
> — 学习 JavaScript 数据结构与算法（第 3 版）

现实中的例子：排队

使用场景：

> 在计算机科学中，一个常见的例子就是打印队列。比如说我们需要打印五份文档。我们会打开每个文档，然后点击打印按钮。每个文档都会被发送至打印队列。第一个发送到打印队列的文档会首先被打印，以此类推，直到打印完所有文档。
>
> — 学习 JavaScript 数据结构与算法（第 3 版）

#### 实现

方法：

❑ enqueue(element(s))：向队列尾部添加一个（或多个）新的项。

❑ dequeue()：移除队列的第一项（即排在队列最前面的项）并返回被移除的元素。

❑ peek()：返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与 Stack 类的 peek 方法非常类似）。该方法在其他语言中也可以叫作 front 方法。

❑ isEmpty()：如果队列中不包含任何元素，返回 true，否则返回 false。

❑ size()：返回队列包含的元素个数，与数组的 length 属性类似。

使用数组实现：

```typescript
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
```

使用对象实现：

> 需要注意的是，使用对象实现时可以声明一个 count 属性来帮助我们控制队列的大小。此外，由于我们将要从队列前端移除元素，同样需要一个变量来帮助我们追踪第一个元素。因此，声明一个 lowestCount 变量。
>
> 在实现 toString 方法是由于 Queue 类中的第一个索引值不一定是 0，我们需要从索引值为 lowestCount 的位置开始迭代队列。
>
> — 学习 JavaScript 数据结构与算法（第 3 版）

```typescript
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
```

使用 map 实现（和使用对象实现代码区别不大）：

```typescript
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
```
