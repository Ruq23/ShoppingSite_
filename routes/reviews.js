const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync')
const ExpressError = require('../utilities/ExpressError')
const Inventory = require('../models/inventory');
const { inventorySchema } = require('../schemas.js');
const { reviewSchema } = require('../schemas.js');
const Review = require('../models/review');
// const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const { validateReview } = require('../middleware');
const { isLoggedIn } = require('../middleware');
const { isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews')

// const validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if(error){
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     }else {
//         next();
//     }
// }

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.newReview))



router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.destroyReview ))


module.exports = router;
