/*jshint node:true,laxcomma:true*/
/* global describe, it */
'use strict';
var should = require('should')
  , cXML = require('../')
  , fs = require('fs')
  , path = require('path')
  , assert = require('assert')
  ;

describe('cXML ', function () {
  describe('#0a', function () {
    it('should', function(done) {
      var i = 0, stream = cXML.createStream();
      stream.on('data', function(d) {
        i++;
        if (i === 1) {
          assert.equal(d[0], '/.a/.b');
          assert.equal(d[1], '1');
        }
        else if (i === 2) {
          assert.equal(d[0], '/.a/<b');
          assert.equal(d[1], '2');
        }
      });
      stream.on('end', function() {
        done();
      });
      fs.createReadStream(path.resolve(__dirname, "../dataset/0a.xml")).pipe(stream)
    });
  });
  describe('#0b', function () {
    it('should', function(done) {
      var i = 0, stream = cXML.createStream();
      stream.on('data', function(d) {
        i++;
        if (i === 1) {
          assert.equal(d[0], '/.a/.b');
          assert.equal(d[1], '1');
        }
        else if (i === 2) {
          assert.equal(d[0], '/.a/<b');
          assert.equal(d[1], '2');
        }
        else if (i === 2) {
          assert.equal(d[0], '/.a/<b');
          assert.equal(d[1], '3');
        }

      });
      stream.on('end', function() {
        done();
      });
      fs.createReadStream(path.resolve(__dirname, "../dataset/0b.xml")).pipe(stream)
    });
  });
  describe('#0c', function () {
    it('should', function(done) {
      var i = 0, stream = cXML.createStream();
      stream.on('data', function(d) {
        i++;
        if (i === 1) {
          assert.equal(d[0], '/.a/.b/.c');
          assert.equal(d[1], '1');
        }
        else if (i === 2) {
          assert.equal(d[0], '/.a/.b/<c');
          assert.equal(d[1], '2');
        }
        else if (i === 3) {
          assert.equal(d[0], '/.a/.b/<c');
          assert.equal(d[1], '3');
        }
        else if (i === 4) {
          assert.equal(d[0], '/.a/<b/.c');
          assert.equal(d[1], '4');
        }
      });
      stream.on('end', function() {
        done();
      });
      fs.createReadStream(path.resolve(__dirname, "../dataset/0c.xml")).pipe(stream)
    });
  });
  describe('#1a', function () {
    it('should', function(done) {
      var i = 0, stream = cXML.createStream();
      stream.on('data', function(d) {
        i++;
        if (i === 1) {
          assert.equal(d[0], '/.a/.b');
          assert.equal(d[1], 'x1');
        }
        else if (i === 2) {
          assert.equal(d[0], '/.a/.b/=c');
          assert.equal(d[1], 'x2');
        }
        else if (i === 3) {
          assert.equal(d[0], '/.a/|b');
          assert.equal(d[1], 'x3');
        }
      });
      stream.on('end', function() {
        done();
      });
      fs.createReadStream(path.resolve(__dirname, "../dataset/1a.xml")).pipe(stream)
    });
  });

  describe('#1b', function () {
    it('should', function(done) {
      var i = 0, stream = cXML.createStream();
      stream.on('data', function(d) {
        i++;
        if (i === 1) {
          assert.equal(d[0], '/.a/.b');
          assert.equal(d[1], 'y1');
        }
        else if (i === 2) {
          assert.equal(d[0], '/.a/<b/.c');
          assert.equal(d[1], 'y2');
        }
        else if (i === 3) {
          assert.equal(d[0], '/.a/<b');
          assert.equal(d[1], 'y3');
        }

      });
      stream.on('end', function() {
        done();
      });
      fs.createReadStream(path.resolve(__dirname, "../dataset/1b.xml")).pipe(stream)
    });
  });

  describe('#1c', function () {
    it('should', function(done) {
      var i = 0, stream = cXML.createStream();
      stream.on('data', function(d) {
        i++;
        if (i === 1) {
          assert.equal(d[0], '/.a/.b');
          assert.equal(d[1], 'x1');
        }
        else if (i === 2) {
          assert.equal(d[0], '/.a/.b/=c');
          assert.equal(d[1], 'x2');
        }
        else if (i === 3) {
          assert.equal(d[0], '/.a/|b');
          assert.equal(d[1], 'x3');
        }
        else if (i === 4) {
          assert.equal(d[0], '/.a/<b');
          assert.equal(d[1], 'y1');
        }
        else if (i === 5) {
          assert.equal(d[0], '/.a/<b/.c');
          assert.equal(d[1], 'y2');
        }
        else if (i === 6) {
          assert.equal(d[0], '/.a/<b');
          assert.equal(d[1], 'y3');
        }

      });
      stream.on('end', function() {
        done();
      });
      fs.createReadStream(path.resolve(__dirname, "../dataset/1c.xml")).pipe(stream)
    });
  });

  describe('#2a', function () {
    it('should', function(done) {
      var i = 0, stream = cXML.createStream();
      stream.on('data', function(d) {
        i++;
        if (i === 1) {
          assert.equal(d[0], '/.a/.b/.c/@z');
          assert.equal(d[1], '1');
        }
      });
      stream.on('end', function() {
        done();
      });
      fs.createReadStream(path.resolve(__dirname, "../dataset/2a.xml")).pipe(stream)
    });
  });

  describe('#2b', function () {
    it('should', function(done) {
      var i = 0, stream = cXML.createStream();
      stream.on('data', function(d) {
        i++;
        if (i === 1) {
          assert.equal(d[0], '/.a/.b/.c/@z');
          assert.equal(d[1], '1');
        }
        else if (i === 2) {
          assert.equal(d[0], '/.a/.b/.c');
          assert.equal(d[1], '2');
        }
      });
      stream.on('end', function() {
        done();
      });
      fs.createReadStream(path.resolve(__dirname, "../dataset/2b.xml")).pipe(stream)
    });
  });


   describe('#2c', function () {
    it('should', function(done) {
      var i = 0, stream = cXML.createStream();
      stream.on('data', function(d) {
        i++;
        if (i === 1) {
          assert.equal(d[0], '/.a/.b/.c/@z');
          assert.equal(d[1], '1');
        }
        else if (i === 2) {
          assert.equal(d[0], '/.a/.b/.c');
          assert.equal(d[1], '4');
        }
        else if (i === 3) {
          assert.equal(d[0], '/.a/.b/<c/@z');
          assert.equal(d[1], '2');
        }
        else if (i === 4) {
          assert.equal(d[0], '/.a/.b/<c');
          assert.equal(d[1], '5');
        }
        else if (i === 5) {
          assert.equal(d[0], '/.a/.b/<c/@z');
          assert.equal(d[1], '3');
        }
        else if (i === 5) {
          assert.equal(d[0], '/.a/.b/.c');
          assert.equal(d[1], '3');
        }
      });
      stream.on('end', function() {
        done();
      });
      fs.createReadStream(path.resolve(__dirname, "../dataset/2c.xml")).pipe(stream)
    });
  });

  describe('#2d', function () {
    it('should', function(done) {
      var i = 0, stream = cXML.createStream();
      stream.on('data', function(d) {
        i++;
        if (i === 1) {
          assert.equal(d[0], '/.a/.b/.c/@z');
          assert.equal(d[1], '1');
        }
        else if (i === 2) {
          assert.equal(d[0], '/.a/.b/<c/@z');
          assert.equal(d[1], '2');
        }
        else if (i === 3) {
          assert.equal(d[0], '/.a/.b/<c/@z');
          assert.equal(d[1], '3');
        }
      });
      stream.on('end', function() {
        done();
      });
      fs.createReadStream(path.resolve(__dirname, "../dataset/2d.xml")).pipe(stream)
    });
  });

   describe('#3a', function () {
    it('should', function(done) {
      var i = 0, stream = cXML.createStream();
      stream.on('data', function(d) {
        i++;
        if (i === 1) {
          assert.equal(d[0], '/.a/.b/.c');
          assert.equal(d[1], '1');
        }
        else if (i === 2) {
          assert.equal(d[0], '/.a/.b/.d');
          assert.equal(d[1], '2');
        }
        else if (i === 3) {
          assert.equal(d[0], '/.a/<b/.c');
          assert.equal(d[1], '3');
        }
        else if (i === 4) {
          assert.equal(d[0], '/.a/.b/.d');
          assert.equal(d[1], '4');
        }
      });
      stream.on('end', function() {
        done();
      });
      fs.createReadStream(path.resolve(__dirname, "../dataset/3a.xml")).pipe(stream)
    });
  });



});
