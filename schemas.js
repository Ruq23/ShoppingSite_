const Joi = require('joi')

module.exports.inventorySchema = Joi.object({
    inventory: Joi.object({
        category: Joi.string().required(),
        brand: Joi.string().required(),
        name: Joi.string().required(),
        // image: Joi.string().required(),
        price: Joi.number().required().min(0),
        specifications: Joi.string().required(),
    }).required(),
    deleteImages: Joi.array()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        name: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})

