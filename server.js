var express = require("express");
var app = express();
const path = require("path");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", express.static("dist"));
app.use("/", express.static("images"));
app.use("/", express.static("html"));
app.use("/", express.static(__dirname + "/dist/design-system"));

// setup the index redirect
app.get("/", function (req, res) {
  return res.redirect("/index.html");
});

// setup index.html route
app.get("/index.html", function (req, res) {
  // you can use your favorite templating library to generate your html file.
  // this example keeps things simple and just returns a static file
  return res.sendFile(`/index.html`);
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Example app listening on port 3000!");
});
