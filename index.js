const express = require("express");

const app = express();
var fs = require("fs");

let ServerOrderArray = [];

fileManager = {
  read: function () {
    const stat = fs.statSync("orderData.json");
    var rawdata = fs.readFileSync("orderData.json");
    ServerOrderArray = JSON.parse(rawdata);
  },
  write: function () {
    let data = JSON.stringify(ServerOrderArray);
    fs.writeFileSync("orderData.json", data);
  },
};
// serve files from the public directory
app.use(express.static("public"));
app.use(express.json());

app.listen(3000, () => {
  console.log("listening on 3000");
});

// serve the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//serve the submit 1 order
app.post("/submitOrder1", (req, res) => {
  const order = req.body;
  console.log("Received order:", order);
  res.json({ message: "Order added successfully." });
});
