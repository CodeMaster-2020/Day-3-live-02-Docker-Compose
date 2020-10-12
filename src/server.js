const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

mongoose
  .connect("mongodb://mongo:27017/test", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PostSchema = new mongoose.Schema({
  date: String,
  title: String,
  content: String,
});

const Post = mongoose.model("Post", PostSchema);

// The port on which it will be served
const PORT = process.env.PORT || 3000;

// An example route
app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.get("/post", (req, res) => {
  Post.find({}, function (err, post) {
    res.json(post);
  });
});

app.post("/post", (req, res) => {
  const { date, title, content } = req.body;
  const newPost = new Post({ date, title, content });
  newPost.save().then(() => {
    console.log({ requestBody: req.body });
  });
  res.json({ requestBody: req.body });
});

// The port listener
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
