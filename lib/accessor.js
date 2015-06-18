'use strict';

// FUNCTIONS

var SIGN = require( './number.js' );


// SIGNUM FUNCTION //

/**
* FUNCTION: signum( out, arr, accessor )
*	Evaluates the signum function for each array element using an accessor function.
*
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Null} output array or null
*/
function signum( y, x, clbk ) {
	var len = x.length,
		i;
	if ( !len ) {
		return null;
	}
	for ( i = 0; i < len; i++ ) {
		y[ i ] = SIGN( clbk( x[ i ], i ) );
	}
	return y;
} // end FUNCTION signum()


// EXPORTS //

module.exports = signum;
