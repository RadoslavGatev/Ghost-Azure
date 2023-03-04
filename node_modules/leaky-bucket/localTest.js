    

    var   LeakyBucket = require('./');

    var   start         = Date.now()
        , executed      = 0
        , maxTime       = 10500
        , minTime       = 9500
        , capacity      = 60
        , items         = 70
        , iterator      = items
        , cb, bucket;



    cb = function() {
        var duration;

        if (++executed === items) { 
            duration = Date.now()-start;

           
        }
    }


    bucket = new LeakyBucket(capacity);

    while(iterator--) bucket.throttle(cb);