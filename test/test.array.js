/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	signum = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array signum', function tests() {

	it( 'should export a function', function test() {
		expect( signum ).to.be.a( 'function' );
	});

	it( 'should evaluate the signum function', function test() {

		var data, expected, actual;

		data = [ 10, -1, 234, -0.344, 5, 0, -0 ];

		actual = new Array( data.length );
		actual = signum( actual, data );
		expected = [ 1, -1, 1, -1, 1, 0, -0 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		var s;

		s = signum( [], [] );
		assert.deepEqual( s, [] );

		s = signum( new Int8Array(), new Int8Array() );
		assert.deepEqual( s, new Int8Array() );
	});

});
