import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Payment = () => {

    const { token, data, orderId, setCart, cart } = useContext(AppContext)
    const nav = useNavigate()

    const totalPrice = () => {
        let total = 0
        data?.userData?.cart?.forEach(ele => {
            total += ((ele.product.price - ele.product.price * ele.product.discountPercentage / 100) * ele.quantity)
        })
        return total.toFixed(0)
    }
    const clearCart = async () => {
        try {
            let res = await axios.put(`${process.env.REACT_APP_ORIGIN}delete-cart/${data.userData._id}`)
            if (res.data.success) {
                console.log("cart cleared")
                console.log(res.data)
                setCart(!cart)
                nav('/orders')
            }
        }
        catch (err) {
            console.log("error", err)
        }
    }
    const placeOrder = async () => {
        try {
            let res = await axios.post(`${process.env.REACT_APP_ORIGIN}order/${data?.userData?._id}`,
                {
                    cart: data.userData.cart,
                    name: data.userData.name,
                    amountPaid: totalPrice(),
                    shippingAddress: data.userData.address.filter(add => add.selected === true)
                }
            )
            if (res.data.success) {
                console.log("-------Order Placed-------")
                clearCart();
            }
        }
        catch (err) {
            console.log("error", err.message)
        }
    }
    const handlePayment = () => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY,
            amount: totalPrice(), 
            currency: "INR", 
            name: data?.userData?.name,
            description: `Payment for your order ${orderId}`,
            order_id: orderId,
            handler: async (response) => {
                try {
                    // Send the payment ID and order ID to your server for verification
                    const data = {
                        payment_id: response.razorpay_payment_id,
                        order_id: orderId,
                    };

                    let res = await axios.post(`${process.env.REACT_APP_ORIGIN}payment/verify-payment`, data);
                    console.log(res)
                    if(res.data.success){
                        placeOrder();
                    }

                } catch (error) {

                    console.error("Error verifying payment:", error);
                }
            },
            prefill: {
                name: "",
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    useEffect(() => {
        if (!token || data?.userData?.cart.length === 0 || !orderId) {
            return (nav('/login'))
        }
        orderId && handlePayment()
    })
    return (
        <div>
            {!orderId && <button onClick={() => nav('/place-order')} className="text-center mt-20">Something went wrong ! <span className="text-blue-600 underline underline-offset-2 ml-1">Go Back</span></button>}
        </div>
    );
};

export default Payment;
