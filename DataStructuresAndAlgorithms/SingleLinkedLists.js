class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newTail = new Node(val);
    if(!this.head) {
      this.head = newTail;
      this.tail = newTail;
    } else {
      this.tail.next = newTail;
      this.tail = newTail;
    }
    this.length++;
    return this;
  }

  pop() {
    let current = this.head;
    let newTail = current;
    if(this.length === 0) return null;
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      while(current.next) {
        current = current.next;
        if (current.next) {
          newTail = current;
        }
      }
      newTail.next = null;
      this.tail = newTail;
    }
    this.length--;
    return current;
  }

  unshift(val) {
    let newHead = new Node(val);
    newHead.next = this.head;
    this.head = newHead;
    if(this.length === 0) {
      this.tail = this.head;
    }
    this.length++;
    return this;
  }

  shift() {
    if(this.length === 0) return null;
    let currentHead = this.head;
    let newHead = currentHead.next;
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = newHead;
    }
    this.length--;
    return currentHead;
  }

  get(position) {
    let counter = 0;
    let currentNode = this.head;
    if(position < 0) return null;
    while(currentNode) {
      if(position === counter){
        return currentNode;
      } 
      counter++;
      currentNode = currentNode.next;
    }
    return null;
  }

  set(position, newValue) {
    const node = this.get(position);
    if(node) {
      node.val = newValue;
      return this;
    }
    return false;
  }

  insert(position, value) {
    let newNode = new Node(value);
    if(position === 0) {
      let current = this.head;
      newNode.next = current;
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return this;
    } else {
      let prev = this.get(position - 1);
      let next = this.get(position);
      if(!prev) {
        return false;
      }
      prev.next = newNode;
      newNode.next = next;
      if(position === this.length) {
        this.tail = newNode;
      }
      this.length++;
    }
    return this;

  }

  remove(position) {
    if(position < 0 || position >= this.length || this.length === 0) {
      return false;
    }
    if(position === 0 || position === this.length - 1) {
      this.pop();
      return this;
    }
    let prev = this.get(position - 1);
    let toRemove = prev.next;
    let next = toRemove.next;
    prev.next = next;
    this.length--;
    return this;
  }

  // O(n) time & O(1) space
  reverseIteratively() {
    // Set the node var
    let node = this.head;
    // Swap head and tail
    this.head = this.tail;
    this.tail = node; 

    // Create auxiliary vars
    let prev = null; let next;

    while(node) {
      // Save next before overwriting
      next = node.next;

      // Reverse pointer
      node.next = prev;

      // Step forward in the list;
      prev = node;
      node = next;
    }

    return this;
  }

  // O(n) time & O(n) space
  reverseRecursively(prev = null, current = this.head) {
    // If there are more nodes to reverse, call recursively
    if(current.next) {
      this.reverseRecursively(current, current.next)
    } else {
      // If it's the last node, swap tail and head:
        // The tail will always be the initial head
      this.tail = this.head;
        // The head will now be the last node we go to (i.e., current node, the last one)
      this.head = current;
    }
    // Reverse the direction of arrows in each function call
    // no matter what happened in the above if statement.
    current.next = prev;

    return this;

  }
  

}

//  0        1        2        3
// 20  ->  30  ->   40   ->   50


reverseRecursively(prev = null, curr = this.head) {
  if(curr.next) {
    this.reverseRecursively(curr, curr.next)
  } else {
    // If we reached the final node
      // the new tail will be the old head
      this.tail = this.head;
      this.head = curr;
  }
  // In each function call, reverse the direction
  curr.next = prev;
}

reverseIteratively() {
  // Define a current node
  let node = this.head;
  // Define its previous and next node
  let prev = null;
  let next;
  // Switch head and tail
  this.head = this.tail;
  this.tail = node;
  while(node) {
    // Save next for later step up
    next = node.next;
    // REVERSE POINTER
    node.next = prev;

    // Step up
    prev = node;
    node = next;

  }
  return this;
}

//  0       1        2        3
// 20  ->  30  ->   40   ->   50


const list = new LinkedList();
list.push(30);
list.push(40);
list.push(50);
console.log(list);
console.log(list.pop());
console.log(list);
console.log(list.pop());
console.log(list);
console.log(list.pop());
console.log(list);
console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list);
console.log(list.unshift(40));
console.log(list.unshift(30));
console.log(list.unshift(20));
console.log(list);
console.log(list.shift());
console.log(list);
console.log(list.shift());
console.log(list);
console.log(list.shift());
console.log(list);
console.log(list.shift());
console.log(list);
console.log("-----");
list.push(30);
list.push(40);
list.push(50);
console.log(list);
console.log(list.get(0));
console.log(list.get(2));
console.log("-----");
console.log(list);
console.log(list.set(0, 200));
console.log(list.set(2, 9999));
console.log(list.set("teta", 9999));
console.log(list);
console.log("-----");
console.log(list.insert(2, "teta"));
console.log(list.insert(2, "culo"));
console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list)
console.log(list.insert(0, "1"));
console.log(list.insert(1, "2"));
console.log(list.insert(2, "3"));
console.log("-----");
console.log(list)
console.log(list.reverseIteratively());
console.log(list.reverseRecursively());