'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	SIGN = require( './number.js' );


// SIGNUM FUNCTION //

/**
* FUNCTION: signum( arr, path[, sep] )
*	Evaluates the signum function for each array element and deep sets the input array.
*
* @param {Array} arr - input array
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array|Null} input array or null
*/
function signum( x, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		i;
	if ( !len ) {
		return null;
	}
	if ( arguments.length > 2 ) {
		opts.sep = sep;
	}
	dget = deepGet( path, opts );
	dset = deepSet( path, opts );
	for ( i = 0; i < len; i++ ) {
		dset( x[i], SIGN( dget( x[i] ) ) );
	}
	return x;
} // end FUNCTION signum()


// EXPORTS //

module.exports = signum;
