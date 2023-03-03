# ee-argv

A simple and fast commandline arguments parser

## installation

	npm install ee-argv


## build status

[![Build Status](https://travis-ci.org/eventEmitter/ee-argv.png?branch=master)](https://travis-ci.org/eventEmitter/ee-arguments)


## usage

You may start your node app using arguments using one of the formats described below:

- --key=value
- --key or
- --key value
	

	// node . --port=2345 --trace-http-request --debug sql queries

	var argv = require( "ee-argv" );

	argv.has( "trace-http-request" );  	// true
	argv.get( "port" ); 				// "2345"
	argv.has( "port" ); 				// true
	argv.get( "debug" ); 				// sql queries

