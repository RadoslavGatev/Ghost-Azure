# ee-log

colorful, nice formatted logs for node.js

ATTENTION: this library should only be used when developing - it makes use of the sysnchronous logging funtionality ( like console.log itself ). you should never use synchronous logging in a live environment, it will slow down your application heavily! The library will be updated soon with asynchronous logging support for live applicaions.

## installation

	npm install ee-log

## build status

[![Build Status](https://travis-ci.org/eventEmitter/ee-log.png?branch=master)](https://travis-ci.org/eventEmitter/ee-log)


## usage

    var log = require( "ee-log" );


### debug

prints grey text

    log.debug( "debug %s ==> %s", 1, new Buffer( "whoa!" ), { go: "is a cool language!"} );

    // output: 
    22 13:06:34.935 > test.js:6, Object.<anonymous>                 >>> debug 1 ==> 77 68 6f 61 21 
	{
	    go: "is a cool language!"
	}




### info

prints white text

	log.info( "info" );

	// output
	22 13:06:34.939 > test.js:7, Object.<anonymous>                 >>> info




### warn

prints yellow text

	log.warn( "warn", new Date(), 455 );

	// output 
	22 13:06:34.940 > test.js:8, Object.<anonymous>                 >>> warn, 2013-08-22T11:06:34.939Z, 455





### error

prints red text

	log.error( "error", { "test": 3 } );

	// output
	22 13:06:34.940 > test.js:9, Object.<anonymous>                 >>> error





### highlight

prints cyan text

	log.highlight( "highlight" );

	// output
	22 13:06:34.940 > test.js:10, Object.<anonymous>                >>> highlight





### dir

prints the items passed to it

	log.dir( { hi: 1 } );

	// output
	22 13:16:32.207 > test.js:11, Object.<anonymous>                >>> Dir
	{
	    hi: 1
	}




### trace

prints a colorful error stack trace
	
	log.trace( new Error( "testing the sh*t" ) );

	// output
	22 13:30:48.899 > /test.js:12, Object.<anonymous>                >>> Trace
	--------------------------------------------------------------------------------
	Error: testing the sh*t
	--------------------------------------------------------------------------------
	                      /test.js   12:13  Object.<anonymous>
	                     module.js  456:26  Module._compile
	                     module.js  474:10  Object.Module._extensions..js
	                     module.js  356:32  Module.load
	                     module.js  312:12  Function.Module._load
	                     module.js  497:10  Function.Module.runMain
	                       node.js  119:16  startup
	                       node.js  901:3   
	--------------------------------------------------------------------------------


### log method

prints whatever comes, uses log.info for text types

	log( 2, "er %s:%s", 22, new Error( "whoa!" ), "hui", new Error( "" ), new Buffer(22) );

	// output
	23 14:53:15.480 > /test.js 16:2, Object.<anonymous>               >>> 2
	23 14:53:15.480 > /test.js 16:2, Object.<anonymous>               >>> er 22:Error: whoa!
	23 14:53:15.480 > /test.js 16:2, Object.<anonymous>               >>> hui
	23 14:53:15.482 > /test.js 16:2, Object.<anonymous>               >>> [Trace]
	--------------------------------------------------------------------------------
	Error: -
	--------------------------------------------------------------------------------
	                      /test.js   16:55  Object.<anonymous>
	                     module.js  456:26  Module._compile
	                     module.js  474:10  Object.Module._extensions..js
	                     module.js  356:32  Module.load
	                     module.js  312:12  Function.Module._load
	                     module.js  497:10  Function.Module.runMain
	                       node.js  119:16  startup
	                       node.js  901:3   
	--------------------------------------------------------------------------------
	23 14:53:15.482 > /test.js 16:2, Object.<anonymous>               >>> 70 ab ac 0 0 0 0 0 3a 0 0 0 3b 0 0 0 f0 34 72 1 0 0 



### disable logging inside one module
	
	// call this from inside your module, no logs will be displayed anymore
	log.disable();

	// enable logging again
	log.enable();
