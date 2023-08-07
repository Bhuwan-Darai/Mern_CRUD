const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//middleware to check incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://dhan:dhan@mernauth.kd8ptfb.mongodb.net/mernauth?retryWrites=true&w=majority",
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

//Db Schema and model
const postSchema = mongoose.Schema({
  title: String,
  description: String,
});

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  res.send("Server is ready!!!");
});

//api to send data from frontend to backend database
app.post("/create", (req, res) => {
  Post.create({
    title: req.body.title,
    description: req.body.description,
  })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

//api to send data back to frontend
app.get("/posts", (req, res) => {
  Post.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

//api to delete todo with requs params
app.delete("/delete/:id", (req, res) => {
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

//api to update
app.put("/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
    },
  )
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => console.log(err));
});

app.listen(8000, () => {
  console.log("Server is running !!!");
});
