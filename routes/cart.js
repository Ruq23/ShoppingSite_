// const express = require('express');
// const catchAsync = require('../utilities/catchAsync')
// const Cart = require('../models/cart');
// const { validateInventory } = require('../middleware');
// const { isLoggedIn } = require('../middleware');
// const { isAuthor } = require('../middleware');
// const router = express.Router();
// const carts = require('../controllers/cart')

// router.route('/')
//     .get(isLoggedIn, catchAsync(carts.getCart))
//     .post(isLoggedIn, catchAsync(carts.addCart))
//     .delete(isLoggedIn, catchAsync(carts.deleteCart))




// module.exports = router;

const express = require('express');
const router = express.Router();

const Cart = require('../models/cart');
// const inventory = require('../models/inventory');
const Inventory = require('../models/inventory');

router.get('/cart/add-to-cart/:id', async(req, res) => {
    const inventoryId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    const inventory = await Inventory.findById(inventoryId)
    Inventory.findById(inventoryId, function (err, product) {
        if(err) {
            return res.redirect('/');
        }
        cart.add(inventory, inventory.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/list');
    })
});

router.get('/cart/reduce/:id', function (req, res, next) {
    const inventoryId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(inventoryId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/cart/remove/:id', function (req, res, next) {
    const inventoryId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(inventoryId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/cart', function (req, res, next) {
    if(!req.session.cart) {
        return res.render('cart', {inventories: null});
    }
    const cart = new Cart(req.session.cart);
    return res.render('cart', {inventories: cart.generateArray(), totalPrice: cart.totalPrice});
});

module.exports = router;