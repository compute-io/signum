'use strict';

// MODULES //

var SIGN = require( './number.js' );


// SIGNUM FUNCTION //

/**
* FUNCTION: signum( out, arr )
*	Evaluates the signum function for each array element.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Null} output array or null
*/
function signum( y, x ) {
	var len = x.length,
		i;
	if ( !len ) {
		return null;
	}
	for ( i = 0; i < len; i++ ) {
		y[ i ] = SIGN( x[ i ] );
	}
	return y;
} // end FUNCTION signum()


// EXPORTS //

module.exports = signum;
