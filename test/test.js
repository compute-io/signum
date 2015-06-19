/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	signum = require( './../lib' ),

	// Error function:
	SIGN = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-signum', function tests() {

	it( 'should export a function', function test() {
		expect( signum ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither a number, NaN or array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				signum( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				signum( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should compute the error function when provided a number', function test() {
		assert.strictEqual( signum( 0 ), 0 );

		var val = signum( NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
		
		assert.strictEqual( signum( 2 ), 1 );
		assert.strictEqual( signum( -3 ), -1 );
	});

	it( 'should evaluate the signum function when provided a plain array', function test() {
		var data, actual, expected;

		data = [ -3, -2, -1, 0, 1, 2, 3 ];

		expected = [ -1, -1, -1, 0, 1, 1, 1];

		actual = signum( data );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate...
		actual = signum( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );
	});

	it( 'should evaluate the signum function when provided a typed array', function test() {
		var data, actual, expected;

		data = new Int8Array( [ -3, -2, -1, 0, 1, 2, 3 ] );

		expected = new Int8Array( [ -1, -1, -1, 0, 1, 1, 1 ] );

		actual = signum( data );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = signum( data, {
			'copy': false
		});
		expected = new Int8Array( [ -1, -1, -1, 0, 1, 1, 1 ] );
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );
	});

	it( 'should evaluate the signum function element-wise using an accessor', function test() {
		var data, actual, expected;

		data = [
			[0,-3],
			[1,-2],
			[2,-1],
			[3,0],
			[4,1],
			[5,2],
			[6,3]
		];

		expected = [ -1, -1, -1, 0, 1, 1, 1];

		actual = signum( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = signum( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the signum function element-wise and deep set', function test() {
		var data, actual, expected, i;

		data = [
			{'x':[0,-3]},
			{'x':[1,-2]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		expected = [
			{'x':[0,-1]},
			{'x':[1,-1]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,1]},
			{'x':[6,1]}
		];

		actual = signum( data, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Specify a path with a custom separator...
		data = [
			{'x':[0,-3]},
			{'x':[1,-2]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		actual = signum( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );

	});

	it( 'should evaluate the signum function element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Int8Array( 100 );
		d2 = new Int8Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i < 50 ? -i : i;
			d2[ i ] = SIGN( d1[ i ] );
		}
		mat = matrix( d1, [10,10], 'int8' );
		out = signum( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = signum( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should return `null` if provided an empty data structure', function test() {
		assert.isNull( signum( [] ) );
		assert.isNull( signum( matrix( [0,0] ) ) );
		assert.isNull( signum( new Int8Array() ) );
	});

});
