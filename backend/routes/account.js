const express = require("express");
const accountRouter = express.Router();
const authMiddleware = require("../middleware");
const Account = require("../models/Account");
const mongoose = require("mongoose")

accountRouter.get("/balance",authMiddleware,async(req,res)=>{
    const userId = req.userId;
    const accountDetails = await  Account.findOne({userId:userId});
    return res.status(200).json({
        balance : accountDetails.balance
    });
})

accountRouter.post("/transfer",authMiddleware,async(req,res)=>{
    const userId = req.userId;


    // we will be using transaction in database which means either all stuff will happenor none will happen

    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount,to} = req.body;

    const account = await Account.findOne({userId:userId}).session(session);
    if(!account  || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg : "Insufficient Balance"
        });
    }

    const toAccount  = await Account.findOne({userId:to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg : "Account Info doesn't matches"
        });
    }

    await Account.updateOne({userId:userId},{
        $inc:{
            balance : -amount
        }
    }).session(session);

    await Account.updateOne({userId:to},{
        $inc:{
            balance : amount
        }
    }).session(session);

    await session.commitTransaction();
    return res.status(200).json({
        msg : "Transfer Successful"
    });
})


module.exports = accountRouter;