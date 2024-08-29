const express = require("express");
const mainRouter = require("./routes/index.js");
const cors = require("cors");
const { authMiddleware } = require("./routes/authMidddleware.js");
const app = express();

app.use(cors());
app.use(express.json()); // body-parser

app.use("/api/v1", mainRouter); // want to send all the request after this url to ./routes/index.js

app.get("/", (req, res) => {
  const authHead = req.headers.authorization;

  if (!authHead || !authHead.startsWith("Bearer ")) {
    return res.json({ path: "/signup" });
  }

  return res.json({ path: "/dashboard" });
});

app.listen(3000);
