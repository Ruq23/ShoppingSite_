const express = require('express');
const { cart } = require('../middleware');
const Cart = require('../models/cart');
const Inventory = require('../models/inventory');


module.exports.getCart = async(req, res) => {
    const author = req.user._id

    try{
        const cart = await Cart.findOne({ author });
        if(cart && cart.items.length > 0){
            res.status(200).send(cart);
        }else {
            res.send(null)
        }
    }catch(e){
        res.status(500).send();
    }
};

module.exports.addCart = async(req, res) => {
    const author = req.user._id
    const { itemId, quantity } = req.body

    try{
        const cart = await Cart.findOne({ author })
        const item = await Inventory.findOne({ _id: itemId })

        if(!item) {
            res.status(404).send({message: "Not Found!"});
            return;
        }
        const price = item.price;
        const name = item.name;

        if(cart) {
            const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);

            if(itemIndex > -1){
                let product = cart.items[itemIndex];
                product.quantity += quantity;

                cart.totalBill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)

                cart.items[itemIndex] = product;
                await cart.save();
                res.status(200).send(cart);
            }
        }else {
            const newCart = await Cart.create({
                author,
                items: [{ itemId, name, quantity, price }],
                totalBill: quantity * price,
            });
            return res.status(201).send(newCart);
        }
    }catch(error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}

module.exports.deleteCart = async(req, res) => {
    const author = req.user._id;
    const itemId = req.query.itemId;
  try {
    let cart = await Cart.findOne({ author });

    const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
    
    if (itemIndex > -1) {
      let item = cart.items[itemIndex];
      cart.totalBill -= item.quantity * item.price;
      if(cart.totalBill < 0) {
          cart.totalBill = 0
      } 
      cart.items.splice(itemIndex, 1);
      cart.totalBill = cart.items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
    },0)
      cart = await cart.save();

      res.status(200).send(cart);
    } else {
    res.status(404).send("item not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
}