/*
* ❑ insert(key)：向树中插入一个新的键。
* ❑ search(key)：在树中查找一个键。如果节点存在，则返回true；如果不存在，则返回false。
* ❑ inOrderTraverse()：通过中序遍历方式遍历所有节点。
* ❑ preOrderTraverse()：通过先序遍历方式遍历所有节点。
* ❑ postOrderTraverse()：通过后序遍历方式遍历所有节点。
* ❑ min()：返回树中最小的值/键。
* ❑ max()：返回树中最大的值/键。
* ❑ remove(key)：从树中移除某个键。
*
*  */

class BinaryTreeNode<T> {
  key: T;
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;

  constructor(key: T) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree<T> {
  root: BinaryTreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(key:T){
    if (this.root === null) {
      this.root = new BinaryTreeNode(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  insertNode(node: BinaryTreeNode<T>, key:T){
    if (node.key > key) {
      if (node.left === null) {
        node.left = new BinaryTreeNode(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right === null) {
        node.right = new BinaryTreeNode(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  inOrderTraverse(callback: (key: T) => void) {
    this.inOrderTraverseNode(this.root, callback);
  }

  inOrderTraverseNode(node:BinaryTreeNode<T> | null, callback: (key: T) => void){
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  preOrderTraverse(callback: (key: T) => void) {
    this.preOrderTraverseNode(this.root, callback);
  }

  preOrderTraverseNode(node:BinaryTreeNode<T> | null, callback: (key: T) => void){
    if (node !== null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  postOrderTraverse(callback: (key: T) => void) {
    this.postOrderTraverseNode(this.root, callback);
  }

  postOrderTraverseNode(node:BinaryTreeNode<T> | null, callback: (key: T) => void){
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  min() {
    return this.minNode(this.root);
  }

  minNode(node: BinaryTreeNode<T> | null) {
    if (node) {
      let current = node;
      while (current.left !== null && current.left !== null) {
        current = current.left;
      }
      return current.key;
    }
    return null;
  }

  max() {
    return this.maxNode(this.root);
  }

  maxNode(node: BinaryTreeNode<T> | null) {
    if (node) {
      let current = node;
      while (current.right !== null && current.right !== null) {
        current = current.right;
      }
      return current.key;
    }
    return null;
  }

  search(key: T) {
    return this.searchNode(this.root, key);
  }

  searchNode(node: BinaryTreeNode<T> | null, key: T) : boolean {
    if (node === null) {
      return false;
    }
    if (node.key === key) {
      return true;
    } else if (node.key > key) {
      return this.searchNode(node.left, key);
    } else {
      return this.searchNode(node.right, key);
    }
  }

}

const tree = new BinarySearchTree<number>();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(13);
tree.insert(17);
tree.insert(1);
tree.postOrderTraverse((key)=>{ console.log(key) });

