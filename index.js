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
    if (!fs.existsSync("./public")) {
      fs.mkdirSync("./public");
    }
    if (!fs.existsSync("./public/uploads")) {
      fs.mkdirSync("./public/uploads");
    }
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    if (req.params.id) {
      callback(null, req.params.id);
    } else {
      callback(null, ulid() + path.extname(file.originalname));
    }
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser);
app.use(express.static(path.join(__dirname, "public")));

app.get("/ping", (req, res) => {
  console.log("Ping recieved");
  res.type("text/plain");
  res.send("Pong!");
});

// Images
// TODO add auth
app.put("/api/images", upload.single("file"), (req, res) => {
  res.json({ filename: req.file.filename });
});

app.patch("/api/images/:id", upload.single("file"), (req, res) => {
  res.json({ filename: req.file.filename });
});

app.delete("/api/images/:id", (req, res) => {
  fs.unlinkSync("./public/uploads/" + req.params.id);
  res.json({ message: "File deleted" });
});

// Custom 404 page.
app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not Found");
});

// Custom 500 page.
app.use((err, req, res, next) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});

app.listen(port, () =>
  console.log(
    `Express started at \"http://localhost:${port}\"\n` +
      `press Ctrl-C to terminate.`
  )
);
