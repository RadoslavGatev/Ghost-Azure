# compare-version

> Compares two software version numbers (only number)

-------

This code just uses Array.shift and recursive, which means that it can run in IE 6+.

## Install

```bash
$ npm install --save compare-ver
```


## version rules

```
{num}.{num}. …… {num}.{num}
```

*e.g:*
```
"1.7" < "1.7.1" < "1.7.10" < "1.7.10.01" < "1.7.0.10.010"
"1.0" < "1.0.1" < "2.0" < "2.0.0.1" < "2.0.1"
"1.0.0.0" < "1.0.1.0" < "2.0.0.0" < "2.0.0.1" < "2.0.1.0"
```

## Usage

### compareVer.gt(stringA,stringB)
Return number 1 0 -1 -2 -3 -100

- if stringA  <  stringB then return -1
- if stringA === stringB then return 0
- if stringA  >  stringB then return 1
- if input error value then return < -1

### compareVer.lt(stringA,stringB)
Return number 1 0 -1 -2 -3 -100

- if stringA  <  stringB then return 1
- if stringA === stringB then return 0
- if stringA  >  stringB then return -1
- if input error value then return < -1

```js
var compareVer = require('compare-ver');

//gt
console.log(compareVer.gt("0.0.2","0.0.1")); //1
console.log(compareVer.gt("0.9.1","0.9.1")); //0

//lt
console.log(compareVer.lt("0.0.2","0.0.1")); //-1
console.log(compareVer.lt("0.9.1","0.9.1")); //0

//clean
console.log(compareVer.clean(['1.1.b','1.0.1',12121])); //['1.0.1']

var arr = ["1.7.0","1.7","1.ab.8","1.70.0","1.90","1.9.0","1.8"];
compareVer.sort(arr); //->["1.7","1.7.0","1.8","1.9.0","1.70.0","1.90"]
compareVer.max(arr); //->"1.90"
compareVer.min(arr); //->"1.7"
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © [lmtdit](https://github.com/lmtdit)

## End.
