// const { required } = require('joi');
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Inventory = require('./inventory');



// const cartSchema = new Schema({
//     author: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     items: [{
//         itemId: {
//             type: Schema.Types.ObjectId,
//             ref: 'Inventory',
//             required: true
//         },
//         name: String,
//         quantity: {
//             type: Number,
//             required: true,
//             min: 1,
//             default: 1
//         },
//         price: Number
//     }],
//     totalBill: {
//         type: Number,
//         required: true,
//         default: 0
//     }
// }, {
//     timestamps: true
// })

// module.exports = mongoose.model('Cart', cartSchema);


module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.reduceByOne = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if(this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.removeItem = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    this.generateArray = function () {
        const arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};