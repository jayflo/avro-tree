'use strict';

var Tree = require('./tree').Tree;

var FROZEN_PROPERTIES = [];
var FROZEN_PROPERTIES_SET = Object.freeze(
  FROZEN_PROPERTIES.reduce(function(result, key) {
    result[key] = true;
    return result;
  }, {})
);

module.exports = Object.freeze({
  AvroTree: AvroTree
});

function AvroTree(parent, children, typeInfo) {
  Tree.call(this, parent, children);
  assignFrozen(this, FROZEN_PROPERTIES, typeInfo);
}

AvroTree.prototype = Object.create(Tree.prototype);

Object.defineProperties(AvroTree.prototype, {
  clone: {value: clone}
});

function avroTreeFactory(parent, children, typeInfo) {
  return new AvroTree(parent, children, typeInfo);
}

function assignFrozen(dest, keys, source) {
  Object.defineProperties(dest,
    keys.reduce(function(result, key) {
      result[key] = {value: source[key], enumerable: true};
      return result;
    }, {})
  );
}

function clone() {
  var avroTreeClone = treeFactory(
    this.parent(), this.children().slice(0), this
  );

  Object.keys(this)
  .filter(function(key) { return !FROZEN_PROPERTIES_SET[key]; })
  .forEach(function(key) {
    avroTreeClone[key] = this[key];
  }, this)

  return avroTreeClone;
}
