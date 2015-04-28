/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	signum = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-signum', function tests() {

	it( 'should export a function', function test() {
		expect( signum ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a numeric value or an array', function test() {
		var values = [
				'5',
				true,
				undefined,
				null,
				{},
				function(){}
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

	it( 'should throw an error if a data array contains non-numeric values', function test() {
		var values = [
				'5',
				true,
				undefined,
				null,
				[],
				{},
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( [ values[i] ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				signum( value );
			};
		}
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

	it( 'should return 0 if provide zero', function test() {
		var val = signum( 0 );
		assert.strictEqual( val, 0 );
	});

	it( 'should return -0 if provide negative zero', function test() {
		var val = signum( -0 );
		assert.strictEqual( val, -0 );
		assert.strictEqual( 1/val, Number.NEGATIVE_INFINITY );
	});

	it( 'should return a numeric value if provided a numeric value', function test() {
		assert.isNumber( signum( 1 ) );
	});

	it( 'should return an array of numbers if provided an array', function test() {
		var values = [ 10, -1, 234, -0.344, 5 ],
			val;

		val = signum( values );
		assert.isArray( val );
		for ( var i = 0; i < val.length; i++ ) {
			assert.isNumber( val[ i ] );
		}
	});

	it( 'should throw an error if provided options argument is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				signum( [], value );
			};
		}
	});


	it( 'should throw an error if provided an accessor which is not a function', function test() {
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
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				signum( [], { 'accessor': value } );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean', function test() {
		var values = [
			'5',
			5,
			function(){},
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				signum( [1,-2,3,-4,5], {'copy': value} );
			};
		}
	});

	it( 'should not mutate the input array by default', function test() {
		var data, expected, actual;

		data = [ 1, -2, 3 ];
		expected = [ 1, -1, 1 ];

		actual = signum( data );
		assert.deepEqual( actual, expected );
		assert.ok( actual !== data );
	});


	it( 'should evaluate the signum function', function test() {
		var values, expected, actual;

		values = [ 10, -1, 234, -0.344, 5, 0, -0 ];

		expected = [ 1, -1, 1, -1, 1, 0, -0 ];

		actual = signum( values );

		assert.deepEqual( actual, expected );
	});


	it( 'should evaluate the signum function using an accessor function', function test() {
		var data, expected, results;

		data = [
			{'x':10},
			{'x':-1},
			{'x':234},
			{'x':-0.344},
			{'x':5},
			{'x':0},
			{'x':-0}
		];
		expected = [ 1, -1, 1, -1, 1, 0, -0 ];

		results = signum( data, { 'accessor':getValue } );

		assert.strictEqual( results.length, data.length );
		assert.deepEqual( results, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the signum function and mutate the input array', function test() {

		var values, expected, actual;

		values = [ 10, -1, 234, -0.344, 5, 0, -0 ];
		expected = [ 1, -1, 1, -1, 1, 0, -0 ];

		actual = signum( values, { 'copy':false } );
		assert.deepEqual( actual, expected );
		assert.ok( actual === values );
	});


});
