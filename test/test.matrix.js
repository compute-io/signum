/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	signum = require( './../lib/matrix.js' ),

	// Signum function:
	SIGN = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix signum', function tests() {

	var out,
		mat,
		d1,
		d2,
		i;

	d1 = new Int8Array( 100 );
	d2 = new Int8Array( 100 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = i < 50 ? -i : i;
		d2[ i ] = SIGN( d1[ i ] );
	}

	beforeEach( function before() {
		mat = matrix( d1, [10,10], 'int8' );
		out = matrix( d2, [10,10], 'int8' );
	});

	it( 'should export a function', function test() {
		expect( signum ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			signum( matrix( [5,5] ), mat );
		}
	});

	it( 'should evaluate the signum function for each matrix element', function test() {
		var actual;

		actual = matrix( [10,10], 'int8' );
		actual = signum( actual, mat );

		assert.deepEqual( actual.data, out.data );
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.deepEqual( signum( out, mat ).data, expected.data );

		mat = matrix( [10,0] );
		assert.deepEqual( signum( out, mat ).data, expected.data );

		mat = matrix( [0,0] );
		assert.deepEqual( signum( out, mat ).data, expected.data );
	});

});
