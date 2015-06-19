/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	signum = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset signum', function tests() {

	it( 'should export a function', function test() {
		expect( signum ).to.be.a( 'function' );
	});

	it( 'should compute the signum function and deep set', function test() {
		var data, expected, i;

		data = [
			{'x':-3},
			{'x':-2},
			{'x':-1},
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		data = signum( data, 'x' );

		expected = [
			{'x':-1},
			{'x':-1},
			{'x':-1},
			{'x':0},
			{'x':1},
			{'x':1},
			{'x':1}
		];

		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,-3]},
			{'x':[9,-2]},
			{'x':[9,-1]},
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = signum( data, 'x/1', '/' );
		expected = [
			{'x':[9,-1]},
			{'x':[9,-1]},
			{'x':[9,-1]},
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,1]},
			{'x':[9,1]}
		];

		assert.deepEqual( data, expected );
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( signum( [], 'x' ) );
		assert.isNull( signum( [], 'x', '/' ) );
	});

});
