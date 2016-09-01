'use strict';

var test = require('tape');

var AvroTree = require('../lib/avroTree').AvroTree;

function treeFactory(parent, children, data) {
  return new AvroTree(parent, children, data);
}

test('AvroTree constructor', function(t) {});
