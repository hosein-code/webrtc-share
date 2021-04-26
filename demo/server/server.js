const http = require("http")
const url = require("url")
const fs = require("fs")

let serveFileDir = ""

function setServerFilePath(p) {
  serveFileDir = p
}

exports.serveFilePath = setServerFilePath


function start(handle, port) {
  function onRequest(req, res) {
    const urldata = url.parse(req.url, true),
    pathname = urldata.pathname,
    info = { res: res }
    route(handle, pathname, info)
  }

  http.createServer(onRequest).listen(port)
}

exports.start = start

function route(handle, pathname, info) {
  const filepath = createFilePath(pathname)

  fs.stat(filepath, (err, stats) => {
    if (!err && stats.isFile()) {
      serveFile(filepath, info)
    } else {
      handleCustom(handle, pathname, info)
    }
  })
}

function createFilePath(pathname) {
  const components = pathname.substr(1).split('/')
  let filtered = new Array(), temp;

  for(let i = 0, len = components.length; i < len; i++) {
    temp = components[i]
    if (temp === '..') continue;
    if (temp === "") continue;
    temp = temp.replace(/~/g, '')
    filtered.push(temp)
  }

  return (serveFileDir + "/" + filtered.join("/"))
}

function serveFile(filepath, info) {
  const res = info.res

  fs.open(filepath, 'r', (err,fd) => {
    if (err) {
      noHandlerErr(filepath, res)
      return 
    }

    const readBuffer = Buffer.alloc(20480)

    fs.read(fd, readBuffer, 0, 20480, 0, (err, bytes) => {
      if (err) {
        noHandlerErr(filepath, res)
        return
      }
      if (bytes > 0) {
        res.writeHead(200, { "Content-Type": contentType(filepath) })
        res.write(readBuffer.toString('utf-8', 0, bytes))
      }
      res.end()
    })
  })
}

function contentType(filepath) {
  const index = filepath.lastIndexOf('.')

  if (index >= 0) {
    switch (filepath.substr(index + 1)) {
      case "html": return ('text/html')
      case "js": return ("application/javascript")
      case "css": return ("text/css")
      case "txt": return ("text/plain");
      default: return ("text/html") 
    }
  }
  return ("text/html") 
}

function handleCustom(handle, pathname, info) {
  if (typeof handle[pathname] == 'function') {
    handle[pathname](info);
  } else {
    noHandlerErr(pathname, info.res)
  }
}

function noHandlerErr(pathname, res) {
  console.log(pathname);
  res.writeHead(404, { "Content-Type": "text-plain" })
  res.write("404 Page Not Found")
  res.end()
}