const { readFile } = require('fs');
const Node = require('../Btree/Nodos');
const { Console } = require('console');
class BTree {
  constructor(order) {
    this.root = null; // Inicialmente, el árbol está vacío
    this.order = order; // Almacena el orden del árbol
  }

  insert(key) {
    if (this.root === null) {
      this.root = new Node([key], []);
    } else {
      this._insert(key, this.root);
    }
  }

  _insert(key, node) {
    if (node.keys.length < this.order - 1) {
      this._insertKey(key, node);
    } else {
      const medianIndex = Math.floor((this.order - 1) / 2);
      const median = node.keys[medianIndex];
      const leftKeys = node.keys.slice(0, medianIndex);
      const rightKeys = node.keys.slice(medianIndex + 1);
      const leftChildren = node.children.slice(0, medianIndex + 1);
      const rightChildren = node.children.slice(medianIndex + 1);
      const newNode = new Node([median], [
        new Node(leftKeys, leftChildren),
        new Node(rightKeys, rightChildren)
      ]);
      if (key < median) {
        this._insert(key, newNode.children[0]);
      } else {
        this._insert(key, newNode.children[1]);
      }
      this.root = newNode;
    }
  }

  _insertKey(key, node) {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }
    node.keys = [
      ...node.keys.slice(0, i),
      key,
      ...node.keys.slice(i)
    ];
    node.children = [
      ...node.children.slice(0, i + 1),
      new Node([], []),
      ...node.children.slice(i + 1)
    ];
  }

  search(key) {
    return this._search(key, this.root);
  }

  _search(key, node) {
    if (node === null || node == undefined ) {
      Console.log("No existe");
      return false;
    }
    let i = 0;
    while (i < node.keys.length && key != node.keys[i]["key"]) {
      i++;
    }
    if (i < node.keys.length && key === node.keys[i]["key"]) {
      Console.log(node.keys[i]["value"]);
      return true;
    }
    return this._search(key, node.children[i]);
  }

  delete(key) {
    if (this.root === null || this.root == undefined ) {
      return;
    } else {
      this._delete(key, this.root);
    }
  }

  _delete(key, node) {
    let i = 0;
    if(node != undefined){
      while (i < node.keys.length && key > node.keys[i]) {
        i++;
      }
      if (i < node.keys.length && key === node.keys[i]) {
        if (node.children[i].keys.length >= this.order) {
          const predecessor = this._getPredecessor(node.children[i]);
          node.keys[i] = predecessor;
          this._delete(predecessor, node.children[i]);
        } else if (node.children[i + 1].keys.length >= this.order) {
          const successor = this._getSuccessor(node.children[i + 1]);
          node.keys[i] = successor;
          this._delete(successor, node.children[i + 1]);
        } else {
          this._merge(node, i);
          this._delete(key, node.children[i]);
        }
      } else {
        this._delete(key, node.children[i]);
      }
    }
  }
  
  patch(key, newvalue) {
    return this._patch(key, this.root, newvalue);
  }

  _patch(key, node, newvalue){
    if (node === null || node == undefined ) {
      return false;
    }
    let i = 0;
    while (i < node.keys.length && key != node.keys[i]["key"]) {
      i++;
    }
    if (i < node.keys.length && key === node.keys[i]["key"]) {
        
        const newdata = newvalue;
        for (const key in newdata) {
          if (newdata.hasOwnProperty(key)) {
            node.keys[i]["value"][key] = newdata[key];
          }
        }
      return true;
    }
    return this._patch(key, node.children[i], newvalue);
  }
  
  view(){
    return this._view(this.root);
  }
  _view(node){
    let i = 0;
    while (i < node.keys.length) {
      i++;
      console.log("DATOS FINALES", node.keys[i]["value"]);
    }
  }
}

module.exports = BTree;
