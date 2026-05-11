
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,

    key_secret: process.env.RAZORPAY_SECRET_KEY
});


// PLACE ORDER
const placeOrder = async (req, res) => {

    try {

        // Create order in DB
        const newOrder = new orderModel({

            userId: req.userId,

            items: req.body.items,

            amount: req.body.amount,

            address: req.body.address
        });

        await newOrder.save();

        // Clear Cart
        await userModel.findByIdAndUpdate(
            req.userId,
            { cartData: {} }
        );

        // Razorpay Order
        const options = {

            amount: req.body.amount * 100,

            currency: "INR",

            receipt: newOrder._id.toString()
        };

        const order = await razorpay.orders.create(options);

        res.json({

            success: true,

            order
        });

    } catch (error) {

        console.log(error);

        res.json({

            success: false,

            message: "Error"
        });
    }
};

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try{
        if (success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else {
            await orderModel.findByIdAndUpdate(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
       console.log(error);
       res.json({success:false,message:"Error"}); 
    }

}

// const userOrders = async (req,res) =>{
//     try{
//         const orders = await orderModel.find({userId:req.body.userId}) ;
//         res.json({success:true,data:orders})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }
const userOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({
            userId: req.userId
        });

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};

//Listing orders for admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}
// api for updating order status
const updateStatus = async (req,res) => {
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus };