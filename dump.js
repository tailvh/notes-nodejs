let http = require('http')
let GPORT = 8080

function toTitleCase (str) {
  return str.replace(/[a-z]*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
}

http.createServer(function (req, res) {
  let body = ''
  req.on('data', function (chunk) { body += chunk })
  req.on('end', function () {
    console.log(req.method + ' ' + req.url + ' HTTP/' + req.httpVersion)

    // Headers
    for (prop in req.headers) {
      console.log(toTitleCase(prop) + ': ' + req.headers[prop])
    }

    // Body
    if (body.length > 0) {
      console.log('\n' + body + '\n')
    }

    res.writeHead(200)
    res.end()
  })

  // Error
  req.on('err', function (err) { console.error(err) })
}).listen(GPORT, function () { console.log('Server listening on port ' + GPORT) })
