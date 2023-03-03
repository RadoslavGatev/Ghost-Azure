# leaky-bucket

A fast and efficient leaky bucket implementation

This module uses [semantic versioning](http://semver.org/)

## installation

    npm i leaky-bucket

## build status

[![Build Status](https://travis-ci.org/eventEmitter/leaky-bucket.png?branch=master)](https://travis-ci.org/eventEmitter/leaky-bucket)


## usage

    var LeakyBucket = require('leaky-bucket');


### Constructor

The constructor accepts three parameters, all are optional

    var instance = new LeakyBucket([capacity = 60]
                                   [, Interval = 60]
                                   [, maxWaitingTime = 300]);


Create a new leaky bucket which is allowed to execute 120 items per minute

    var bucket = new LeakyBucket(120);


Create a new leaky bucket which is allowed to execute 200 items every 30 seconds

    var bucket = new LeakyBucket(200, 30);


Create a new leaky bucket which is allowed to execute 200 items every 30 seconds with a maxWaitingTime of 60 seconds

    var bucket = new LeakyBucket(200, 30, 60);


You may also use an options object instead of the parameters

    var bucket = new LeakyBucket({
          capacity: 200         // items per interval, defaults to 60
        , interval: 30          // seconds, defaults to 60
        , maxWaitingTime: 60    // seconds, defaults to 300
    });



### Throttling

The throttle accepts two parameters, of which both are optional

- The first parameter can either be a callback function or the cost of the operation
- The second parameter can be the callback function

If you do not pass a callback a promise is returned. The first argument of the callback is an error object (or the promise fails) if the item could not be executed because the max waiting time was exceeded.


    bucktet.throttle([cost], callback);

The cost parameter can be used to let items cost more than other. The cost of one item defaults to 1. If you execute an item with the cost of 2 it will use 2 slots instead of one.


Throttle an item

    bucket.throttle(function(err) {
        // do something
    });


Throttle an item with the cost of 10

    bucket.throttle(10, function(err) {
        // do something
    });


Throttle an using Promises

    bucket.throttle().then(function() {
        // ok, do your stuff ...
    }).catch(function(err) {
        // max waiting time exceeded, dont execute anything
    });


### Pausing the leaky bucket

You may pause the leaky bucket for any reason, this will remove items from the end if the wont be executed in time anymore.


Pause the bucket for 5 seconds

    bucket.pause(5);


### Re-adding items

You may want to re-add items the first position (next item to be executed). No support for promises here.


    bucket.reAdd(cost, callback);


### Removing left credits

If you dont know how much an item costs in advance you may remove the cost afterwards using the pay method.

    let limitReached = bucket.pay(345);


### Getting information from the bucket

By calling the getInfo method the bucket returns information about its internals

    bucket.getInfo();

    {
          left: 100
        , interval: 60
        , capacity: 100
    }

## Flags

You may start your app using the debug-leaky-bucket flag, this will enable logging for the module

    node . --debug-leaky-bucket


## Examples

Rate limit API calls on the client side, allowed are no more than 60 requests per minute

    var   LeakyBucket = require('leaky-bucket')
        , request     = require('request')
        , bucket;


    // create bucket instance, 60 request per minute
    bucket = new LeakyBucket(60);


    // this will throttle request if required
    bucket.throttle(function() {

        // execute request using the request module
        request({
              method: 'get'
            , url: 'http://awesome.api/win'
        }, function(err, response, body) {

        });
    });




Rate limit API calls on the server side, allowed are no more than 60 requests per minute

    var   LeakyBucket = require('leaky-bucket')
        , request     = require('request')
        , bucket;


    // create bucket instance, 60 request per minute, max waiting time = 0
    bucket = new LeakyBucket(60, 60, 0);


    // this lets pass all request that are within the limit and fail all that
    // exceed it
    bucket.throttle(function(err) {
        if (err) response.send(429, 'too many requests!');
        else response.send(200, '{id:4, ...}')
    });
