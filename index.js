const express = require("express");
const bodyParser = require("body-parser").json();
const cors = require("cors");
const multer = require("multer");
const { ulid } = require("ulid");
const fs = require("fs");
const path = require("path");
app = express();

const port = process.env.PORT || 3000;
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, ulid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser);
app.use(express.static(__dirname + "/public"));

// Images
// TODO add auth
app.put("/api/images", upload.single("file"), (req, res) => {
  res.json({ filename: req.file.filename });
});

app.delete("/api/images/:id", (req, res) => {
  fs.unlinkSync("./public/uploads/" + req.params.id, (err) => {
    if (err) {
      response.type("text/plain");
      response.status(500);
      response.send(err);
      return;
    }
  });
  res.json({ message: "File deleted" });
});

// Custom 404 page.
app.use((request, response) => {
  response.type("text/plain");
  response.status(404);
  response.send("404 - Not Found");
});

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message);
  response.type("text/plain");
  response.status(500);
  response.send("500 - Server Error");
});

app.listen(port, () =>
  console.log(
    `Express started at \"http://localhost:${port}\"\n` +
      `press Ctrl-C to terminate.`
  )
);
