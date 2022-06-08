const {Router} = require('express');
const Product = require('../models/product');
const auth = require('../middleware/auth');
const router = Router();

function mapCartItems(cart){
    return cart.items.map(c => {
        console.log(c.productId);
        let productIdJson =  c.productId ? c.productId.toJSON() : {}
        let id = c.productId ? c.productId._id : ""
        return ({
        ...productIdJson,
         id,
        count: c.count
    })})
}

function countPrice(products){
    return products.reduce((total, product) => {
        return total += product.price * product.count;
    }, 0)
}



router.post('/add', auth, async (req, res) => {
    try{
        const product = await Product.findById(req.body.id);
        await req.user.addToCart(product);
        res.redirect("/cart")
    } catch(e){
        console.log(e)
        res.send(500)
    }
})

router.post('/add/:id', auth, async (req, res) => {
    try{
        console.log(req.params.id)
        await req.user.addToCart2(req.params.id);
        const user = await req.user.populate('cart.items.productId');
        const products =  mapCartItems(user.cart);
        const cart = {
            products, price: countPrice(products)
        }
        res.status(200).json(cart);
    } catch(e){
        console.log(e)
        res.send(500)
    }
})



router.delete('/remove/:id', auth, async(req, res) => {
    await req.user.removeFromCart(req.params.id);
    const user = await req.user.populate('cart.items.productId');
    const products =  mapCartItems(user.cart);
    const cart = {
        products, price: countPrice(products)
    }
    res.status(200).json(cart);
})

router.get('/', auth, async (req, res) => {
    const user = await req.user
    .populate('cart.items.productId');
    console.log(user.cart);
    const products = mapCartItems(user.cart);

    res.render('cart', {
        title : 'Cart',
        isCart : true,
        products : products,
        price : countPrice(products)
    })
})



module.exports = router;