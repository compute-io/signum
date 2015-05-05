'use strict';

// MODULES

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );


// SIGNUM //

/**
* FUNCTION: signum( x )
*	Determines the sign of a numeric value.
*
* @private
* @param {Number} x - input value
*/
function signum( x ) {
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
* FUNCTION: signum( x[, options] )
*	Evaluates the signum function.
*
* @param {Number[]|Number} x - numeric array or single number
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array
* @returns {Number[]|Number} signum values
*/
module.exports = function( x, opts ) {
	var copy = true,
		clbk,
		len,
		arr,
		v, i;

	if ( typeof x === 'number' ) {
		return signum( x );
	}
	if ( !isArray( x ) ) {
		throw new TypeError( 'signum()::invalid input argument. Must provide either a single number primitive or an array of number primitives. Value: `' + x + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'signum()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction ( clbk ) ) {
				throw new TypeError( 'signum()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'signum()::invalid option. Copy option must be a boolean primitive. Option: `' + copy + '`.' );
			}
		}
	}
	len = x.length;
	if ( copy ) {
		arr = new Array( len );
	} else {
		arr = x;
	}
	if ( clbk ) {
		for ( i = 0; i < len; i++ ) {
			v = clbk( x[ i ], i );
			if ( typeof v !== 'number' ) {
				throw new TypeError( 'signum()::invalid value. Accessed array values must be number primitives. Value: `' + v + '`.' );
			}
			arr[ i ] = signum( v );
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			v = x[ i ];
			if ( typeof v !== 'number' ) {
				throw new TypeError( 'signum()::invalid input argument. Must provide an array of number primitives. Value: `' + v + '`.' );
			}
			arr[ i ] = signum( v );
		}
	}
	return arr;
}; // end FUNCTION signum()
