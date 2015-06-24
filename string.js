var tokenize = require('glsl-tokenizer')
var stringify = require('glsl-token-string')

var newline = {
  type: 'whitespace',
  data: '\n'
}

module.exports = function (source, defines) {
  if (!defines) {
    return source
  }

  var keys = Object.keys(defines)
  if (keys.length === 0) {
    return source
  }

  var tokens = tokenize(source)
  var idx = startIndex(tokens)
  var last = tokens[idx - 1]
  if (last) {
    insert(tokens, idx++, newline)
  }

  keys.forEach(function (key) {
    var val = String(defines[key])
    if (val) { // allow empty value
      val = ' ' + val
    }

    insert(tokens, idx++, {
      type: 'preprocessor',
      data: '#define ' + key + val
    })
    insert(tokens, idx++, newline)
  })

  var src = stringify(tokens)
  return src
}

function startIndex (tokens) {
  // determine starting index for defines
  var start = 0
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token.type === 'preprocessor') {
      if (/^#(extension|version)/.test(token.data)) {
        start = Math.max(start, i + 1)
      }
    }
  }
  return start
}

function insert (tokens, idx, token) {
  // inserts a token at the start of a line
  var last = tokens[idx - 1]
  var line = last ? last.line : 0
  var position = last ? (last.position + last.data.length) : 0
  token = {
    type: token.type,
    data: token.data,
    position: position,
    line: line,
    column: 0
  }
  tokens.splice(idx, 0, token)

  var offset = token.data.length
  while (idx < tokens.length) {
    tokens[idx].position += offset
    tokens[idx].line++
    idx++
  }

  return token
}
