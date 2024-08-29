const express = require("express");
const { sign } = require("jsonwebtoken");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("./authMidddleware");
const userRouter = express.Router();

const signupSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  username: zod.string(),
  password: zod.string(),
});

const signinSchema = zod.object({
  userName: zod.string(),
  password: zod.string(),
});

//for optional in input we use zod.string().optional()

const updateSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

userRouter.post("/signup", async (req, res) => {
  const body = await req.body;
  const { success } = signupSchema.safeParse(body); //ZOD

  //check if the input in the body are incorrect
  if (!success) {
    return res.json({
      message: "wrong inputs",
    });
  }

  //this will return us a user with the same username as in the body
  const user = User.findOne({
    username: body.username,
  });

  //CHECK if user already exist in the database
  if (user._id) {
    return res.json({
      message: "user already exist",
    });
  }

  const dbUser = await User.create(body);
  const userId = dbUser._id;

  //initialise an account with balance bewtween 1-1000
  await Account.create({
    // DB.create()
    userId,
    balance: 1 + Math.random() * 1000,
  });

  const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET); //JWT token creation
  res.json({
    message: "user added successfully",
    token: token,
  });
});

userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Invalid Input",
    });
  }

  const userExist = await User.findOne({
    username: body.username,
  });

  if (userExist) {
    if (
      body.username != userExist.username ||
      body.passwod != userExist.password
    ) {
      return res.status(411).json({
        message: "Wrong Credentials",
      });
    }

    const token = jwt.sign({ userId: userExist._id }, JWT_SECRET);
    res.json({
      token: token,
    });
  }
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);

  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne(req.body, { id: req.userId });

  res.json({
    message: "Updated Succesfully",
  });
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const loggedId = req.userId;
  // console.log(loggedId);

  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    id: loggedId,
    user: users
      .filter((s) => s.id !== loggedId)
      .map((user) => ({
        username: user.username,
        firstName: user.firstname,
        lastName: user.lastname,
        _id: user._id,
      })),
  });
});

userRouter.get("/admin", authMiddleware, async (req, res) => {
  const user = await User.find({ _id: req.userId });
  res.json({
    user,
  });
});

module.exports = userRouter;
