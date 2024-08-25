const express = require("express");
const mainRouter = require("./routes/index.js");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); // body-parser

app.use("/api/v1", mainRouter); // want to send all the request after this url to ./routes/index.js

app.listen(3000);
