const path = require("path");
const express = require("express");
const serveStatic = require("serve-static");
const reactApp = require("./react-app");

const PORT = process.env.PORT || 3001;
const app = express();

const url = require('url');
const querystring = require('querystring');

let rawUrl = 'localhost:3004/#/offer/:id';

let parsedUrl = url.parse(rawUrl);
let parsedQs = querystring.parse(parsedUrl.query);

// const apiUrl = `http://api-www.emmerson.pl/offer/`;
//
// const url = [apiUrl + this.props.match.params.id].join("");
//
// fetch(url)
//     .then(res => res.json())
//     .then(response => {
//       meta = response;
//     });
console.log(parsedQs);

app.use(reactApp);
app.use(serveStatic(path.join(__dirname, "../build")));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
