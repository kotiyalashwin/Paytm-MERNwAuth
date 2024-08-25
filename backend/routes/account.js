const express = require("express");
const { authMiddleware } = require("./authMidddleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne();

  res.status(400).json({
    balance: account.balance,
  });
});

//tranfer

// accountRouter.post("/transfer", authMiddleware, async (req, res) => {
//   const { to, amount } = req.body;

//   const account = Account.findOne({ userId: req.userId });

//   if (account.balance < amount) {
//     return res.status(400).json({ message: "Insufficient balance" });
//   }

//   const toAccount = Account.findOne({ usrId: to });

//   if (!toAccount) {
//     return res.status(400).json({
//       messsage: "Invalid account",
//     });
//   }

//   await Account.updateOne(
//     {
//       userId: req.userId,
//     },
//     {
//       $inc: {
//         balance: -amount,
//       },
//     }
//   );

//   await Account.updateOne({
//     userId: to,
//   },  {
//     $inc :{
//         balacne : amount
//     }
//   });
// });

//But this method is bad solution as it does not check for errors,, hence we use TRANSACTIONS in DB
//we use session().. startTransition() ...  abortTransition() ... commitTransition()

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  //Initiate a SESSION
  const session = await mongoose.startSession();

  //Start a transaction
  session.startTransaction();
  const { to, amount } = req.body; // to here is the id in database

  //find account within this session
  const account = Account.findOne({ userId: req.userId }).session(session);

  if (!account || account.balance < amount) {
    //also abort the transaction when error occurs
    await session.abortTransaction();
    return res.status(400).json({ message: "Insufficient balance" });
  }

  const toAccount = Account.findOne({ usrId: to }).session(session);

  if (!toAccount) {
    //abort transaction

    await session.abortTransaction();
    return res.status(400).json({
      messsage: "Invalid account",
    });
  }

  //Transfer if everything above goes right
  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balacne: amount,
      },
    }
  ).session(session);

  //Commit the transaction

  await session.commitTransaction();
  res.status(200).json({
    message: "Transaction successfull",
  });
});

module.exports = accountRouter;
