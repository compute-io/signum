'use strict';

// MODULES

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isNumber = require( 'validate.io-number' ),
	isFunction = require( 'validate.io-function' ),
	isNaN = require( 'validate.io-nan' );

// SIGNUM //

/**
* FUNCTION: signum(x )
*	Determines the sign of a numeric value.
*/
function signum( x ) {
	if ( typeof x !== 'number' ) {
		throw new TypeError( 'signum()::invalid input argument. Must provide a numeric value.' );
	}
	// Cases...

	// [0] NaN
	if ( x !== x ) {
		return NaN;
	}
	// [1] +-0
	if ( !x ) {
		return x;
	}
	// [2] x < 0
	if ( x < 0 ) {
		return -1;
	}
	// [3] x > 0
	return 1;
} // end FUNCTION signum()


// EXPORTS //

/**
* FUNCTION: function( x[, options] )
*	Determines the sign of the elements in an array
*
* @param {Array||Number} x - numeric array or single number
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {Boolean} [options.copy=true] - boolean indicating whether to return new array
* @returns {Array||Number} signum values
*/
module.exports = function( x, options ) {

	var clbk, copy = true;

	if ( isNumber(x) === true || isNaN(x) === true ) {
		return signum( x );
	}
	if ( !isArray( x ) ) {
		throw new TypeError( 'signum()::invalid input argument. Must provide an array.' );
	}
	if ( arguments.length > 1 ) {

		if ( !isObject( options ) ) {
			throw new TypeError( 'signum()::invalid input argument. Options must be an object. Value: `' + options + '`.' );
		}

		if ( options.hasOwnProperty( 'accessor' ) ) {
			clbk = options.accessor;
			if ( !isFunction ( clbk ) ) {
				throw new TypeError( 'signum()::invalid option. Accessor must be a function. Value: `' + clbk + '`.' );
			}
		}

		if ( options.hasOwnProperty( 'copy' ) ) {
			copy = options.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'signum()::invalid option. Copy option must be a boolean primitive. Value: `' + copy + '`.' );
			}
		}

	}

	var len = x.length, arr;
	if ( copy === true ) {
		arr = new Array( len );
	} else {
		arr = x;
	}

	if ( clbk ) {
		for ( var i = 0; i < len; i++ ) {
			arr[ i ] = signum( clbk( x[ i ] ) );
		}
	} else {
		for ( var j = 0; j < len; j++ ) {
			arr[ j ] = signum( x[ j ] );
		}
	}

	return arr;
};
