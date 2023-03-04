
/*!
 * Compares two software version numbers (only number)
 *
 * @parse String newVer (e.g. "1.7.1" or "1.2.1").
 * @parse String oldVer (e.g. "1.7.1" or "1.2.1").
 * @return Object {
 *       gt:
 *          <,return -1
 *          =,return 0
 *          >,return 1
 *          error, return < -1
 *
 *      lt:
 *          <,return 1
 *          =,return 0
 *          >,return -1
 *          error, return < -1
 *
 *      clean:
 *          ['dfdsfd','1.0.1']      -> ['1.0.1']
 *          ['1.1.b','1.0.1']       -> ['1.0.1']
 *          ['1.1.b','1.0.1',12121] -> ['1.0.1']
 *
 *      sort:
 *          ["1.7.0","1.7","1.ab.8","1.70.0","1.90","1.9.0","1.8"]  ->
 *          ["1.7","1.7.0","1.8","1.9.0","1.70.0","1.90"]
 *
 *      max:
 *          ["1.7.0","1.7","1.ab.8","1.70.0","1.90","1.9.0","1.8"]  ->
 *          return "1.90"
 *
 *      min:
 *          ["1.7.0","1.7","1.ab.8","1.70.0","1.90","1.9.0","1.8"]  ->
 *          return "1.7"
 *
 *  }
 */
(function(root, factory) {
  if (typeof exports === 'object') {
    return module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    return define(factory);
  } else {
    return root.compareVer = factory();
  }
})(this, function() {
  'use strict';
  var VER_RE, _compare, _compareVer;
  VER_RE = /(\d+\.){1,9}\d+/;
  _compare = function(newVer, oldVer) {
    var compareNum, isTrue, maxLen, newArr, newLen, newMatch, oldArr, oldLen, oldMatch, zerofill;
    if (typeof newVer + typeof oldVer !== 'stringstring') {
      return -2;
    }
    newMatch = newVer.match(VER_RE);
    oldMatch = oldVer.match(VER_RE);
    if ((!newMatch || newMatch[0] !== newVer) || (!oldMatch || oldMatch[0] !== oldVer)) {
      return -3;
    }
    newVer = newVer.replace(/^0/, '');
    oldVer = oldVer.replace(/^0/, '');
    if (newVer === oldVer) {
      return 0;
    } else {
      newArr = newVer.split('.');
      oldArr = oldVer.split('.');
      newLen = newArr.length;
      oldLen = oldArr.length;
      maxLen = Math.max(newLen, oldLen);
      zerofill = function() {
        newArr.length < maxLen && newArr.push('0');
        oldArr.length < maxLen && oldArr.push('0');
        return newArr.length !== oldArr.length && zerofill();
      };
      newLen !== oldLen && zerofill();
      if (newArr.toString() === oldArr.toString()) {
        if (newLen > oldLen) {
          return 1;
        } else {
          return -1;
        }
      } else {
        isTrue = null;
        compareNum = function() {
          var newNum, oldNum, _newNum, _oldNum;
          newNum = newArr.shift();
          oldNum = oldArr.shift();
          _newNum = ~~newNum;
          _oldNum = ~~oldNum;
          if (_newNum === 0 && _oldNum === 0) {
            isTrue = 0;
          } else if (_newNum > _oldNum) {
            isTrue = 1;
          } else if (_newNum < _oldNum) {
            isTrue = -1;
          } else {
            isTrue = newNum.length > oldNum.length ? -1 : 1;
          }
          return _newNum === _oldNum && newArr.length > 0 && compareNum();
        };
        compareNum();
        return isTrue;
      }
    }
  };
  _compareVer = {
    gt: function() {
      if (arguments.length === 2) {
        return _compare(arguments[0], arguments[1]);
      }
      return -100;
    },
    lt: function() {
      if (arguments.length === 2) {
        return _compare(arguments[1], arguments[0]);
      }
      return -100;
    },
    clean: function() {
      var len, tempArr, _clean, _newArr;
      if (arguments.length === 0) {
        return false;
      }
      tempArr = arguments[0];
      len = tempArr.length;
      if (len < 1) {
        return [];
      } else {
        _newArr = [];
        _clean = function() {
          var _match, _num;
          _num = tempArr.shift();
          if (typeof _num === 'string') {
            _match = _num.match(VER_RE);
            _match && _match[0] === _num && _newArr.push(_num);
          }
          return tempArr.length > 0 && _clean();
        };
        _clean();
        return _newArr;
      }
    },
    sort: function() {
      var tempArr;
      if (arguments.length === 0) {
        return false;
      }
      tempArr = this.clean(arguments[0]);
      if (tempArr.length <= 1) {
        return tempArr;
      } else {
        return tempArr.sort(function(a, b) {
          return _compare(a, b) === 1;
        });
      }
    },
    max: function() {
      var arr, tempArr;
      if (arguments.length === 0) {
        return false;
      }
      tempArr = arguments[0];
      if (tempArr.length === 0) {
        return false;
      } else {
        tempArr = this.clean(tempArr);
        if (tempArr.length === 0) {
          return false;
        } else {
          arr = this.sort(tempArr);
          return arr[arr.length - 1];
        }
      }
    },
    min: function() {
      var tempArr;
      if (arguments.length === 0) {
        return false;
      }
      tempArr = arguments[0];
      if (tempArr.length === 0) {
        return false;
      } else {
        tempArr = this.clean(tempArr);
        if (tempArr.length === 0) {
          return false;
        } else {
          return this.sort(tempArr)[0];
        }
      }
    }
  };
  return _compareVer;
});
