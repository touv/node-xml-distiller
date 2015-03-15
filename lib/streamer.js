'use strict';
var Writable = require('stream').Writable;
var debug = function() {};


function  Streamer (options) {

  Writable.call(this);

  options = options || {};
  options.specialChar = options.specialChar || '$';
  var self = this;
  var CC = {
    "normal" : function () { return "/."; },
    "newone" : function () { return "/<"; },
    "inside" : function () { return "/="; },
    "inline" : function () { return "/|"; },
    "attr" : function () { return "/@"; },
    "comment" : function () { return "/#"; }
  }

  function normalize (x) {
    return x.replace(CC.newone(), CC.normal());
  }
  var depth = 0, stack = [], open = false;

  function cvalue(v) {
    var val = [stack.join(''), v];
    debug('cvalue', v, stack);
    self.emit('data', val);
    stack = stack.map(normalize);
  }



  self.saxStream = require("sax").createStream(true, {trim : true, xmlns : false, position: false})
  self.saxStream.on("opentag", function (node) {
    var oldname = stack[depth];
    debug('opentag(1)', depth, stack, oldname);
    stack = stack.slice(0, depth);
    ++depth;
    if (oldname && oldname.slice(2) === node.name) {
      stack.push(oldname)
    }
    else {
      var cc = open ? CC.inside() : CC.newone()
      stack.push(cc + node.name);
    }
    debug('opentag(2)', depth, stack);
    Object.keys(node.attributes).forEach(function(key) {
      stack.push(CC.attr() + key);
      cvalue(node.attributes[key]);
      stack.pop();
    });
    // if (node.isSelfClosing === true) {
    // --depth;
    // }
  });
  self.saxStream.on("text", function (value) {
    open = true;
    cvalue(value);
  });
  self.saxStream.on("closetag", function (name) {
    debug('closetag(1)', depth, stack);
    --depth;
    open = false;
    debug('>>>>', stack[depth].slice(0, 2));
    if (stack[depth].slice(0, 2) == CC.inside()) {
      stack.pop();
      stack[stack.length-1] = CC.inline() + stack[stack.length-1].slice(2)
    }
    else {
      stack[depth] = CC.newone() + stack[depth].slice(2)
    }
    debug('closetag(2)', depth, stack);
  });
  self.saxStream.on("comment", function (value) {
    self.emit('data', ['#', value]);
  });
  self.saxStream.on("opencdata", function (node) {
  });
  self.saxStream.on("cdata", function (value) {
    cvalue(value);
  });
  self.saxStream.on("closecdata", function () {
  });
  self.saxStream.on("error", function (e) {
    // an error happened.
    console.error('error', e);
    // clear the error
    this._parser.error = null
    this._parser.resume()
  });
  self.saxStream.on("end", function () {
    self.emit("end");
  });

}

// Inherit from base stream class.
require('util').inherits(Streamer, Writable);


Streamer.prototype._write = function (chunk, encoding, done) {
  if (this.saxStream.write(chunk, encoding)) {
    done();
  }
}

module.exports = Streamer;
