const {Router} = require('express');
const Order = require('../models/order');
const Product = require ('../models/product.js');
const auth = require('../middleware/auth');
const { all } = require('express/lib/application');
const router = Router();


router.get('/', auth, async (req, res) => {
    try{
        const incOrdersToHistory = await Order
        .find({products:{$elemMatch:{'product.userId' : req.user._id}},status : {$in : ['accepted','rejected']}})
        .populate('user.userId');

        for(let o in incOrdersToHistory){
            incOrdersToHistory[o].products = incOrdersToHistory[o].products
            .filter(p => p.product.userId.toString() == req.user._id.toString())
        }


        res.render('incomingOrdersHistory', {
            isIncomingOrdersHistory: true,
            title: 'Incoming orders history',
            incOrdersToHistory: incOrdersToHistory.map(ord => {
                return {
                    ...ord._doc,
                    price: ord.products.reduce((total, c) => {
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