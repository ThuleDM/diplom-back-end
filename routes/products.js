const {Router} = require('express');
const Product = require ('../models/product.js');
const auth = require('../middleware/auth');
const router = Router();


router.get('/', async (req, res) => {
    let products = await Product.find()
    .populate('userId', 'email name')
    .select('price title img');
    
    if(req.user){
        products = products.filter(p => p.userId._id.toString() != req.user._id.toString());
    }

    res.render('products', {
        title : 'Products',
        isProducts : true,
        products
    });
})

router.get('/:id/edit',auth, async (req, res) => {
    if(!req.query.allow){
        return res.redirect('/');
    }

    const product = await Product.findById(req.params.id);

    res.render('product-edit', {
        title: `Edit ${product.title}`,
        product
    })
})

router.post('/edit', auth, async (req, res) => {
    const {id} = req.body;
    delete req.body.id;
    await Product.findByIdAndUpdate(id, req.body);
    res.redirect('/products');
})

router.post('/remove', auth, async(req, res) => {
    try{
        await Product.deleteOne({
            _id: req.body.id
        })
        res.redirect('/products');
    }catch(e){
        console.log(e);
    }

})

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('product', {
        layout: 'empty',
        title : `Product ${product.title}`,
        product
    });
})


module.exports = router;