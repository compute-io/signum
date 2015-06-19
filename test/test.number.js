/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	signum = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number signum', function tests() {

	it( 'should export a function', function test() {
		expect( signum ).to.be.a( 'function' );
	});

	it( 'should return a numeric value if provided a numeric value', function test() {
		assert.isNumber( signum( 1 ) );
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val = signum( NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should return 1 if provided a positive number', function test() {
		var val = signum( 10 );
		assert.strictEqual( val, 1 );
	});

	it( 'should return -1 if provided a negative number', function test() {
		var val = signum( -10 );
		assert.strictEqual( val, -1 );
	});

	it( 'should return 0 if provided zero', function test() {
		var val = signum( 0 );
		assert.strictEqual( val, 0 );
	});

	it( 'should return -0 if provided negative zero', function test() {
		var val = signum( -0 );
		assert.strictEqual( val, -0 );
		assert.strictEqual( 1/val, Number.NEGATIVE_INFINITY );
	});

});
