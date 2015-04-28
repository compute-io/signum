signum
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Signum function.


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

Evaluates the signum function. The method accepts as its first argument either a single `numeric` value or an `array` of numeric values, which may include `NaN`, `+infinity`, and `-infinity`. For an input `array`, the signum function is evaluated for each value.

``` javascript
signum( -10 );
// returns -1

signum( [ -10, -1, -0, 0, 1, 10 ] );
// returns [ -1, -1, 0, 0, 1, 1 ]
```

In case of an input `array`, the function accepts two `options`:

*  __copy__: `boolean` indicating whether to return a new `array` containing the signum values. Default: `true`.
*  __accessor__: accessor `function` for accessing numerical values in object `arrays`.

To mutate the input `array` (e.g. when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', -10],
	['boop', -1],
	['bap', 1],
	['baz', 10]
];

function getValue( d ) {
	return d[ 1 ];
}

var arr = cprod( arr, getValue );
// returns [ -1, -1, 1, 1 ]
```

__Note__: the function returns an `array` with a length equal to the original input `array`.


## Examples

``` javascript
var signum = require( 'compute-signum' );

var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() - 0.5;
}

console.log( signum( data ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


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
