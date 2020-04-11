var http = require("http");

var fs = require("fs");

const { parse } = require("querystring");

const indexPage = fs.readFileSync("./index.html", "utf-8");

const server = http.createServer(function (req, res) {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(indexPage);
        res.end();
}
 else if (req.body === "POST" && req.url === "/message") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });
      console.log('converted');
    req.on("end", () => {
      const { message } = parse(body);

      fs.writeFile("./message.txt", message, "utf-8", (err) => {
        console.log("file written");
      });
    });

    res.end();
    } else {
        res.write(indexPage);
      res.end();
    };
  }
)


server.listen(8080, "127.0.0.1");
console.log(`Server is running on PORT 8080`);
