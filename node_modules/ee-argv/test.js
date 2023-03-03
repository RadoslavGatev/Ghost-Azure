

	// node test --port=2345 --trace-http-request


	var assert = require( "assert" )
		, argv = require( "./index" );

	assert.ok( argv.has( "port" ), "failed to find the 'port' argument!" );
	assert.ok( argv.has( "trace-http-request" ), "failed to find the 'trace-http-request' argument!" );
	assert.strictEqual( argv.get( "port" ), "2345", "failed to retreive the 'port' argument!" );
	assert.strictEqual( argv.get( "trace-http-request" ), null, "the 'trace-http-request' argument did return the wrong value!" );
