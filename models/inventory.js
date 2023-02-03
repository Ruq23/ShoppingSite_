const mongoose = require ('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;


const ShopSchema = new Schema ({
    category: {
        type: String,
        required: true,
        enum:['Electronics', 'Gadgets', 'Clothing', 'Automobile', 'Furniture', 'Food'],
    },
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    specifications: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    image: [
        {
            url: String,
            filename: String
        }
    ],

});



ShopSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Shop', ShopSchema);
