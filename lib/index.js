'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isNaN = require( 'validate.io-nan'),
	isArray = require( 'validate.io-array' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var signum1 = require( './number.js' ),
	signum2 = require( './array.js' ),
	signum3 = require( './accessor.js' ),
	signum4 = require( './deepset.js' ),
	signum5 = require( './matrix.js' );


// SIGNUM FUNCTION //

/**
* FUNCTION: signum( x[, opts] )
*	Evaluates the signum function.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix|Null} signum function value(s) or null
*/
function signum( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		err,
		out,
		d;

	if ( isNumber( x ) || isNaN( x ) ) {
		return signum1( x );
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( x ) ) {
		if ( opts.copy !== false ) {
			// Create an output matrix:
			d = new Int8Array( x.length );
			out = matrix( d, x.shape, 'int8' );
		} else {
			out = x;
		}
		return signum5( out, x );
	}
	if ( isArrayLike( x ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return signum4( x, opts.path, opts.sep );
		}
		// Handle regular, typed, and accessor arrays next...
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( !isArray( x ) ) {
			out = new Int8Array( x.length );
		} else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			return signum3( out, x, opts.accessor );
		}
		return signum2( out, x );
	}
	throw new TypeError( 'signum()::invalid input argument. Input value type not currently supported. Value: `' + x + '`.' );
} // end FUNCTION signum()


// EXPORTS //

module.exports = signum;
