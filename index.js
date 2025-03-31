// mongoose is a ODM library for MongoDB and Node.js
const mongoose = require("mongoose");

//  Connect MongoDB
mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Connection Error:", err));

// Schema Ko Global Define Karna Zaroori Hai
const ShopSchema = new mongoose.Schema({
  name: String,
  Age: Number,
});

// Model Define Karna hai globally
const ShopSchema1 = mongoose.model("shop", ShopSchema, "shop");

// Function to Save Data in DB
const SaveInDB = async () => {
  let data = new ShopSchema1({
    name: "shivam2",
    Age: 20,
  });
  let result = await data.save();
  console.log("Inserted:", result);
};
// SaveInDB()

// Function to Update Data in DB
const updateInDB = async () => {
  let data = await ShopSchema1.updateOne(
    { name: "shivam2" },
    { $set: { name: "shivam3", Age: 30 } }
  );
  console.log("Updated:", data);
};
// updateInDB();

// Function to Delete Data in DB
const deleteInDb = async () => {
  let data = await ShopSchema1.deleteOne({ name: "shivam3" });
  console.log(data);
  console.log("Deleted:", data);
};
// deleteInDb();

// Function to Find Data in DB
const findInDb = async () => {
  let data = await ShopSchema1.find({ name: "Shubham Vishwakarma" });
  console.log(data.length > 0 ? "Data Found" : "No Data Found", data);
};
// findInDb();

// -------------------------------------------------------------------------------------------------------------------------------------------------

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
