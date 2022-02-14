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
/**
 * ❑ push(element)：向链表尾部添加一个新元素。
 * ❑ insert(element, position)：向链表的特定位置插入一个新元素。
 * ❑ getElementAt(index)：返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回undefined。
 * ❑ remove(element)：从链表中移除一个元素。
 * ❑ indexOf(element)：返回元素在链表中的索引。如果链表中没有该元素则返回-1。
 * ❑ removeAt(position)：从链表的特定位置移除一个元素。
 * ❑ isEmpty()：如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。
 * ❑ size()：返回链表包含的元素个数，与数组的length属性类似。
 * ❑ toString()：返回表示整个链表的字符串。由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值。
 */
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
    console.log(result)
    return result

  }
}

const doublyLinkedList = new DoublydoublyLinkedList()

console.log(doublyLinkedList.isEmpty())
doublyLinkedList.push('a')
doublyLinkedList.push('b')
console.log(doublyLinkedList.isEmpty())
doublyLinkedList.toString()
doublyLinkedList.insert('c',0)
doublyLinkedList.toString()
console.log(doublyLinkedList.indexOf('a'))
console.log(doublyLinkedList.getElementAt(2))
console.log(doublyLinkedList.size())
doublyLinkedList.remove('a')
doublyLinkedList.toString()
doublyLinkedList.removeAt(1)
doublyLinkedList.toString()
