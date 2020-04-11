var http = require("http");

var fs = require("fs");

const path = require("path");

const { parse } = require("querystring");

const indexPage = fs.readFileSync(path.join(__dirname, "index.html"));

const server = http.createServer(function (req, res) {
    if (req.url === "/") {
        console.log('yes!')
        res.writeHead(200, { "Content-Type": "text/html",  "my-very-header": "custom header"
    });
        res.write(indexPage);
        res.end();
    }
    else if (req.method === "POST" && req.url === "/message") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString(); // convert Buffer to string
        });
        console.log('converted');
        req.on("end", () => {

            const {

                message

            } = parse(body);

            fs.writeFile(path.join(__dirname, "message"), message, "utf-8", err => {

                console.log("file written");

            })

        })
        res.end();
    } else {
        res.write(indexPage);
    };
});


server.listen(8080, "127.0.0.1");
console.log(`Server is running on PORT 8080`);
