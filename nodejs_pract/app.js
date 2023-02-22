const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

function serve(rootDirectory, port) {
  let server = new http.Server();
  server.listen(port);
  console.log("Listening on port", port);
  server.on("request", (request, response) => {
    let endpoint = url.parse(request.url).pathname;

    let filename = endpoint.substring(1) || "index.html";
    filename = filename.replace(/\.\.\//g, "");
    filename = path.resolve(rootDirectory, filename);
    

    let text = fs.readFileSync(filename, "utf-8");

    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);
    response.write(JSON.stringify({ data: text.replace(/\n|\r/g, ' ')}));
    response.end();

  });
}
// When we're invoked from the command line, call the serve() function
serve(process.argv[2] || "./tmp", parseInt(process.argv[3]) || 8000);