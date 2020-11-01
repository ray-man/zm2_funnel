const bodyParser = require("body-parser");
const express = require("express");
const expressBunyanLogger = require("express-bunyan-logger");
const path = require("path");

const logger = require("./logger");
const attachRoutesToApp = require("./routes");

const app = express();

app.use(
  expressBunyanLogger({
    name: "sl-server",
    logger,
    excludes: [
      "body",
      "req",
      "req-headers",
      "res",
      "res-headers",
      "user-agent",
      "incoming",
      "response-hrtime",
    ],
  })
);

app.use(bodyParser.json());

const PUBLIC_DIR_PATH = path.resolve(__dirname, "../public");
app.use(express.static(PUBLIC_DIR_PATH));

attachRoutesToApp(app);

// Rewrite URL for Single Page App
app.get(new RegExp("^((?!/api).)*$"), function (req, res) {
  const indexFilePath = path.join(PUBLIC_DIR_PATH, "index.html");
  res.sendFile(indexFilePath);
});

module.exports = app;
