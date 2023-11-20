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
const cartRoutes = require('./routes/cart')
const categoryRoutes = require('./routes/category')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const { isAuthor } = require('./middleware.js');
const cart = require('./models/cart.js');
const PORT = process.env.PORT || 3000;
const mongoSanitize = require('express-mongo-sanitize');
// const mongoStore = require('connect-mongo')(session);


// mongoose.connect('mongodb://localhost:27017/shopAppGH', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.connect('mongodb://mongo:vhwFwpXbFqED2wvouJam@containers-us-west-28.railway.app:6624', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connect(process.env.MONGODB_CONNECT_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

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

app.use(mongoSanitize({
    replaceWith: '_'
}))

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
app.use('/', cartRoutes);
app.use('/', categoryRoutes);
app.use('/list', listRoutes);
app.use('/list/:id/reviews', reviewRoutes)



app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
} )

app.use((err, req, res, next) => {
    const{statusCode = 500} = err
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error.ejs', { err });
    // res.status(statusCode).send('Error')
})

app.listen(PORT, () => {
    console.log('Serving on port ' + PORT)
})