const express = require('express');
const catchAsync = require('../utilities/catchAsync')
const Inventory = require('../models/inventory');
const { validateInventory } = require('../middleware');
const { isLoggedIn } = require('../middleware');
const { isAuthor } = require('../middleware');
const router = express.Router();
const inventories = require('../controllers/list')
const multer  = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })



router.route('/')
    .get(catchAsync(inventories.index))
    .post(isLoggedIn, upload.array('image'), validateInventory, catchAsync(inventories.newProduct))


router.get('/new', isLoggedIn, inventories.newProductForm)

router.route('/:id')
    .get(catchAsync(inventories.showProduct))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateInventory, catchAsync(inventories.editProduct))
    .delete(isLoggedIn, isAuthor, catchAsync(inventories.destroy))


router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(inventories.editProductForm))

router.get('/:id/reviews', catchAsync(inventories.showProductReviews))



module.exports = router;