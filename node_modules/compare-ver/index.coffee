###!
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
###
((root, factory)->
    if typeof exports == 'object'
        module.exports = factory()

    else if typeof define == 'function' && define.amd
        define(factory)
    else
        root.compareVer = factory()
)(this, ->
    'use strict'
    VER_RE = /(\d+\.){1,9}\d+/
    _compare = (newVer,oldVer)->
        # if arguments.length != 2
        #   return -100
        if typeof newVer + typeof oldVer != 'stringstring'
            return -2
        newMatch = newVer.match(VER_RE)
        oldMatch = oldVer.match(VER_RE)
        if (not newMatch or newMatch[0] != newVer) or (not oldMatch or oldMatch[0] != oldVer)
            return -3
        newVer = newVer.replace(/^0/,'')
        oldVer = oldVer.replace(/^0/,'')

        if newVer == oldVer
            return 0
        else
            newArr = newVer.split('.')
            oldArr = oldVer.split('.')
            newLen = newArr.length
            oldLen = oldArr.length
            maxLen = Math.max(newLen,oldLen)
            zerofill = ->
                newArr.length < maxLen && newArr.push('0')
                oldArr.length < maxLen && oldArr.push('0')
                newArr.length != oldArr.length && zerofill()
            newLen != oldLen && zerofill()
            if newArr.toString() == oldArr.toString()
                return if newLen > oldLen then 1 else -1
            else
                isTrue = null
                compareNum = ->
                    newNum = newArr.shift()
                    oldNum = oldArr.shift()
                    _newNum = ~~newNum
                    _oldNum = ~~oldNum
                    if _newNum == 0 and _oldNum == 0
                        isTrue = 0
                    else if _newNum > _oldNum
                        isTrue = 1
                    else if _newNum < _oldNum
                        isTrue = -1
                    else
                        isTrue = if newNum.length > oldNum.length then  -1 else 1
                    _newNum == _oldNum && newArr.length > 0 && compareNum()
                compareNum()
                return isTrue

    _compareVer = {
        gt: ->
            if arguments.length == 2
                return _compare(arguments[0],arguments[1])
            return -100
        lt: ->
            if arguments.length == 2
                return _compare(arguments[1],arguments[0])
            return -100
        clean: ->
            if arguments.length == 0
                return false
            tempArr = arguments[0]
            len = tempArr.length
            if len < 1
                return []
            else
                _newArr = []
                _clean = ->
                    _num = tempArr.shift()
                    if typeof _num == 'string'
                        _match = _num.match(VER_RE)
                        _match && _match[0] == _num && _newArr.push _num
                    tempArr.length > 0 && _clean()
                _clean()
                return _newArr
        sort: ->
            if arguments.length == 0
                return false
            tempArr = @clean(arguments[0])
            if tempArr.length <= 1
                return tempArr
            else
                return tempArr.sort (a,b)->
                    return _compare(a,b) == 1
        max: ->
            if arguments.length == 0
                return false
            tempArr = arguments[0]
            if tempArr.length == 0
                return false
            else
                tempArr = @clean(tempArr)
                if tempArr.length == 0
                     return false
                else
                    arr = @sort(tempArr)
                    return arr[arr.length - 1]
        min: ->
            if arguments.length == 0
                return false
            tempArr = arguments[0]
            if tempArr.length == 0
                return false
            else
                tempArr = @clean(tempArr)
                if tempArr.length == 0
                     return false
                else
                    return @sort(tempArr)[0]

    }
    return _compareVer
)
