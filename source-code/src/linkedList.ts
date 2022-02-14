class LinkedListNode<T> {
  element: T;
  next: LinkedListNode<T> | null = null;

  constructor(element: T) {
    this.element = element;
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

class LinkedList<T> {
  head: LinkedListNode<T> | null = null;
  count = 0;

  push(element: T) {
    const node = new LinkedListNode(element);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  insert(element: T, position: number) {
    if (position < 0 || position > this.count) {
      throw new Error("Position is out of the list");
    }

    const node = new LinkedListNode(element);

    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      if (!this.head) {
        this.head = node;
      } else {
        let current: LinkedListNode<T> | null = this.head;
        let previous = this.head;
        let index = 0;
        while (index < position) {
          previous = current as LinkedListNode<T>;
          current = current?.next || null;
          index++;
        }
        previous.next = node;
        node.next = current;
      }
    }
    this.count++;
  }

  getElementAt(index: number) {
    if (index < 0 || index >= this.count) {
      throw new Error("Position is out of the list");
    }
    let current = this.head;
    let indexCount = 0;
    while (current) {
      if (indexCount === index) {
        return current.element;
      }
      current = current.next;
      indexCount++;
    }
  }

  remove(element:T){
    if (!this.head) {
      return;
    }
    let current: LinkedListNode<T> | null = this.head;
    let previous = this.head;
    while (current) {
      if (current.element === element) {
        if (current === this.head) {
          this.head = this.head?.next;
        } else {
          previous.next = current.next;
        }
        this.count--;
        return;
      }
      previous = current;
      current = current.next;
    }
  }

  indexOf(element:T){
    if (!this.head) {
      return -1;
    }
    let current: LinkedListNode<T> | null = this.head;
    let index = 0;
    while (current) {
      if (current.element === element) {
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
    if (!this.head) {
      return;
    }
    let current: LinkedListNode<T> | null = this.head;
    let previous = this.head;
    let index = 0;
    while (current) {
      if (index === position) {
        if (current === this.head) {
          this.head = this.head?.next;
        } else {
          previous.next = current.next;
        }
        this.count--;
        return;
      }
      previous = current;
      current = current.next;
      index++;
    }
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
      result += `${flag ? '' : ','}${current.element}`;
      flag = false
      current = current.next;
    }
    console.log(result)
    return result

  }
}

// const linkedList = new LinkedList()
//
// console.log(linkedList.isEmpty())
// linkedList.push('a')
// linkedList.push('b')
// console.log(linkedList.isEmpty())
// linkedList.toString()
// linkedList.insert('c',0)
// linkedList.toString()
// console.log(linkedList.indexOf('ac'))
// console.log(linkedList.getElementAt(2))
// console.log(linkedList.size())
// linkedList.remove('c')
// linkedList.toString()
// linkedList.removeAt(0)
// linkedList.toString()
