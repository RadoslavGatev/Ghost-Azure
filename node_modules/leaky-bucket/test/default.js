
    Error.stackTraceLimit = Infinity;

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , assert        = require('assert');


   // process.env['debug-leaky-bucket'] = true;

    var   LeakyBucket = require('../');


    



    describe('The LeakyBucket', function(){
        it('should not crash', function(){
            new LeakyBucket();
        });


        it('should execute all items immediately if there is enough capacity', function(done) {
            var   start         = Date.now()
                , executed      = 0
                , maxTime       = 900
                , minTime       = 0
                , capacity      = 10
                , items         = 10
                , iterator      = items
                , cb, bucket;


            cb = function() {
                var duration;

                if (++executed === items) {
                    duration = Date.now()-start;

                    assert(duration>=minTime, '');
                    assert(duration<maxTime);

                    done();
                }
            }


            bucket = new LeakyBucket(capacity);

            while(iterator--) bucket.throttle(cb);
        });




        it('should not execute all items immediately if there is not enough capacity I', function(done) {
            var   start         = Date.now()
                , executed      = 0
                , maxTime       = 12500
                , minTime       = 12000
                , capacity      = 10
                , items         = 12
                , iterator      = items
                , cb, bucket;


            // wait for the bucket
            this.timeout(15000);


            cb = function() {
                var duration;

                if (++executed === items) {
                    duration = Date.now()-start;

                    assert(duration>=minTime, 'The leaky bucket finished too soon ('+duration+' < '+minTime+') ...');
                    assert(duration<maxTime, 'The leaky bucket finished too late ('+duration+' >'+maxTime+') ...');

                    done();
                }
            }


            bucket = new LeakyBucket(capacity);

            while(iterator--) bucket.throttle(cb);
        });




        it('should not execute all items immediately if there is not enough capacity II', function(done) {
            var   start         = Date.now()
                , executed      = 0
                , maxTime       = 10500
                , minTime       = 9500
                , capacity      = 60
                , items         = 70
                , iterator      = items
                , cb, bucket;


            // wait for the bucket
            this.timeout(15000);


            cb = function() {
                var duration;

                if (++executed === items) { 
                    duration = Date.now()-start;

                    assert(duration>=minTime, 'The leaky bucket finished too soon ('+duration+' < '+minTime+') ...');
                    assert(duration<maxTime, 'The leaky bucket finished too late ('+duration+' > '+maxTime+') ...');

                    done();
                }
            }


            bucket = new LeakyBucket(capacity);

            while(iterator--) bucket.throttle(cb);
        });







        it('should not execute all items immediately if there is not enough capacity III', function(done) {
            var   start         = Date.now()
                , executed      = 0
                , maxTime       = 5500
                , minTime       = 4500
                , capacity      = 60
                , items         = 70
                , iterator      = items
                , cb, bucket;


            // wait for the bucket
            this.timeout(15000);


            cb = function() {
                var duration;

                if (++executed === items) { 
                    duration = Date.now()-start;

                    assert(duration>=minTime, 'The leaky bucket finished too soon ('+duration+' < '+minTime+') ...');
                    assert(duration<maxTime, 'The leaky bucket finished too late ('+duration+' > '+maxTime+') ...');

                    done();
                }
            }


            bucket = new LeakyBucket(capacity, 30);

            while(iterator--) bucket.throttle(cb);
        });

    



        it('should abort items that exceed the max waiting time', function(done) {
            var   start         = Date.now()
                , executed      = 0
                , maxTime       = 11500
                , minTime       = 10500
                , capacity      = 60
                , items         = 100
                , iterator      = items
                , cb, bucket;


            // wait for the bucket
            this.timeout(15000);


            cb = function() {
                var duration;

                if (++executed === items) { 
                    duration = Date.now()-start;

                    assert(duration>=minTime, 'The leaky bucket finished too soon ('+duration+' < '+minTime+') ...');
                    assert(duration<maxTime, 'The leaky bucket finished too late ('+duration+' > '+maxTime+') ...');

                    done();
                }
            }


            bucket = new LeakyBucket(capacity, 60, 10);

            while(iterator--) bucket.throttle(cb);
        });

    



        it('should abort items that exceed the max waiting time after a pause', function(done) {
            var   start         = Date.now()
                , executed      = 0
                , maxTime       = 5500
                , minTime       = 4500
                , capacity      = 60
                , items         = 65
                , iterator      = items
                , errCount      = 0
                , expectedErrCount = 3
                , cb, bucket;


            // wait for the bucket
            this.timeout(15000);


            cb = function(err) {
                var duration;

                if (err) errCount++;

                if (++executed === items) { 
                    duration = Date.now()-start;

                    assert(duration>=minTime, 'The leaky bucket finished too soon ('+duration+' < '+minTime+') ...');
                    assert(duration<maxTime, 'The leaky bucket finished too late ('+duration+' > '+maxTime+') ...');
                    assert(errCount===expectedErrCount, 'The leaky bucket should have emitted '+expectedErrCount+' errors, it emitted '+errCount+' errors...');

                    done();
                }
            }


            bucket = new LeakyBucket(capacity, 60, 5);

            while(iterator--) bucket.throttle(cb);

            bucket.pause(3);
        });






        it('should abort items that exceed the max waiting time after a pause with a non default interval', function(done) {
            var   start         = Date.now()
                , executed      = 0
                , maxTime       = 10500
                , minTime       = 9500
                , capacity      = 60
                , items         = 100
                , iterator      = items
                , errCount      = 0
                , expectedErrCount = 30
                , cb, bucket;


            // wait for the bucket
            this.timeout(15000);


            cb = function(err) {
                var duration;

                if (err) errCount++;

                if (++executed === items) { 
                    duration = Date.now()-start;

                    assert(duration>=minTime, 'The leaky bucket finished too soon ('+duration+' < '+minTime+') ...');
                    assert(duration<maxTime, 'The leaky bucket finished too late ('+duration+' > '+maxTime+') ...');
                    assert(errCount===expectedErrCount, 'The leaky bucket should have emitted '+expectedErrCount+' errors, it emitted '+errCount+' errors...');

                    done();
                }
            }


            bucket = new LeakyBucket(capacity, 30, 10);

            while(iterator--) bucket.throttle(cb);

            bucket.pause(5);
        });






        it('should correctly handle the pause instruction', function(done) {
            var   start         = Date.now()
                , executed      = 0
                , maxTime       = 8500
                , minTime       = 7500
                , capacity      = 60
                , items         = 65
                , iterator      = items
                , cb, bucket;


            // wait for the bucket
            this.timeout(15000);


            cb = function() {
                var duration;

                if (++executed === items) { 
                    duration = Date.now()-start;

                    assert(duration>=minTime, 'The leaky bucket finished too soon ('+duration+' < '+minTime+') ...');
                    assert(duration<maxTime, 'The leaky bucket finished too late ('+duration+' > '+maxTime+') ...');

                    done();
                }
            }


            bucket = new LeakyBucket(capacity, 60);

            while(iterator--) bucket.throttle(cb);

            bucket.pause(3);
        });


    



        it('should work using promises', function(done) {
            var   start         = Date.now()
                , executed      = 0
                , maxTime       = 11500
                , minTime       = 10500
                , capacity      = 60
                , items         = 100
                , errCount      = 0
                , expectedErrCount = 29
                , iterator      = items
                , cb, bucket;


            // wait for the bucket
            this.timeout(15000);


            cb = function(err) {
                process.nextTick(function() {
                    var duration;

                    if (err) errCount++;

                    if (++executed === items) { 
                        duration = Date.now()-start;

                        assert(duration>=minTime, 'The leaky bucket finished too soon ('+duration+' < '+minTime+') ...');
                        assert(duration<maxTime, 'The leaky bucket finished too late ('+duration+' > '+maxTime+') ...');
                        assert(errCount===expectedErrCount, 'The leaky bucket should have emitted '+expectedErrCount+' errors, it emitted '+errCount+' errors...');

                        done();
                    }
                });                             
            }



            bucket = new LeakyBucket(capacity, 60, 10);


            while(iterator--) bucket.throttle().then(cb).catch(cb);
        });





    



        it('should return info about the counters', function() {            
            var bucket = new LeakyBucket(100, 60, 10);
            var info = bucket.getInfo();

            assert.equal(info.left, 100);
            assert.equal(info.capacity, 100);
            assert.equal(info.interval, 60);
        });
    });
    