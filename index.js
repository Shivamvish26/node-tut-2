const express = require("express");
const multer = require("multer");
require("./config");
require("./contact");
const app = express();
const Product = require("./shop");
const contact = require("./contact");
app.use(express.json());
const fs = require("fs");
const os = require("os");

// console.log(os.arch());
// console.log(os.freemem() / (1024 * 1024 * 1024));
// console.log(os.totalmem() / (1024 * 1024 * 1024));
// console.log(os.hostname());
// console.log(os.platform());
// console.log(os.userInfo());

// Creating a directory for uploads if it doesn't exist
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Upload configuration using multer function
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + ".jpg");
    },
  }),
}).single("user_form");

// POST API
app.post("/create", async (req, resp) => {
  let data = new Product(req.body);
  let result = await data.save();
  console.log(result);
  resp.send(result);
});

// POST API FOR UPLOAD
app.post("/upload", (req, resp) => {
  upload(req, resp, (err) => {
    if (err) {
      return resp.status(500).send("File Upload Failed: " + err.message);
    }
    resp.send("File Uploaded Successfully: " + req.file.filename);
  });
});

// CONTACT API
app.post("/contact", async (req, resp) => {
  let data = new contact(req.body);
  let result = await data.save();
  resp.send(result);
  console.log(result);
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
