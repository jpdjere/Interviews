class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BSTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    let newNode = new Node(val);
    // check if root is null and create it
    if(this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while(true) {
      // Return false if value already exists
      if(newNode.val === current.val) return false;
      // If value to insert is smaller than current node's value
      if(newNode.val < current.val) {
        if(current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if(current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  insertRecursive(current = this.root, val) {
    let newNode = new Node(val);
    if(!current) {
      current = newNode;
      return this;
    }
    if(newNode.val === current.val) return false;
    if(newNode.val < current.val) {
      current.left = this.insertRecursive(current.left, val)
    } else {
      current.right = this.insertRecursive(current.right, val)
    }
    return this;

  }
}

let tree = new BSTree();
console.log(tree)
tree.insert(7)
tree.insert(4)
tree.insert(9)
tree.insert(3)
tree.insert(6)
tree.insert(12)
console.log(tree)
console.log(8, tree.insertRecursive(tree.root, 8))
console.log(8, tree.insertRecursive(tree.root, 8))
console.log(tree)


// que pasa si agrego el 8?
  //     7
  //   4    9
  //  3 6    12

  //     7
  //   4     9
  // 3  6  8   12