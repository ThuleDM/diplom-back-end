const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    //status: waiting, //completed 
    products: [
        {
            //status: waiting, //confirmed //rejected
            product: {
                type: Object,
                required: true
            },
            count:{
                type: Number,
                required: true
            }
            
        }
    ],
    user: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Order', orderSchema);