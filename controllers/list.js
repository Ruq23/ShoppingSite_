const Inventory = require('../models/inventory');
const { cloudinary } = require('../cloudinary')

const categories = ['Electronics', 'Gadgets', 'Clothing', 'Automobile', 'Furniture', 'Food']

module.exports.index = async (req, res) => {
    const iventories = await Inventory.find({});
    // console.log(iventories)
    res.render('inventories/index', { iventories });
}

module.exports.newProductForm = (req, res) => {
    res.render('inventories/new', {categories})
}

module.exports.newProduct = async (req, res, next) => {
    const inventory = new Inventory(req.body.inventory);
    inventory.image = req.files.map(f => ({ url: f.path, filename: f.filename })   )
    // res.send(req.files)
    inventory.author = req.user._id
    await inventory.save();
    console.log(inventory)
    req.flash('success', 'Sucessfully Added Product to Inventory!');
    res.redirect(`/list/${inventory._id}`)
}

module.exports.showProduct = async (req, res) => {
    const inventory = await Inventory.findById(req.params.id).populate({
        path: 'reviews',
        populate: { 
            path: 'author',
        }
    }).populate('author');
    console.log(inventory)
    if(!inventory){
        req.flash('error', 'Cannot find that product!');
        return res.redirect('/list')
    }
    res.render('inventories/show', { inventory })
  }

module.exports.editProductForm = async (req, res) => {
    const inventory = await Inventory.findById(req.params.id)
    if (!inventory) {
        req.flash('error', 'Cannot find that Product')
        return redirect ('/list')
    }
    res.render('inventories/edit', { inventory, categories })
  }

module.exports.editProduct = async(req, res) => {
    const { id } = req.params
    console.log(req.body)
   const inventory = await Inventory.findByIdAndUpdate(id, { ...req.body.inventory });
   const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
   inventory.image.push(...imgs)
   await inventory.save()
   if(req.body.deleteImages){
    // await inventory.updateOne({$pull: {image: {filename: {$in: req.body.deleteImages}}}})
    console.log('Bigg boyy')
   }
//    console.log(req.body.inventory)
   if(!inventory){
    req.flash('error', 'Cannot find that product!');
    return res.redirect('/list')
   }
   req.flash('success', 'Sucessfully Updated a Product!');
   res.redirect(`/list/${inventory._id}`)
}

module.exports.destroy = async(req, res) => {
    const { id } = req.params;
    await Inventory.findByIdAndDelete(id);
   req.flash('success', 'Product Deleted!');
    res.redirect('/list');
}

