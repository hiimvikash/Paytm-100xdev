const zod = require("zod");
const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const {Account} = require('../models/accountModel');

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})
const handleUserSignup = async (req, res) => {
    const obj = signupBody.safeParse(req.body)
    console.log(obj);
    if (!obj.success) {
        return res.status(411).json({
            message: "Invalid Input"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create(req.body)
    const userId = user._id;
    
    /// ----- Create new account ------

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
        
    // -----  ------

    const token = jwt.sign({
        userId,
        username : req.body.username
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
}
// -------------------------------------------------------------------------------------------
const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

const handleUserSignin = async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
}
//---------------------------------------------------------------------------------------------------------------------
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})
const handleUserUpdate = async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
}
//----------------------------------------------------------------------------------------------------------------------
const filterUserQuery = async (req, res) => {
    const filter = req.query.filter || "";

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
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}



module.exports = {handleUserSignup, handleUserSignin, handleUserUpdate, filterUserQuery}