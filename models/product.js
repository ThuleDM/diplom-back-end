const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
     img: [],
     category: {
         type: String,
         required: true
     },
     about: {
         type: String,
         required: true
     },
     userId: {
         type: Schema.Types.ObjectId,
         ref: 'User'
     }
})

// courseSchema.method('toClient', function() {
//     const course = this.toObject()

//     course.id = course._id
//     delete course._id

//     return course
// })

module.exports = model('Product', productSchema);