'use strict';

// MODULES //

var SIGN = require( './number.js' );


// SIGNUM FUNCTION //

/**
* FUNCTION: signum( out, matrix )
*	Evaluates the signum function for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix} output matrix
*/
function signum( y, x ) {
	var len = x.length,
		i;
	if ( y.length !== len ) {
		throw new Error( 'signum()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = SIGN( x.data[ i ] );
	}
	return y;
} // end FUNCTION signum()


// EXPORTS //

module.exports = signum;
