const express = require('express')
const zod = require('zod')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
const { User,Account } = require('../db')
const { authMiddleware } = require('../middleware')
const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname:zod.string(),
    password:zod.string()
});

router.post('/signup', async(req,res) => {
    const { success } = signupBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"Email already taken / Incorrect input"
        })
    }
    const existingUser = await User.findOne({
        username:req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message:"Email already taken / Incorrect input"
        })
    }

    const user = await User.create({
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:req.body.password
    })

    const userId = user._id;
    await Account.create({
        userId,
        balance : 1+Math.random()*10000
    })
   
    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message:"User created successfully",
        token:token
    });
})

const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
});

router.post('/signin',async(req,res) => {
    const { success } = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        });
    }
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    });
    if(!user){
        return res.status(401).json({
            message:"Invalid credentials"
        });
    }
    const token = jwt.sign({
        userId:user._id
    },JWT_SECRET)
    res.json({
        message:"User signed in successfully",
        token:token
    })
})

const updateBody = zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
});

router.put('/',authMiddleware, async(req,res) => {
    const { success } = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    await User.updateOne({_id:req.userId},req.body);

    res.json({
        message:"User updated successfully"
    })
});

router.get('/bulk', async (req,res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstname:{
                "$regex":filter 
            },
        },{
            lastname:{
                "$regex":filter
            }
        }]
    })
    res.json({
        user:users.map( user => ({
            id:user._id,
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname
        })
    )
    })
})

module.exports = router;