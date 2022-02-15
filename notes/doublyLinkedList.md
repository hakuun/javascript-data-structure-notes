#### 定义

>双向链表和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接；而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素。
> 
>  — 学习 JavaScript 数据结构与算法（第 3 版）

#### 实现 

因为双向链表有两个指针，所以在插入和删除时与单项链表不同，要改变两个指针的指向。

```ts
class DoublyLinkedNode<T> {
  value: T;
  next: DoublyLinkedNode<T> | null;
  prev: DoublyLinkedNode<T> | null;

  constructor(value:T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublydoublyLinkedList<T> {
  head: DoublyLinkedNode<T> | null;
  tail: DoublyLinkedNode<T> | null;
  count: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  push(value: T): void {
    const node = new DoublyLinkedNode(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.count++;
  }

  insert(value:T, position:number){
    if (position < 0 || position > this.count) {
      throw new Error('Position is out of the list');
    }
    const node = new DoublyLinkedNode(value);
    if (!this.head){
      this.head = node;
      this.tail = node;
    } else if(position === 0){
      if (this.tail === null) {
        this.tail = node;
      } else {
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
      }
    } else {
      let current:DoublyLinkedNode<T> | null = this.head;
      let previous = this.head;
      let index = 0;
      while (index < position) {
        previous = current as DoublyLinkedNode<T>;
        current = current!.next;
        index++;
      }
      node.prev = previous;
      node.next = current;
      previous.next = node;
      if (current) {
        current.prev = node;
      } else {
        this.tail = node;
      }
    }
    this.count++;
  }

  getElementAt(index: number): T | undefined {
    if (index < 0 || index >= this.count) {
      throw new Error("Position is out of the list");
    }
    let current = this.head;
    let indexCount = 0;
    while (current) {
      if (indexCount === index) {
        return current.value;
      }
      current = current.next;
      indexCount++;
    }
  }

  remove(value:T){
    let current = this.head;
    let previous = this.head;
    while (current) {
      if (current.value === value) {
        if (current === this.head) {
          this.head = this.head!.next;
          if (this.head === null) {
            this.tail = null;
          } else {
            this.head.prev = null;
          }
        } else if (current === this.tail) {
          this.tail = this.tail!.prev;
          this.tail!.next = null;
        } else {
          previous!.next = current.next;
          current!.next!.prev = previous;
        }
        this.count--;
        return true;
      }
      previous = current;
      current = current.next;
    }
    return false;
  }

  indexOf(value:T){
    if (!this.head) {
      return -1;
    }
    let current: DoublyLinkedNode<T> | null = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  removeAt(position:number){
    if (position < 0 || position >= this.count) {
      throw new Error("Position is out of the list");
    }
    if (position === 0) {
      this.head = this.head!.next;
      if (this.head === null) {
        this.tail = null;
      } else {
        this.head.prev = null;
      }
    } else {
      let current: DoublyLinkedNode<T> | null = this.head;
      let previous = this.head;
      let index = 0;
      while (index < position) {
        previous = current as DoublyLinkedNode<T>;
        current = current!.next;
        index++;
      }
      previous!.next = current!.next;
      if (current === this.tail) {
        this.tail = previous;
      } else {
        current!.next!.prev = previous;
      }
    }

    this.count--;
  }

  isEmpty(){
    return this.count === 0;
  }

  size(){
    return this.count;
  }

  toString(){
    let result = ''

    let current = this.head;
    let flag = true
    while (current) {
      result += `${flag ? '' : ','}${current.value}`;
      flag = false
      current = current.next;
    }

    return result
  }
}
```
