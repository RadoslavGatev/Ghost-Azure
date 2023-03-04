


    var   argv      = require('../')
        , util      = require('util')
        , assert    = require('assert');


    describe('The parser', function() {
        it('should be able to test for values from the argv string', function(){
            assert.ok(argv.has('reporter'));
        });

         it('should be able to retreive values from the argv string', function(){
            assert.equal(argv.get('reporter'), 'spec');
        });
    });     
