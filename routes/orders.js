const {Router} = require('express');
const Order = require('../models/order');
const auth = require('../middleware/auth');
const router = Router();

router.get('/', auth, async (req, res) => {
    try{
        const orders = await Order.find({'user.userId': req.user._id})
        .populate('user.userId')
        
        res.render('orders', {
            isOrder: true,
            title: 'Orders',
            orders: orders.map(o => {
                return {
                    ...o._doc,
                    price: o.products.reduce((total, c) => {
                        return total += c.count * c.product.price
                    }, 0)
                }
            })
        })
    }catch(e){
        console.log(e);
    }

})

router.post('/', auth, async (req, res) => {
    try{
        //дістаємо курси із кошика юзера
        const user = await req.user
        .populate('cart.items.productId');
        // console.log(user.cart.items[0].productId.userId , user.cart.items.length);
        // форматування об'єкту курсів
        const products = user.cart.items.map(i => ({
            count: i.count,
            product: {...i.productId._doc}
        }))

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products : products
        })

        // console.log(products);

        for(let i = 0; i < user.cart.items.length ; i++){
            
        }

        await order.save();
        await req.user.clearCart();

        res.redirect('/orders');
    }catch (e) {
        console.log(e)
    }
})

module.exports = router;