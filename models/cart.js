// module.exports = function Cart(oldCart) {
//     this.items = oldCart.items;
//     this.totalQty = oldCart.totalQty;
//     this.totalPrice = oldCart.totalPrice;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Inventory = require('./inventory');



const CartSchema = new Schema({
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Inventory'
        }
    ],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('cart', CartSchema);
