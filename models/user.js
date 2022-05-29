const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    //todo extrac to a standalone document
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                }

            }
        ]
    }
    
})

userSchema.methods.addToCart = function(product) {
    const clonedItems = [...this.cart.items];
    const idx = clonedItems.findIndex(c => {
        return c.productId.toString() === product._id.toString();
    })

    if(idx >= 0){
        clonedItems[idx].count = clonedItems[idx].count + 1;
    }else{
        clonedItems.push({
            productId: product._id,
            count: 1
        })
    }

    const newCart = {items: clonedItems};
    this.cart = newCart;
    //this.cart = {items: clonedItems};

    return this.save()
}

userSchema.methods.removeFromCart = function(productId){
    let items = [...this.cart.items]
    console.log(items);
    const idx = items.findIndex(c => {
        return c.productId.toString() === productId.toString()
    })
    if(items[idx].count === 1){
        items = items.filter(c => c.productId.toString() !== productId.toString());
    }else{
        items[idx].count--
    }

    this.cart = {items};
    return this.save();
}

userSchema.methods.clearCart = function(){
    this.cart = {items: []};
    return this.save();
}

module.exports = model('User', userSchema);