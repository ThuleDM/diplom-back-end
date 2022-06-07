const {Router} = require('express');
const Order = require('../models/order');
const Product = require ('../models/product.js');
const auth = require('../middleware/auth');
const { all } = require('express/lib/application');
const router = Router();

router.put('/:id/status/:status', auth, async (req, res) => {
    try{
        console.log(req.params);
        await Order.findByIdAndUpdate(req.params.id , {status : req.params.status});
        res.send(200)
    } catch(e){
        console.log(e)
        res.send(500)
    }
})


router.get('/', auth, async (req, res) => {
    try{
        const incOrders = await Order
        .find({products:{$elemMatch:{'product.userId' : req.user._id}},status : 'New'})
        .populate('user.userId');


        // ????
        // for(let o in incOrders){
        //     incOrders[o].products = incOrders[o].products
        //     .filter(p => p.product.userId.toString() == req.user._id.toString())
        // }


        res.render('incomingOrders', {
            isIncomingOrders: true,
            title: 'Incoming Orders',
            incOrders: incOrders.map(ord => {
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


        // const allOrders = await Order.find().populate('products');
        // console.log("ARRAY ::::::::::::" +  typeof allOrders[7].products);
        // console.log(allOrders.length);

        // let arr = [];
        // for(let i = 0; i<allOrders.length;i++ ){
        //     console.log('ASDJHSDBHJSD : :: : : : ' + allOrders[i].products[0]);
        //      arr.push(allOrders[i].products[i]);
        // }
        // console.log(arr);
        // console.log('MY NEW PRODUCTS ARRAY : ' + arr[0]);
        
        // const myProducts = await Product.find({'userId' : req.user._id});
        // console.log('MY PRODUCTS ::::' +  myProducts[0]._id);
        
        // const ordersMy = await Order.find({'products.product._id' : })

        // console.log('MYYYYYYYYYYYYYYYYYYY :::' + ordersMy);
        // const incomingOrders = await Order.find({'productId'} : )

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


        // const orders = await Order.find({'user.userId': req.user._id})
        // .populate('user.userId')