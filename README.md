signum
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Signum](http://en.wikipedia.org/wiki/Sign_function) function.

The [Signum](http://en.wikipedia.org/wiki/Sign_function) function is defined as

<div class="equation" align="center" data-raw-text="\operatorname{sign}(x) := \begin{cases} -1 & \text{if } x < 0, \\ 0 & \text{if } x = 0, \\ 1 & \text{if } x > 0. \end{cases}" data-equation="eq:signum_function">
	<img src="https://cdn.rawgit.com/compute-io/signum/f96aeca1313d08e9b11fa21100542b74b90d2e59/docs/img/eqn.svg" alt="Definition of the signum function.">
	<br>
</div>

for any real number `x`.

## Installation

``` bash
$ npm install compute-signum
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var signum = require( 'compute-signum' );
```

#### signum( x[, options] )

Evaluates the [signum](http://en.wikipedia.org/wiki/Sign_function) function. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix). Values may include `NaN`, `+infinity`, and `-infinity`

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = signum( -10 );
// returns -1

out = signum( [ -10, -1, -0, 0, 1, 10 ] );
// returns [ -1, -1, 0, 0, 1, 1 ]

data = [ -2, 0, 2 ];
out = signum( data );
// returns [ -1, 0, 1 ]

data = new Float64Array( data );
out = signum( data );
// returns Int8Array( [ -1, 0, 1 ] )

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i - 3;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[  -3  -2
	   -1   0
	    1   2 ]
*/

out = signum( mat );
/*
	[ -1 -1
	  -1  0
	   1  1 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.


For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', -10],
	['boop', -1],
	['bip', 0],
	['bap', 1],
	['baz', 10]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = signum( data, {
	'accessor': getValue
});
// returns [ -1, -1, 0, 1, 1 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,-10]},
	{'x':[1,-1]},
	{'x':[2,0]},
	{'x':[3,1]},
	{'x':[4,10]}
];

var out = signum( data, 'x|1', '|' );
/*
	[
		{'x':[0,-1]},
		{'x':[1,-1]},
		{'x':[2,0]},
		{'x':[3,1]},
		{'x':[4,1]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ -10, -1, 0, 1, 10 ];

var out = signum( data, {
	'copy': false
});
// returns [ -1, -1, 0, 1, 1 ]

bool = ( data === out );
// returns true

data = new Int8Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i - 3;
}
mat = matrix( data, [3,2], 'int8' );
/*
	[  -3  -2
	   -1  0
	   1  2 ]
*/

out = signum( mat, {
	'copy': false
});
/*
	[ -1 -1
	  -1  0
	   1  1 ]
*/

bool = ( mat === out );
// returns true
```

When provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is of type `int8`. In case that the input `x` is mutated, the original data type of the [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) is preserved.


## Notes

Table of results:

Value | Sign  
:---: | :---: |
`x > 0` | `+1`
`x < 0` | `-1`
`0` | `0`
`-0` | `-0`
`NaN` | `NaN`

The above results are compatible with an ECMAScript 6 [proposal](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.sign) from Mozilla, which would extend the `Math` object to include the method `Math.sign()`. Currently, only [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign) implements this proposal.


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	signum = require( 'compute-signum' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*20 - 10;
}
out = signum( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = signum( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = signum( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*20 - 10;
}
tmp = signum( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = signum( mat );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-signum.svg
[npm-url]: https://npmjs.org/package/compute-signum

[travis-image]: http://img.shields.io/travis/compute-io/signum/master.svg
[travis-url]: https://travis-ci.org/compute-io/signum

[coveralls-image]: https://img.shields.io/coveralls/compute-io/signum/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/signum?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/signum.svg
[dependencies-url]: https://david-dm.org/compute-io/signum

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/signum.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/signum

[github-issues-image]: http://img.shields.io/github/issues/compute-io/signum.svg
[github-issues-url]: https://github.com/compute-io/signum/issues
