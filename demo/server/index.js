const server = require("./server")
// const log = require()

const port = process.argv[2] || 5001

function fourohfour(info) {
  const res = info.res;
  res.writeHead(404, {"Content-Type": "text/plain"})
  res.write("404 Page Not Found")
  res.end()
}

const handle = {}

handle["/"] = fourohfour;

server.serveFilePath("static")
server.start(handle, port)