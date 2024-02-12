const express = require("express");
const userRouter  = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const zod = require("zod");
const authMiddleware = require("../middleware");
const Account = require("../models/Account");

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName : zod.string(),
    password: zod.string()
});

const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
});

userRouter.post("/signup",async(req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message:"Email already taken/Incorrect Inputs"
        })
    }

    const existingUser = await User.findOne({
        username:req.body.username
    });

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user =  await User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    });
    
    const userID = user._id;
    const bal = Math.floor(Math.random() * (10000)) + 1;
    const accountDetails = await Account.create({
        userId:userID,
        balance:bal
    });
    const token = jwt.sign({
        userID
    },process.env.JWT_SECRET);

    return res.status(200).json({
        message:"User created successfully",
        token:token
    });

})

userRouter.post("/signin",async(req,res)=>{
   const {success} = signinBody.safeParse(req.body);
   if(!success){
        return res.status(411).json({
            message:"Error while logging in",  
        });
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    });

    if(!user){
        return res.status(411).json({
            message:"Error while logging in",  
        });
    }

    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET);

    return res.status(200).json({
        token: token
    })



})

const updatedBody = zod.object({
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().optional()
});



userRouter.put("/",authMiddleware,async(req,res)=>{

    const success = updatedBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body,{
        _id:req.userId
    });

    return res.status(200).json({
        msg:"Details updated successfully!!"
    })


})

userRouter.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || ""
    // console.log("filter ",filter);
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]


    });

    return res.status(200).json({
        user : users.map(user =>({
            username : user.username,
            firstName : user.firstName,
            lastName  : user.lastName,
            _id: user._id
        }))

    })
})


module.exports = userRouter;