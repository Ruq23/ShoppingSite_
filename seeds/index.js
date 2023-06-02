const mongoose = require ('mongoose');
const Inventory = require('../models/inventory')
mongoose.connect('mongodb://localhost:27017/shopAppGH', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
});


const seedData = [
    {
       category: 'Gadgets' ,
       brand: 'Apple',
       name: 'iPhone 13',
       price: 500000,
       specifications: 'The Brand New iPhone 13 128gb comes with the A15 Bionic Chip and the first diagonal rear camera. It comes with 4GB RAM and a wonderful 12MP Selfie Camera. It also supports Face ID, E-Sim  and has the all new 5G network compatibility',
       image: [
        {
            url: '../public/images/Rectangle 195' ,
            filename: 'iPhone 143'
        }
    ],
    }
]

Inventory.insertMany(seedData)
.then(res => {
    console.log(res)
}).catch(e => {
    console.log(e)
})