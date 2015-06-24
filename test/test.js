var inject = require('../')
var test = require('tape')
var fs = require('fs')
var path = require('path')

test('injects a #define statement into a shader source', function (t) {
  var expected = '#version 330\n#extension GL_OES_standard_derivatives : enable\n#define PI 3.14\n\nvoid main() {\n}\n'
  var fixture = fs.readFileSync(path.join(__dirname, 'fixture1.glsl'), 'utf8')
  t.equal(inject(fixture), fixture, 'returns same string')
  t.equal(inject(fixture, {}), fixture, 'returns same string')
  t.equal(inject(fixture, {
    PI: 3.14
  }), expected, 'injects multiple defines')
  t.end()
})

test('injects a #define statement into a shader source', function (t) {
  var expected = fs.readFileSync(path.join(__dirname, 'fixture2.expected.glsl'), 'utf8')
  var fixture = fs.readFileSync(path.join(__dirname, 'fixture2.glsl'), 'utf8')
  t.equal(inject(fixture, {
    BOOL: true,
    FOOBAR: 'some string',
    'BlendOverlayf(base, blend)': '(ops)'
  }), expected, 'injects multiple defines')
  t.end()
})

test('injects a #define statement into a shader source', function (t) {
  t.equal(inject('void main() {}', {
    PI: 3.14,
    BOO: ''
  }), '#define PI 3.14\n#define BOO\nvoid main() {}', 'injects multiple defines')

  t.equal(inject('#extension blah\nvoid main() {}', {
    PI: 3.14,
    FOO: 'bar'
  }), '#extension blah\n#define PI 3.14\n#define FOO bar\n\nvoid main() {}', 'injects multiple defines')
  t.end()
})
