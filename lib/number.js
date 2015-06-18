'use strict';

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

module.exports = signum;
