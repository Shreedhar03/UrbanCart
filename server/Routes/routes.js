const express = require('express')
const router = new express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const product = require('../Database/Models/productSchema')
const userModel = require('../Database/Models/users')

// delete all users

router.get('/deleteusers', (req, res) => {
    userModel.deleteMany({}).then(() => {
        console.log("deleted")
        res.json({ deleted: true })
    })
})

// Category wise Data

router.get('/category/:id', async (req, res) => {
    let id = req.params.id;
    // res.json({"hello":true})
    try {
        const data = await product.find({
            category: { $regex: new RegExp(id, 'i') },
        }).exec();

        res.status(200).json(data)

    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ message: "Not found" })
    }
})

// Single Product Data

router.get('/product/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const response = await product.findById(id)
        res.json(response);
    }
    catch (err) {
        res.json({ message: "Not fonud" })
        console.log(err.message);
    }
})

// Registration

router.post('/register', (req, res) => {
    let { name, email, contact, password, confirmPassword, address } = req.body;
    let newPassword, newConfirmPassword;
    bcrypt.genSalt((err, salt) => {
        if (err) {
            console.log(err);
        }
        else {
            bcrypt.hash(password, salt, (err, hashedPassword) => {
                newPassword = hashedPassword;
            })
            bcrypt.hash(confirmPassword, salt, (err, hashedPassword) => {
                newConfirmPassword = hashedPassword;
            })
        }
    })

    userModel.findOne({ email })
        .then(user => {
            if (user) {
                res.json({ success: false, userIsPresent: true });
            }
            else {
                const newUser = new userModel({
                    name, email, contact, "password": newPassword, "confirmPassword": newConfirmPassword, address
                })

                newUser.save()
                    .then((savedUser) => {
                        res.json({ success: true, userIsPresent: false, data: savedUser });
                    })
                    .catch((err) => {
                        res.status(400).json({ success: false, err: err });
                    });
            }
        })

})

// Login

router.post('/login', (req, res) => {
    let { email, password } = req.body;

    userModel.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const authToken = jwt.sign({ userID: user._id }, process.env.SECRET)
                        console.log("result = ", result)
                        res.status(200).json({ user: true, data: user, authToken })
                    }
                    else {
                        res.json({ user: false })
                    }
                })
            }
            else {
                res.json({ user: false })
            }
        }).catch(err => {
            res.status(400).json({ error: err })
        })
})

// middleware to verify user

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ status: false, error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token', status: false });
        }

        userModel.findOne({ _id: decoded.userID })
            .then(userData => {
                if (userData) {
                    req.user = userData
                    console.log("userData = ", userData)
                    next();
                }
            }).catch(err => {
                console.log(err)
            })
        console.log("decoded = ", decoded)

    })
}

// Get user data
router.get('/user', verifyToken, (req, res) => {
    res.json({ userData: req.user, status: true })
})

// Delete User

router.delete('/delete/:id', async (req, res) => {
    let { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
        res.json({ message: "User not found" })
    }
    res.json({ message: "User Deleted" })

})

// Update Password

router.put('/update-password/:id', async (req, res) => {
    let { id } = req.params;

    const { oldPassword, newPassword } = req.body

    let user = await userModel.findById(id);

    let isMatch = await bcrypt.compare(oldPassword, user.password)

    if (!isMatch) {
        res.json({ error: 'Invalid current password', success: false });
    }
    else {

        let newHashedPass = await bcrypt.hash(newPassword, 10)
        user.password = newHashedPass;
        user.confirmPassword = newHashedPass;
        await user.save();
        res.json({ message: 'Password updated successfully', success: true });
    }

})
module.exports = router