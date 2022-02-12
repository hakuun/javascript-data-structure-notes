#### 定义

> 双端队列（deque，或称 double-ended queue）是一种允许我们同时从前端和后端添加和移除元素的特殊队列。
>
> — 学习 JavaScript 数据结构与算法（第 3 版）

现实中的例子：

> 双端队列在现实生活中的例子有电影院、餐厅中排队的队伍等。举个例子，一个刚买了票的人如果只是还需要再问一些简单的信息，就可以直接回到队伍的头部。另外，在队伍末尾的人如果赶时间，他可以直接离开队伍。
>
> — 学习 JavaScript 数据结构与算法（第 3 版）

使用场景：

> 在计算机科学中，双端队列的一个常见应用是存储一系列的撤销操作。每当用户在软件中进行了一个操作，该操作会被存在一个双端队列中（就像在一个栈里）。当用户点击撤销按钮时，该操作会被从双端队列中弹出，表示它被从后面移除了。在进行了预先定义的一定数量的操作后，最先进行的操作会被从双端队列的前端移除。由于双端队列同时遵守了先进先出和后进先出原则，可以说它是把队列和栈相结合的一种数据结构。
>
> — 学习 JavaScript 数据结构与算法（第 3 版）

#### 实现

双端队列是一种特殊的队列，部分代码和队列相同，包括相同的内部属性和以下方法：isEmpty、clear、size 和 toString。

由于双端队列允许在两端添加和移除元素，还会有下面几个方法：

❑ addFront(element)：该方法在双端队列前端添加新的元素。

❑ addBack(element)：该方法在双端队列后端添加新的元素（实现方法和 Queue 类中的 enqueue 方法相同）。

❑ removeFront()：该方法会从双端队列前端移除第一个元素（实现方法和 Queue 类中的 dequeue 方法相同）。

❑ removeBack()：该方法会从双端队列后端移除第一个元素（实现方法和 Stack 类中的 pop 方法一样）。

❑ peekFront()：该方法返回双端队列前端的第一个元素（实现方法和 Queue 类中的 peek 方法一样）。

❑ peekBack()：该方法返回双端队列后端的第一个元素（实现方法和 Stack 类中的 peek 方法一样）。

其他方法实现和队列和栈中的方法差别不大，需要重点关注的是 addFront 方法的逻辑。在前端插入元素时需要考虑三种情况：

1. 队列为空时：直接插入元素。
2. lowestCount > 0 即最前端还有空位时：直接在最前端插入元素并将 lowestCount - 1。
3. 队列不为空且最前端没有空位时：需要将队列中现有的元素位置全部往后挪一位，然后在最前端插入元素。

使用 map 实现：

```typescript
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

    const result = this.items.get(this.count - 1);
    this.items.delete(this.count - 1);
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
    let result = `${this.items.get(this.lowestCount)}`;

    for (let i = this.lowestCount + 1; i < this.count; i++) {
      result += `,${this.items.get(i)}`;
    }

    return result;
  }
}
```
