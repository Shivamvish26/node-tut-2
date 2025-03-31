const express = require("express");
require("./config");
const Product = require("./shop");
const app = express();
app.use(express.json());

// POST API
app.post("/create", async (req, resp) => {
  let data = new Product(req.body);
  let result = await data.save();
  console.log(result);
  resp.send(result);
});

// GET API
app.get("/list", async (req, resp) => {
  let data = await Product.find();
  resp.send(data);
});

// Delete API
app.delete("/delete/:_id", async (req, resp) => {
  let data = await Product.deleteOne(req.params);
  resp.send(data);
});

// PUT API
app.put("/update/:_id", async (req, resp) => {
  let data = await Product.updateOne(
    //condition
    req.params,
    {
      // $set update data
      $set: req.body,
    }
  );
  resp.send(data);
});

// Search API
app.get("/search/:key", async (req, resp) => {
  console.log(req.params.key);
  let data = await Product.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  resp.send(data);
});

app.listen(5000);
