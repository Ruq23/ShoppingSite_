const Inventory = require('../models/inventory');
const catchAsync = require('../utilities/catchAsync')

module.exports.home = async(req, res) => {
    const inventories = await Inventory.aggregate([ { $sample: {size: 4} }]) 
    const inventoriess = await Inventory.aggregate([ { $sample: {size: 3} }]) 
    console.log(inventories)
    res.render('home', { inventories, inventoriess })
}

module.exports.gadgets = async(req, res) => {
    const { brand } = req.query
    if(brand) {
    const inventories = await Inventory.find({ category: 'Gadgets', brand: brand}).limit(3)
    const inventoriess = await Inventory.find({ category: 'Gadgets', brand: brand}).skip(6).limit(3)
    const inventoriesss = await Inventory.find({ category: 'Gadgets', brand: brand}).skip(9).limit(3)
    // const inventoriessss = await Inventory.find({ category: 'Gadgets', brand: brand}).skip(12).limit(3)
    // const inventoriesssss = await Inventory.find({ category: 'Gadgets', brand: brand}).skip(15).limit(3)
    // console.log(inventories)
    res.render('inventories/gadgetsfilter', { inventories, inventoriess, inventoriesss, brand  })
    }else {
    const inventoryAll = await Inventory.find({})
    const inventories = await Inventory.find({ category: 'Gadgets'}).limit(3)
    const inventoriess = await Inventory.find({ category: 'Gadgets'}).skip(3).limit(3)
    // const inventories = await Inventory.aggregate([ { $sample: {size: 3} }]) 
    // const inventoriess = await Inventory.aggregate([ { $sample: {size: 3} }]) 
    const inventoriesss = await Inventory.find({ category: 'Gadgets'}).skip(6).limit(3)
    const inventoriessss = await Inventory.find({ category: 'Gadgets'}).skip(9).limit(3)
    const inventoriesssss = await Inventory.find({ category: 'Gadgets'}).skip(12).limit(3)
    const inventoriessssss = await Inventory.find({ category: 'Gadgets'}).skip(15).limit(3)
    const inventoriesssssss = await Inventory.find({ category: 'Gadgets'}).skip(18).limit(3)
    const inventoriessssssss = await Inventory.find({ category: 'Gadgets'}).skip(21).limit(3)
    const inventoriesssssssss = await Inventory.find({ category: 'Gadgets'}).skip(24).limit(3)
    // console.log(inventoryAll)
    res.render('inventories/gadgets', { inventoryAll, inventories, inventoriess, inventoriesss, inventoriessss, inventoriesssss,inventoriessssss,inventoriesssssss,inventoriessssssss,inventoriesssssssss })
    }
}

module.exports.fashion = async(req, res) => { 
    const { brand } = req.query
    if(brand) {
    const inventories = await Inventory.find({ category: 'Fashion', brand: brand}).limit(3)
    const inventoriess = await Inventory.find({ category: 'Fashion', brand: brand}).skip(6).limit(3)
    const inventoriesss = await Inventory.find({ category: 'Fashion', brand: brand}).skip(9).limit(3)
    // const inventoriessss = await Inventory.find({ category: 'Fashion', brand: brand}).skip(12).limit(3)
    // const inventoriesssss = await Inventory.find({ category: 'Fashion', brand: brand}).skip(15).limit(3)
    // console.log(inventories)
    res.render('inventories/fashionfilter', { inventories, inventoriess, inventoriesss,brand  })
    }else {
    const inventoryAll = await Inventory.find({})
    const inventories = await Inventory.find({ category: 'Fashion'}).limit(3)
    const inventoriess = await Inventory.find({ category: 'Fashion'}).skip(3).limit(3)
    // const inventories = await Inventory.aggregate([ { $sample: {size: 3} }]) 
    // const inventoriess = await Inventory.aggregate([ { $sample: {size: 3} }]) 
    const inventoriesss = await Inventory.find({ category: 'Fashion'}).skip(6).limit(3)
    const inventoriessss = await Inventory.find({ category: 'Fashion'}).skip(9).limit(3)
    const inventoriesssss = await Inventory.find({ category: 'Fashion'}).skip(12).limit(3)
    const inventoriessssss = await Inventory.find({ category: 'Fashion'}).skip(15).limit(3)
    const inventoriesssssss = await Inventory.find({ category: 'Fashion'}).skip(18).limit(3)
    const inventoriessssssss = await Inventory.find({ category: 'Fashion'}).skip(21).limit(3)
    const inventoriesssssssss = await Inventory.find({ category: 'Fashion'}).skip(24).limit(3)
    // console.log(inventories)
    res.render('inventories/fashion', { inventoryAll, inventories, inventoriess, inventoriesss, inventoriessss, inventoriesssss,inventoriessssss,inventoriesssssss,inventoriessssssss,inventoriesssssssss, brand })
    }
}

module.exports.newin = async(req, res) => { 
    const inventories = await Inventory.find().sort({ updated_at: -1 }).limit(3)
    const inventoriess = await Inventory.find().sort({ updated_at: -1 }).skip(3).limit(3)
    const inventoriesss = await Inventory.find().sort({ updated_at: -1 }).skip(6).limit(3)
    const inventoriessss = await Inventory.find().sort({ updated_at: -1 }).skip(9).limit(3)
    const inventoriesssss = await Inventory.find().sort({ updated_at: -1 }).skip(12).limit(3)
    const inventoriessssss = await Inventory.find().sort({ updated_at: -1 }).skip(15).limit(3)
    const inventoriesssssss = await Inventory.find().sort({ updated_at: -1 }).skip(18).limit(3)
    // console.log(inventories, inventoriess, inventoriesss, inventoriessss, inventoriessss, inventoriesssss, inventoriessssss, inventoriesssssss)
    res.render('inventories/newin', { inventories, inventoriess, inventoriesss, inventoriessss, inventoriessss, inventoriesssss, inventoriessssss, inventoriesssssss })

}