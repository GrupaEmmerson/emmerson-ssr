const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const { renderToNodeStream } = require("react-dom/server");
const React = require("react");
const ReactApp = require("../build/static/ssr/main").default;
const fetch = require("node-fetch");
const decode = require('decode-html');

const apiUrl = `http://api-www.emmerson.pl/offer/`;

router.get("/offer/:id", (req, res) => {
    const url = [apiUrl + req.params.id + '/meta'].join("");
    let meta = '';

      fetch(url)
            .then(res => res.json())
            .then(response => {
                meta = response;
            });

  console.log(meta);
  
setTimeout(()=>{
  let fileName = path.join(__dirname, "../build", "index.html");

  fs.readFile(fileName, "utf8", (err, file) => {
    if (err) {
      throw err;
    }

    const reactElement = React.createElement(ReactApp);
    let [head, tail] = file.split("{react-app}");

    console.log(head);
    head = head.replace("{meta-app}", decode(meta));

    console.log(head);
      res.write(head);
    const stream = renderToNodeStream(reactElement);
    stream.pipe(res, { end: false });
    stream.on("end", () => {
      res.write(tail);
      res.end();
    });
  });
}, 1000);
});

router.get("/search", (req, res) => {
    let meta = '';

    setTimeout(()=>{
        let fileName = path.join(__dirname, "../build", "index.html");

        fs.readFile(fileName, "utf8", (err, file) => {
            if (err) {
                throw err;
            }

            const reactElement = React.createElement(ReactApp);
            let [head, tail] = file.split("{react-app}");

            console.log(head);
            head = head.replace("{meta-app}", meta);

            console.log(head);
            res.write(head);
            const stream = renderToNodeStream(reactElement);
            stream.pipe(res, { end: false });
            stream.on("end", () => {
                res.write(tail);
                res.end();
            });
        });
    }, 1000);
});


router.get("/", (req, res) => {
    let meta = '';

    setTimeout(()=>{
        let fileName = path.join(__dirname, "../build", "index.html");

        fs.readFile(fileName, "utf8", (err, file) => {
            if (err) {
                throw err;
            }

            const reactElement = React.createElement(ReactApp);
            let [head, tail] = file.split("{react-app}");

            console.log(head);
            head = head.replace("{meta-app}", meta);

            console.log(head);
            res.write(head);
            const stream = renderToNodeStream(reactElement);
            stream.pipe(res, { end: false });
            stream.on("end", () => {
                res.write(tail);
                res.end();
            });
        });
    }, 1000);
});

module.exports = router;
