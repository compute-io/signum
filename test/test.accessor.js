/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	signum = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor signum', function tests() {

	it( 'should export a function', function test() {
		expect( signum ).to.be.a( 'function' );
	});

	it( 'should evaluate the signum function using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':10},
			{'x':-1},
			{'x':234},
			{'x':-0.344},
			{'x':5},
			{'x':0},
			{'x':-0}
		];

		actual = new Array( data.length );
		actual = signum( actual, data, getValue );

		expected = [ 1, -1, 1, -1, 1, 0, -0 ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( signum( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

});
