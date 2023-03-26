const express = require("express");
const bodyParser = require("body-parser").json();
const cors = require("cors");
app = express();

//npm install cors

const port = process.env.PORT || 3000;

app.use(cors());

var imageArray = new Array(0);
var count = 0;

app.post("/PUT/images{id}", (request, response) => {
  console.log("image received");
  if(isFull()) {
    makeSpace();
  } 
  append(request.image);
  writeImages();
})

app.post("/DELETE/images/{id}", (request, response) => {
  console.log("index received");
  remove(request.index);
  writeImages();
})

function loadImages() {
  var reader = new FileReader("c:\\data\\myfile.txt");

    var data = reader.read();
    var i = 0;
    while(data != -1){
        var imageArray = data;
        data = reader.read();
        i++;
    }
}

function writeImages() {
  var writer = new FileWriter("public/images.txt");
  writer.write(imageArray);
  writer.close();
}

function append(image) {
  imageArray[count] = image;
  count++;
}

function remove(index) {
  for(var i=index; i < count-1; i++) {
    imageArray[i] = imageArray[i+1];
  }
  count--;
}

function isFull() {
  if(count + 1 >= imageArray.length) {
    return true;
  }
  return false;
}

function makeSpace() {
  var newArray = new Array(imageArray.length*2);
  for(var i=0; i < imageArray.length; i++) {
    newArray[i] = imageArray[i];
  }
  imageArray = newArray;
}



































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
