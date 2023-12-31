const express = require('express')
const router = new express.Router();
const mongoose = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const bcrypt = require('bcrypt')
// const initialData = require('../Database/initialData')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const productModel = require('../Database/Models/productSchema')
const userModel = require('../Database/Models/users')
const orderModel = require('../Database/Models/orderSchema')
const razorpay = require('./utils/razorpay')
const moment = require('moment')
require('moment-timezone')

moment.tz.setDefault("Asia/Kolkata")

console.log(moment().format('YYYY MMM DD, HH:mm:ss'))

// get all products
router.get('/api/allproducts', async (req, res) => {
    try {
        let products = await productModel.find({}).sort({ createdAt: -1 })
        res.status(200).json({ success: true, products })
    }
    catch (err) {
        res.json({ success: false })
    }
})
// Category wise Data
router.get('/api/category/:id', async (req, res) => {
    let id = req.params.id;
    // res.json({"hello":true})
    try {
        const data = await productModel.find({
            category: { $regex: new RegExp(id, 'i') },
        }).sort({ createdAt: -1 }).exec();

        res.status(200).json(data)

    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ message: "Not found" })
    }
})
// register
router.post('/api/register', async (req, res) => {
    try {
        let { name, username, contact, password } = req.body;

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
            });

            const savedUser = await newUser.save();
            console.log(savedUser);
            res.json({ success: true, userIsPresent: false, data: savedUser });
        }
    } catch (err) {
        res.status(404).json({ success: false, error: err });
    }
});
// add new shipping address
router.put('/api/add-address/:userID', async (req, res) => {
    try {
        const { userID } = req.params
        console.log(userID)
        const { title, fName, lName, contact, flatNo, building, landmark, area, city, state, pin } = req.body.address
        const user = await userModel.findById(userID)
        if (user) {
            console.log(user)
            user.address = [...user.address, { title, fName, lName, contact, flatNo, building, landmark, area, city, state, pin }]
            // OR //
            // user.address.push({title, fName, lName, contact, flatNo, building, landmark, area, city, state, pin})
            await user.save()
            res.json({ success: true, address: user.address })
        }
    }
    catch (err) {
        res.json({ success: false, error: err });
    }
})
// select-delete the shipping address
router.put('/api/set-address/:userID', async (req, res) => {
    try {
        const { userID } = req.params
        const { title } = req.body.address
        const { toBeDeleted } = req.body

        const user = await userModel.findById(userID)
        if (user) {
            // console.log(user)
            let selectedAddr = user.address.findIndex(p => p.title == title)
            if (toBeDeleted) {
                user.address.splice(selectedAddr, 1)
                await user.save()
                return res.json({ success: true, deleted: true, selectedAddr })
            }
            console.log(user.address[selectedAddr])
            user.address[selectedAddr].selected = true
            user.address.forEach((addr) => {
                if (addr.title != title)
                    addr.selected = false
            })
            await user.save()
            res.json({ success: true, isSet: true, selectedAddr: user.address[selectedAddr] })
        }
    }
    catch (err) {
        res.json({ success: false, error: err });
    }
})
// Login
router.post('/api/login', (req, res) => {
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
        return res.status(400).json({ success: false, error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.json({ success: false })
        }

        userModel.findOne({ _id: decoded.userID })
            .then(userData => {
                if (userData) {
                    req.user = userData
                    req.success = true
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
router.get('/api/user', verifyToken, (req, res) => {
    res.json({ userData: req.user, success: req.success })
})
// Delete User
router.delete('/api/delete/:id', async (req, res) => {
    let { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
        res.json({ message: "User not found" })
    }
    res.json({ message: "User Deleted" })

})
// Update Password
router.put('/api/update-password/:id', async (req, res) => {
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
        const currentTime = moment().format("MMM DD, YYYY [at] HH:mm")
        user.message = [...user.message, { message: "Your password has been updated !", time: currentTime, category: "security" }]
        await user.save();
        res.json({ message: 'Password updated successfully', success: true });
    }

})
// update details 
router.put("/api/update-:field/:id", async (req, res) => {
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
router.put('/api/add/:user_id/:product_id', async (req, res) => {
    const { user_id, product_id } = req.params;
    try {
        let user = await userModel.findById(user_id);
        let initialProduct = await productModel.findById(product_id)
        let product = user.cart.find((p) => p.product._id == product_id);

        if (product) {
            console.log(product.quantity, "-----", initialProduct.stock)
            if (product.quantity >= initialProduct.stock) {
                return res.status(201).json({ success: true, outOfStock: true, stock: initialProduct.stock, message: "Maximum quantity" });
            }
            else {
                product.quantity += 1;
                // initialProduct.stock-=1
            }
            // console.log("Product quantity: ", product.quantity);
        } else {
            user.cart.push({ product: initialProduct, quantity: 1 });
        }
        // console.log("product=", product)

        await user.save();
        return res.status(201).json({ success: true, outOfStock: false, stock: initialProduct.stock, message: "Added" });
    } catch (err) {
        return res.json({ err: err.message });
    }
});
// remove / decrease Qty
router.put('/api/remove/:user_id/:product_id', async (req, res) => {

    const { user_id, product_id } = req.params

    let user = await userModel.findById(user_id)
    let productIndex = user.cart.findIndex(product => product.product._id == product_id)
    console.log(productIndex)
    if (user?.cart[productIndex]?.quantity === 1) {
        user.cart.splice(productIndex, 1);
    }
    else {
        user.cart[productIndex].quantity -= 1

    }
    await user.save();
    return res.status(201).json({ success: true, message: "Removed" });
})
// delete from cart
router.put('/api/edit-cart/:user_id/:product_id', async (req, res) => {
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
router.post('/api/order/:userID', async (req, res) => {
    let { userID } = req.params
    let { cart, amountPaid, name, shippingAddress } = req.body

    try {
        console.log("shippingAddress", shippingAddress)
        const newOrder = new orderModel({
            userID,
            name,
            cart,
            amountPaid,
            shippingAddress,
            status: "Pending"
        })
        console.log("cart=", cart)
        cart.forEach(async p => {
            let product = await productModel.findById(p.product._id)
            product.sold += 1
            if (product.stock > 0)
                product.stock = product.stock - p.quantity
            await product.save()
        })
        await newOrder.save()
        res.status(200).json({ success: true })

    }
    catch (err) {
        console.log(err.message)
        res.json({ success: false })
    }
})
// remove from cart
router.put('/api/delete-cart/:userID', async (req, res) => {
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
// retrieve user order history
router.get('/api/get-orders/:userID', async (req, res) => {
    const userID = req.params.userID
    // console.log(userID)
    try {
        let order = await orderModel.find({ userID: userID }).sort({ createdAt: -1 })
        // console.log(order)
        res.status(200).json({ success: true, order })

    }
    catch (err) {
        console.log(err.message)
        res.json({ success: false })
    }
})
// retrieve admin orders
router.get('/api/admin/get-orders', async (req, res) => {
    try {
        let order = await orderModel.find({}).sort({ createdAt: -1 })
        // console.log(order)
        res.status(200).json({ success: true, order, total: order.length })
    }
    catch (err) {
        console.log(err.message)
        res.json({ success: false })
    }
})
router.put('/api/admin/edit-order/:userID/:id', async (req, res) => {
    try {
        const { id, userID } = req.params;
        let order = await orderModel.findById(id);
        let user = await userModel.findById(userID);

        if (!order || !user) {
            return res.status(404).json({ success: false, message: 'Order or user not found' });
        }

        order.status = "Delivered";
        const currentTime = moment().format("MMM DD, YYYY [at] HH:mm")
        user.message = [...user.message, { message: `Your order with ID ${id} has been delivered !`, time: currentTime, category: "delivery" }]

        await Promise.all([order.save(), user.save()]);

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// mark message as read
router.put('/api/mark-as-read/:userID', async (req, res) => {
    const { userID } = req.params;
    try {
        let user = await userModel.findById(userID)
        if (!user) {
            return res.status(404).json({ success: false })
        }

        user.message.forEach((message) => {
            message.isRead = true
        })
        await user.save();
        res.json({ success: true })

    }
    catch (err) {
        res.json({ err })
        console.log(err)
    }
})
// get admin data
router.get('/api/admin-data', async (req, res) => {
    let users = await userModel.find({})
    let products = await productModel.find({})
    let sale = await orderModel.find({})
    let totalSale = 0
    const sum = sale.forEach(s => totalSale += s.amountPaid)
    res.json({ 'users': users.length - 1, totalSale, orders: sale.length, products: products.length })
})
// add-product Admin
router.post('/api/admin/add-product', async (req, res) => {
    try {
        let { title, description, rating, price, discountPercentage, stock, category, brand } = req.body.productInfo
        let { existingProduct } = req.body
        if (existingProduct) {
            console.log("existingProduct = ", existingProduct)
            const productId = new ObjectId(existingProduct)
            console.log("productId=", productId)
            let updatedProduct = await productModel.findByIdAndUpdate(
                existingProduct,
                {
                    title, description, rating, price, discountPercentage, stock, category, brand, images: req.body.productInfo.images
                },
                { new: true }
            );
            return res.status(201).json({ success: true, "Updated product ": updatedProduct })
        }
        let imageUrls = req.body.productInfo.images.split(" ")
        let newProduct = new productModel({ title, description, rating, price, discountPercentage, stock, category, brand, images: imageUrls })
        await newProduct.save();
        res.status(201).json({ success: true, "newProduct=": newProduct })
    }
    catch (err) {
        res.json({ err })
        console.log(err)
    }
})
// delete product
router.delete('/api/delete-product/:id', async (req, res) => {
    try {
        let { id } = req.params
        let deletedproduct = await productModel.findByIdAndDelete(id)
        res.json({ deletedproduct, success: true })
    }
    catch (err) {
        res.json({ success: false })
        console.log(err)
    }
})

// create payment order
router.post('/api/payment/create-order', async (req, res) => {
    let amount = req.body.amount * 100;
    let currency = "INR";
    let receipt = "UrbanCart order"
    try {
        const order = await razorpay.orders.create({
            amount, currency, receipt
        })
        res.status(201).json(order)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Failed to create order" });
    }
})

// verify payment
router.post("/api/payment/verify-payment", async (req, res) => {
    const { payment_id, order_id } = req.body;

    try {
        const payment = await razorpay.payments.fetch(payment_id);

        if (payment.order_id === order_id && payment.status === "captured") {
            res.json({ message: "Payment successful", success: true });
        } else {
            res.status(400).json({ error: "Payment verification failed", success: false });
        }
    } catch (error) {
        res.status(500).json({ error: "Payment verification failed" });
    }
});

// add sold field to all products
router.post('/api/update-product-collection', async (req, res) => {
    let updated = await productModel.updateMany(
        {},
        {$set:{sold:0}}
    )
    res.json({updated})
})

module.exports = router