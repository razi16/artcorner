const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "all good",
  });
});

app.get("/:text", (req, res) => {
  res.json({
    message: req.params.text,
  });
});

app.listen(4000);
