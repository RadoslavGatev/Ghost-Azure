(function() {
    'use strict';

    const Class         = require('ee-class');
    const type          = require('ee-types');
    const log           = require('ee-log');
    const debug         = require('ee-argv').has('debug-leaky-bucket') || process.env['debug-leaky-bucket'];
    let   logId         = 0;



    module.exports = new Class({

        // the number of tokens (request) that are left
          left: 0


        // timestamp of the last request
        , last: 0


        // size of the slot where capacity tokens can be used
        // in seconds, defaults to 60
        , slotSize: 60


        // capacity, defaults to 60 tokens / minute
        , capacity: 60


        // how many seconds it takes to refill one item
        , refillRate: 1


        // timer which may be set to work the queue
        , timer: null


        // how long can a item wait before it gets a timeout
        // defaults to 5 minutes, 300 seconds
        , maxWaitingTime: 300


        // indicates how long the next item has to
        // wait until its executed, stored as reserved cost,
        // not time
        , waitTime: 0


        /**
         * class constructor
         *
         * @param <integer> bucket capacity per minute, or options object
         * @param <integer> what time can it take to execute the capacity
         * @param <integer> items should not wait longer then n seconds,
         *                  if they do, abort them
         */
        , init: function(capacity, interval, maxWaitingTime) {

            if (type.object(capacity)) {
                if (type.number(capacity.capacity)) this.capacity = capacity.capacity;
                if (type.number(capacity.interval)) this.slotSize = capacity.interval;
                if (type.number(capacity.maxWaitingTime)) this.maxWaitingTime = capacity.maxWaitingTime;
            }
            else {
                // optional settings
                if (type.number(capacity)) this.capacity = capacity;
                if (type.number(interval)) this.slotSize = interval;
                if (type.number(maxWaitingTime)) this.maxWaitingTime = maxWaitingTime;
            }

            // id for logging purposes
            this.logId = logId++;

            // compute the refillrate in tokens / second
            this.refillRate = this.slotSize/this.capacity;

            // initial left value
            this.left = this.capacity;

            // queue storage
            this.queue = [];

            if (debug) log.info('[%s] Created leaky bucket with a capacity of %s, a slot size of %s seconds and a refill rate of %s second per item ...', this.logId, this.capacity, this.slotSize, this.refillRate);
        }



        /**
         * throttle a function
         *
         * @param <integer|function> the cost of the operation (defaults to 1) or callback
         * @param <function> optional callback
         */
        , throttle: function(cost, cb) {

            // check the input
            if (type.function(cost)) {
                cb = cost;
                cost = 1;
            }
            else if (!type.number(cost)) cost = 1;

            // working with callbacks or promises?
            if (type.function(cb)) this._throttle(cost, cb, false);
            else {
                return new Promise(function(resolve, reject) {
                    this._throttle(cost, function(err) {
                        if (err) reject(err);
                        else resolve();
                    }.bind(this), false);
                }.bind(this));
            }
        }







        /**
         * in case you dont know the cost of an item in advance
         * you may use this method to substract the actual cost
         * of the operation after theoperation was executed.
         *
         * @param <integer> the cost to substract
         *
         * @returns <boolean> false if the bucket is empty
         */
        , pay: function(cost) {
            this.left -= cost;
            return this.left > 0;
        }







        /**
         * returns ifno about the counters fo the bucket
         *
         * @returns {object} info
         */
        , getInfo: function() {

            // refill
            this.left = Math.min(((Date.now()-this.last)/1000/this.refillRate)+this.left, this.capacity);
            this.last = Date.now();

            return {
                  left: this.left
                , interval: this.slotSize
                , capacity: this.capacity
            };
        }






        /**
         * pause the leaky bucket for n seconds,
         * this may be used if you are rate limiting something
         * and you have to back off
         *
         * @param <number> how many seconds to pause
         */
        , pause: function(howLong) {
            var cost = Math.ceil(howLong/this.refillRate);


            if (debug) log.info('[%s] Adding pause item with a cost of %s to the queue ...', this.logId, cost);

            // re add a dummy item
            this.reAdd(cost, function() {}, true);
        }





        /**
         * add an item at the beginning of the queue
         * this will reschedule the queue
         *
         * @param <number|function> cost or callback
         * @param <function> callback
         * @param <boolean> optional if the item is a
         *                  pause item
         */
        , reAdd: function(cost, cb, isPause) {
            var   totalCost = 0
                , insertIndex = 0
                , item
                , i;

            let promise;


            // check the input
            if (type.function(cost)) {
                cb = cost;
                cost = 1;
            }
            else if (!type.number(cost)) cost = 1;



            // find the first non pause item
            this.queue.some(function(item, index) {
                insertIndex = index;
                return !item.isPause;
            });


            if (debug) log.highlight('[%s] Re-Adding an item with a cost of %s to the beginning of the queue (index %s) ...', this.logId, cost, insertIndex);


            // check if there is a callback. if not, we need 
            // to create a promise and use that as callabck.
            // the promise is later rreturned to the user
            if (!type.function(cb)) {
                promise = new Promise((resolve, reject) => {
                    cb = (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                });
            }


            // we add a dummy item that has the specific
            // cost of n seconds to delay all other items
            // the item must be added _after_ any pause item
            this.queue.splice(insertIndex, 0, {
                  cost    : cost
                , cb      : cb
                , isPause : !!isPause
            });

            // increase waiting time
            this.waitTime += cost;



            // we need to remove items that now will take
            // too long to execute, start at the end
            for (i = 0; i < this.queue.length; i++) {

                // is this item not called in time?
                if ((totalCost+this.queue[i].cost)*this.refillRate > this.maxWaitingTime && i !== 0) {
                    item = this.queue.splice(i, 1)[0];

                    // reduce waiting time
                    this.waitTime -= item.cost;

                    if (debug) log.debug('[%s] Rejecting previously added item because its waiting time of %s s exceeds the max waiting time of %s s...', this.logId, Math.ceil((totalCost+item.cost)*this.refillRate), this.maxWaitingTime);

                    // fail the item
                    item.cb(new Error('Timeout exceeded, too many waiting requests! Would take '+Math.ceil((totalCost+item.cost)*this.refillRate)+' seconds to complete, the max waiting time is '+this.maxWaitingTime+'!'));

                    i--;
                }
                else totalCost += this.queue[i].cost;
            }


            // cancel any running timers
            if (this.timer) {
                if (debug) log.warn('[%s] Canceled timer due to a re-add of an item ...', this.logId);

                clearTimeout(this.timer);
                this.timer = null;
            }


            if (debug) log.info('[%s] Adding a pseudo item with a cost of 0 to the queue ...', this.logId);


            // resume operations
            this._throttle(0, function(){}, false);

            return promise;
        }






        /**
         * private throttle method, works only with callbacks.
         * the public interface works with promises too.
         *
         * @param <integer> the cost of the operation
         * @param <function> callback
         * @param <boolean> true if the items source is the queue
         * @param <boolean> optional if the item is a
         *                  pause item
         */
        , _throttle: function(cost, cb, fromQueue, isPasue) {
            var   now = Date.now()
                , waitTime
                , item;

            // refill
            this.left = Math.min(((now-this.last)/1000/this.refillRate)+this.left, this.capacity);
            this.last = now;


            if (debug) log.debug('[%s] The leaky bucket has %s items left ...', this.logId, this.left);


            // do we have enough capacity to execute now?
            if (this.left >= cost && (!this.queue.length || fromQueue)) {
                if (debug) log.debug('[%s] Executing item with a cost of %s item(s) ...', this.logId, cost);

                // apply cost, store last execution timestamp
                this.left -= cost;

                // remove from wait time if the item has come from the queue
                if (fromQueue) this.waitTime -= cost;

                // execute
                cb();
            }
            else {
                // we need to compute the time until this item will be executed,
                // if the timeout time is exceeded don't queue bit return an errror
                waitTime = Math.max((this.waitTime*(1000*this.refillRate)-(now-this.last))/1000, 0);

                if (waitTime > this.maxWaitingTime) {
                    if (debug) log.debug('[%s] Rejecting item because its waiting time of %s s exceeds the max waiting time of %s s...', this.logId, waitTime, this.maxWaitingTime);

                    cb(new Error('Timeout exceeded, too many waiting requests! Would take '+waitTime+' seconds to complete, the max waiting time is '+this.maxWaitingTime+'!'));
                }
                else {
                    if (debug) log.debug('[%s] Adding item with a cost of %s item(s) to the queue, waitTime is %s, max waiting time is %s ...', this.logId, cost, waitTime, this.maxWaitingTime);

                    // add to queue, to the beginning if
                    // the source was the queue itself
                    item = {
                          cb: cb
                        , cost: cost
                        , isPasue: !!isPasue
                    };

                    // increase the wait time variable so we can compute the exact time
                    // that it will take to execute the last added item
                    this.waitTime += cost;

                    // queue at the end if the item was added by the user
                    if (fromQueue) this.queue.unshift(item);
                    else this.queue.push(item);
                }
            }


            // if we got queued items and not already a timer
            // running, start a new timer
            if (this.queue.length && this.timer === null) {
                if (debug) log.debug('[%s] started a timer for the next item to be executed, waiting %s milliseconds ...', this.logId, Math.max(Math.ceil((this.queue[0].cost-this.left)*this.refillRate*1000), 0));

                // start a new timeout
                this.timer = setTimeout(function() {

                    // freee the timer, so it can be re-set
                    this.timer = null;

                    // check if the queue still contains stuff, else don't do anything
                    // this should never be the case unless someone removes items
                    // from the queu eat another place
                    if (this.queue.length) {
                        var queuedItem = this.queue.shift();
                        this._throttle(queuedItem.cost, queuedItem.cb, true, queuedItem.isPasue);
                    }
                    else log.warn('[%s] Attempt to use non existent item from the queue', this.logId);
                }.bind(this), Math.max(Math.ceil((this.queue[0].cost-this.left)*this.refillRate*1000), 0));
            }
        }
    });
})();
