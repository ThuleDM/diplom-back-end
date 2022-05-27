const {Router} = require('express');
const Product = require('../models/product');
const auth = require('../middleware/auth');
const router = Router();

function mapCartItems(cart){
    return cart.items.map(c => ({
        ...c.productId._doc,
         id: c.productId._id,
        count: c.count
    }))
}

function countPrice(products){
    return products.reduce((total, product) => {
        return total += product.price * product.count;
    }, 0)
}

router.post('/add', auth, async (req, res) => {
    console.log("here1")
    const product = await Product.findById(req.body.id);
    await req.user.addToCart(product);
    console.log("here2")
    res.send(200)
    console.log("here3")
    //res.redirect('/cart');
})

router.delete('/remove/:id', auth, async(req, res) => {
    await req.user.removeFromCart(req.params.id);
    const user = await req.user.populate('cart.items.productId');
    const products =  mapCartItems(user.cart);
    console.log('Products : ' + products);
    const cart = {
        products, price: countPrice(products)
    }
    res.status(200).json(cart);
})

router.get('/', auth, async (req, res) => {
    const user = await req.user
    .populate('cart.items.productId')

    const products = mapCartItems(user.cart);

    res.render('cart', {
        title : 'Cart',
        isCart : true,
        products : products,
        price : countPrice(products)
    })
})


module.exports = router;