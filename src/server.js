const express = require("express");
const app = express();

// The port on which it will be served
const PORT = process.env.PORT || 3000;

// An example route
app.get("/", (req, res) => {
  return res.send("Hello world");
});

// The port listener
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
