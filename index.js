const mongoose = require("mongoose");

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/e-commerce");
  const ShopSchema = new mongoose.Schema({
    name: String,
  });
  const ShopSchema1 = mongoose.model("shop", ShopSchema);
  let data = new ShopSchema1({ name: "Raj" });
  let result = await data.save();
  console.log(result);
};

main();
