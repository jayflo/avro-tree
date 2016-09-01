'use strict';

var TREE_INTERNAL = '__tree__';

module.exports = Object.freeze({
  Tree: Tree
});

function Tree(parent, children) {
  Object.defineProperty(this, TREE_INTERNAL, {
    value: {
      parent: parent,
      children: [].concat(children || [])
    }
  });
}

Object.defineProperties(Tree.prototype, {
  setParent: {value: setParent},
  setChildren: {value: setChildren},
  addChild: {value: addChild},
  parent: {value: parent},
  children: {value: children}
});

function treeFactory(parent, children) {
  return new Tree(parent, children);
}

function internal(tree) {
  return tree.[TREE_INTERNAL];
}

function setParent(p) {
  internal(this).parent = p;
  return this;
}

function setChildren(c) {
  internal(this).children = c;
  return this;
}

function addChild(c) {
  internal(this).children.push(c);
  return this;
}

function parent() {
  return internal(this).parent;
}

function children() {
  return internal(this).children;
}
