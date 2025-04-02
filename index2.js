//Event and event Emitter
const express = require("express");
const EventEmitter = require("events"); //It is a class
const app = express();

const event = new EventEmitter(); //Creating an instance of EventEmitter class

let count = 0;

event.on("Count API Called", () => {
  count++;
  console.log("Count API Called Event Triggered", count);
});

app.get("/", (req, resp) => {
  resp.send("Api Called");
  event.emit("Count API Called");
});

app.get("/search", (req, resp) => {
  resp.send("Search Api Called");
  event.emit("Count API Called");
});

app.get("/update", (req, resp) => {
  resp.send("Update Api Called");
  event.emit("Count API Called");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
