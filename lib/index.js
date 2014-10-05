/**
*
*	COMPUTE: signum
*
*
*	DESCRIPTION:
*		- Signum function.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

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

	module.exports = function( x ) {
		if ( typeof x === 'number' ) {
			return signum( x );
		}
		if ( !Array.isArray( x ) ) {
			throw new TypeError( 'signum()::invalid input argument. Must provide an array.' );
		}
		var len = x.length,
			arr = new Array( len );

		for ( var i = 0; i < len; i++ ) {
			arr[ i ] = signum( x[ i ] );
		}
		return arr;
	};

})();