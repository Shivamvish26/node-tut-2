// mongoose is a ODM library for MongoDB and Node.js
const mongoose = require("mongoose");

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/e-commerce");
  const ShopSchema = new mongoose.Schema({
    name: String,
    Age: Number,
  });
  const ShopSchema1 = mongoose.model("shop", ShopSchema, "shop");
  let data = new ShopSchema1({ name: "shivam2", Age: 20 });
  let result = await data.save();
  console.log(result);
};

main();

// mongoose is a ODM library for MongoDB and Node.js
// const mongoose = require("mongoose");

// const main = async () => {
//   await mongoose.connect("mongodb://localhost:27017/e-commerce");
//   const ShopSchema = new mongoose.Schema({
//     name: String,
//     Age: Number,
//   });
//   const ShopSchema1 = mongoose.model("shop", ShopSchema, "shop");
//   //   let data = new ShopSchema1({ name: "shivam2", Age: 20 });
//   let result = await ShopSchema1.create({
//     name: "shivam6",
//     Age: 20,
//   });
//   console.log(result);
// };

// main();
