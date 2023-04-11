const express = require("express");

const app = express();
var fs = require("fs");

app.use(express.static("public"));
app.use(express.json());

app.listen(3000, () => {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/submitOrder1", (req, res) => {
  const order = req.body;
  console.log("Received order:", order);
  // res.json({ message: "Order added successfully." });

  const orderStrValue = JSON.stringify(order) + "\n";
  fs.appendFile("orders.txt", orderStrValue, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to write order to file." });
    } else {
      res.json({ message: "Order submitted and written to file." });
    }
  });
});
