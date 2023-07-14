const express = require('express')
const router = new express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// const initialData = require('../Database/initialData')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const productModel = require('../Database/Models/productSchema')
const userModel = require('../Database/Models/users')
const orders = require('../Database/Models/orderSchema')

// initialData()
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
        const data = await productModel.find({
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
        const response = await productModel.findById(id)
        res.json(response);
    }
    catch (err) {
        res.json({ message: "Not fonud" })
        console.log(err.message);
    }
})

// register

router.post('/register', async (req, res) => {
    try {
        let { name, username, contact, password, address } = req.body;

        const salt = await bcrypt.genSalt();
        let newPassword = await bcrypt.hash(password, salt);

        const user = await userModel.findOne({ username });

        if (user) {
            res.json({ success: false, userIsPresent: true });
        }
        else {
            const newUser = new userModel({
                name,
                username,
                contact,
                password: newPassword,
                address,
            });

            const savedUser = await newUser.save();
            console.log(savedUser);
            res.json({ success: true, userIsPresent: false, data: savedUser });
        }
    } catch (err) {
        res.status(404).json({ success: false, error: err });
    }
});

// Login

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    userModel.findOne({ username })
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
                    // console.log("userData = ", userData)
                    next();
                }
            }).catch(err => {
                console.log(err)
            })
        // console.log("decoded = ", decoded)

    })
}

// Get user data
router.get('/user', verifyToken, (req, res) => {
    res.json({ userData: req.user, success: true })
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
        res.json({ message: 'Invalid current password', success: false });
    }
    else {

        let newHashedPass = await bcrypt.hash(newPassword, 10)
        user.password = newHashedPass;
        user.confirmPassword = newHashedPass;
        await user.save();
        res.json({ message: 'Password updated successfully', success: true });
    }

})

// update details 

router.put("/update-:field/:id", async (req, res) => {
    let { field, id } = req.params;
    let updateInfo = req.body.field
    console.log(updateInfo)
    let user = await userModel.findById(id)
    if (user) {

        if (field === "username") {
            let existingUser = await userModel.findOne({ username: updateInfo })
            if (existingUser) {
                res.json({ success: false, message: "Username already taken" })
            }
            else {
                user[field] = updateInfo
                await user.save();
                res.status(200).json({ success: true, message: "Updated" })

            }
        } else {

            user[field] = updateInfo
            await user.save();
            res.status(200).json({ success: true, message: "Updated" })
        }
    }
    else {
        res.status(400).json({ success: false, message: "Something went wrong" })
    }

})

// add / increase Qty

router.put('/add/:user_id/:product_id', async (req, res) => {
    const { user_id, product_id } = req.params;

    try {
        let user = await userModel.findById(user_id);
        let initialProduct = await productModel.findById(product_id)
        let product = user.cart.find((p) => p.product._id == product_id);
        console.log("product=", product)
        if (product) {
            product.quantity += 1;
            // console.log("Product quantity: ", product.quantity);
        } else {
            user.cart.push({ product: initialProduct, quantity: 1 });
        }

        await user.save();
        return res.status(201).json({ success: true, message: "Added" });
    } catch (err) {
        return res.json({ err: err.message });
    }
});

// remove / decrease Qty
router.put('/remove/:user_id/:product_id', async (req, res) => {

    const { user_id, product_id } = req.params

    let user = await userModel.findById(user_id)
    let productIndex = user.cart.findIndex(product => product.product._id == product_id)
    console.log(productIndex)
    if (user.cart[productIndex].quantity === 1) {
        user.cart.splice(productIndex, 1);
    }
    else {
        user.cart[productIndex].quantity -= 1
    }
    await user.save();
    return res.status(201).json({ success: true, message: "Removed" });
})

// delete from cart

router.put('/edit-cart/:user_id/:product_id', async (req, res) => {
    let { user_id, product_id } = req.params

    try {
        let user = await userModel.findById(user_id)
        const index = user.cart.findIndex(p => p.product._id == product_id)
        user.cart.splice(index, 1)
        await user.save()
        res.json({ success: true })
    }
    catch (err) {
        res.json({ success: false, message: err.message })
    }
})

// place order

router.post('/order/:userID', async (req, res) => {
    let { userID } = req.params
    let { cart,amountPaid } = req.body

    try {
        const newOrder = new orders({
            userID,
            cart,
            amountPaid,
            status: "Pending"
        })
        await newOrder.save()
        res.status(200).json({ success: true })

    }
    catch (err) {
        console.log(err.message)
        res.json({ success: false })
    }
})

router.put('/delete-cart/:userID', async (req, res) => {
    let { userID } = req.params
    try {
        let user = await userModel.findById(userID)
        user.cart.splice(0) // or use user.cart.length=0

        await user.save()
        res.json({ success: true })
    }
    catch (err) {
        console.log(err.message)
        res.json({ success: false })
    }
})

// retrieve orders

router.get('/get-orders/:userID', async (req, res) => {
    const userID = req.params.userID
    // console.log(userID)
    try {
        let order = await orders.find({userID:userID})
        // console.log(order)
        res.status(200).json({ success: true , order })

    }
    catch (err) {
        console.log(err.message)
        res.json({ success: false })
    }
})
module.exports = router