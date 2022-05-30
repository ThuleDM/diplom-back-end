const {Router} = require('express');
const Order = require('../models/order');
const auth = require('../middleware/auth');
const router = Router();

router.get('/', auth, async (req, res) => {
    try{
        //todo get products list from active orders (status WAITING)
        //todo get owner id of product 
        //todo if owner id of product == user.userId => add to map
        /*
            [
                "628cd1ae0a218762601b425e":{
                    status: rejected,
                    products:[
                        {
                            product: Product1,
                            conut: 2
                        },
                        {  
                            product: Product2,
                            conut: 1
                        },
                    ]
                }
            ]
        */
        const orders = await Order.find({'user.userId': req.user._id})
        .populate('user.userId')
        
        res.render('incomingOrders', {
            isOrder: true,
            title: 'Incoming Orders',
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
module.exports = router;