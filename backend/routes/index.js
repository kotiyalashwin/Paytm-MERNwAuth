const express = require("express");

const mainRouter = express.Router();
const userRouter = require("./user.js");
const accountRouter = require("./account.js");

mainRouter.use("/user", userRouter);
mainRouter.use("/account", accountRouter);

module.exports = mainRouter;
