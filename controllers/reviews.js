const Review = require('../models/review');
const Inventory = require('../models/inventory');



module.exports.newReview =  async(req, res) => {
    const inventory = await Inventory.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author = req.user._id;
    inventory.reviews.push(review)
    await review.save()
    await inventory.save()
    req.flash('success', 'Created a new review for this product')
    res.redirect(`/list/${inventory._id}`)
}

module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params
    await Inventory.findByIdAndUpdate(id, {$pull: { reviews: reviewId }})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review Deleted Successfully!')
    res.redirect(`/list/${id}`)

}