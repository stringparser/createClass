# createClass [![NPM version][b-version]][x-npm] [![downloads][badge-downloads]][x-npm]

[![build][b-build]][x-travis]

**Work in progress**

# createClass

createClass similar to `React.createClass`

## usage

```js
var createClass = require('createClass');

var MyClass = createClass({
  create: function SomeThing (props) {
    SomeThing.super_.call(this, props);
  }
});
```

## API

Work in progress

### license

The MIT License (MIT)

Copyright (c) 2015-2016 Javier Carrillo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<!-- links -->
[x-npm]: https://npmjs.com/createClass
[x-travis]: https://travis-ci.org/stringparser/createClass/builds

[b-build]: https://travis-ci.org/stringparser/createClass.svg?branch=master
[b-version]: http://img.shields.io/npm/v/createClass.svg?style=flat-square
[badge-downloads]: http://img.shields.io/npm/dm/createClass.svg?style=flat-square
