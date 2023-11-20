
const express = require('express');
const router = express.Router();
const categories = require('../controllers/category')
const catchAsync = require('../utilities/catchAsync')



router.get('/', catchAsync(categories.home))

router.route('/gadgets')
    .get(catchAsync(categories.gadgets))

router.get('/fashion', catchAsync(categories.fashion))

router.get('/newin', catchAsync(categories.newin))



module.exports = router;