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

	it( 'should throw an error if not provided a numeric value or a numeric array', function test() {
		var values = [
			'5',
			new Number( 5 ),
			true,
			undefined,
			null,
			{},
			function(){},
			[1,'2',3]
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

	it( 'should throw an error if an input array contains non-numeric values', function test() {
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
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				signum( [ value ] );
			};
		}
	});

	it( 'should throw an error if an accessed value is not numeric', function test() {
		expect( badValue ).to.throw( TypeError );

		function badValue() {
			signum( [{'x':'beep'}], {
				'accessor': getValue
			});
		}
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
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
				signum( [1,2,3], value );
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
				signum( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided a `copy` option which is not a boolean primitive', function test() {
		var values = [
			'5',
			5,
			new Boolean( true ),
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
				signum( [1,-2,3,-4,5], {
					'copy': value
				});
			};
		}
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

	it( 'should return an array of numbers if provided an array', function test() {
		var values = [ 10, -1, 234, -0.344, 5 ],
			arr;

		arr = signum( values );
		assert.isArray( arr );
		for ( var i = 0; i < arr.length; i++ ) {
			assert.isNumber( arr[ i ] );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		var actual = signum( [] );
		assert.ok( actual.length === 0 );
	});

	it( 'should not mutate the input array by default', function test() {
		var data, expected, actual;

		data = [ 1, -2, 3 ];

		actual = signum( data );
		expected = [ 1, -1, 1 ];

		assert.deepEqual( actual, expected );
		assert.ok( actual !== data );
	});

	it( 'should evaluate the signum function', function test() {
		var values, expected, actual;

		values = [ 10, -1, 234, -0.344, 5, 0, -0 ];

		actual = signum( values );
		expected = [ 1, -1, 1, -1, 1, 0, -0 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the signum function using an accessor function', function test() {
		var data, expected, actual;

		data = [
			{'x':10},
			{'x':-1},
			{'x':234},
			{'x':-0.344},
			{'x':5},
			{'x':0},
			{'x':-0}
		];

		actual = signum( data, {
			'accessor': getValue
		});
		expected = [ 1, -1, 1, -1, 1, 0, -0 ];

		assert.strictEqual( actual.length, data.length );
		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should evaluate the signum function and mutate the input array', function test() {

		var values, expected, actual;

		values = [ 10, -1, 234, -0.344, 5, 0, -0 ];

		actual = signum( values, {
			'copy':false
		});
		expected = [ 1, -1, 1, -1, 1, 0, -0 ];

		assert.deepEqual( actual, expected );
		assert.ok( actual === values );
	});

});
