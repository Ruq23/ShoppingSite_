if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}



const express = require('express');
const path = require('path');
const mongoose = require ('mongoose');
const ejsMate = require('ejs-mate');
const { inventorySchema } = require('./schemas.js');
const { reviewSchema } = require('./schemas.js');
const catchAsync = require('./utilities/catchAsync')
const ExpressError = require('./utilities/ExpressError')
const Inventory = require('./models/inventory');
const Review = require('./models/review');
const User = require('./models/user');
const methodOverride = require('method-override');
const { stat } = require('fs');
const bcrypt = require('bcrypt');
const user = require('./models/user');
const session = require('express-session')
const listRoutes = require('./routes/list')
const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const { isAuthor } = require('./middleware.js');
const cart = require('./models/cart.js');
// const mongoStore = require('connect-mongo')(session);


mongoose.connect('mongodb://localhost:27017/shopAppGH', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    // store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 *60 * 24 * 7,
        maxAge: 1000 * 60 *60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session)
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   res.locals.session = req.session
   next();
})

//ROUTES

app.use('/', userRoutes);
app.use('/list', listRoutes);
app.use('/list/:id/reviews', reviewRoutes)



// const requireLogin = (req, res, next) => {
//     if(!req.session.user_id) {
//         res.redirect('/login')
//     }
//     next();
// }

// const validateInventory = (req, res, next) => {
//     const { error } = inventorySchema.validate(req.body);
//     if(error){
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     }else {
//         next();
//     }
// }

// const validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if(error){
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     }else {
//         next();
//     }
// }

// const categories = ['Electronics', 'Gadgets', 'Clothing', 'Automobile', 'Furniture', 'Food']

app.get('/', (req, res) => {
    res.send('Hello')
})


app.get('/add-to-cart/:id', async(req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart)

})
// app.get('/list', catchAsync(async (req, res) => {
//     const iventories = await Inventory.find({});
//     console.log(iventories)
//     res.render('inventories/index', { iventories });
// }))

// app.get('/list/new', (req, res) => {
//     res.render('inventories/new', {categories})
// })

// app.post('/list', validateInventory, catchAsync(async (req, res, next) => {
//     const inventory = new Inventory(req.body.inventory);
//     console.log(inventory)
//     await inventory.save();
//     res.redirect(`/list/${inventory._id}`)
// }))


// app.get('/list/:id', catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const inventory = await Inventory.findById(id).populate('reviews')
//     console.log(inventory);
//     res.render('inventories/show', { inventory })
//   }))

// app.get('/list/:id/edit', catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const inventory = await Inventory.findById(id)
//     res.render('inventories/edit', { inventory, categories })
//   }))

// app.put('/list/:id', validateInventory, catchAsync(async(req, res) => {
//     const { id } = req.params
//    const inventory = await Inventory.findByIdAndUpdate(id, { ...req.body.inventory });
//    console.log(req.body.inventory)
//    res.redirect(`/list/${inventory._id}`)
// }));

// app.delete('/list/:id', catchAsync(async(req, res) => {
//     const { id } = req.params;
//     await Inventory.findByIdAndDelete(id);
//     res.redirect('/list');
// }))

// app.post('/list/:id/reviews', validateReview, catchAsync( async(req, res) => {
//     const inventory = await Inventory.findById(req.params.id)
//     const review = new Review(req.body.review)
//     inventory.reviews.push(review)
//     await review.save()
//     await inventory.save()
//     res.redirect(`/list/${inventory._id}`)
// }))

// app.delete('/list/:id/reviews/:reviewId', catchAsync( async (req, res) => {
//     const { id, reviewId } = req.params
//     await Inventory.findByIdAndUpdate(id, {$pull: { reviews: reviewId }})
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/list/${id}`)

// }))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
} )

app.use((err, req, res, next) => {
    const{statusCode = 500} = err
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error.ejs', { err });
    // res.status(statusCode).send('Error')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})