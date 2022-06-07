const {Router} = require('express');
const Product = require ('../models/product.js');
const auth = require('../middleware/auth');
const router = Router();

router.get('/', async (req, res) => {
    let products = await Product.find()
    .populate('userId', 'email name')
    .select('price title img category about');
    
    if(req.user){
        products = products.filter(p => p.userId._id.toString() != req.user._id.toString());
    }

    res.render('products', {
        title : 'Products',
        isProducts : true,
        products
    });
})

router.get('/filter', async (req, res) => {
    console.log(req.query);
    let {categories, order, offset, limit, title} = req.query;
    categories = isBlank(categories) ? undefined : categories.split(',');
    order = isBlank(order) ? undefined : order;
    console.log('ADIDHIDN : ' + categories);
    //todo check if category, order, offset, limit are undefind or empty
    let products = await Product.find()
    .populate('userId', 'email name')
    .select('price title img category about');
    if(req.user){
        products = products.filter(p => p.userId._id.toString() != req.user._id.toString());
    }

    if(categories){
        products = products.filter(p => p.category !== undefined
        && categories.indexOf(p.category.toString()) !== -1)
    }
    console.log('ORDER : ' + order);
    if(order){
        if(order === 'asc'){
            products = products.sort((p1,p2) => p1.price - p2.price);
        }else{
            products = products.sort((p1,p2) => p2.price - p1.price);
        }
    }

    if(!isBlank(title)){
        products = products.filter(p => p.title.toLowerCase().includes(title.toLowerCase()));
    }
    // кількість продуктів після фільтрації
    let count = products.length;

    let startProductIndex = offset*limit;
    let endProductIndex = parseInt(startProductIndex) + parseInt(limit);
    products = products.slice(startProductIndex, endProductIndex);


    //TODO get total number of products
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({products, count, isAuth : req.session.isAuthenticated}));
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

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

module.exports = router;