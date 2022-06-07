const {Router} = require('express');
const Product = require('../models/product');
const auth = require('../middleware/auth');
const router = Router();

const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  });
const upload = multer({ storage: storage });

router.get('/', auth, (req, res) => {
    res.render('add', {
        title : 'Add product',
        isAdd : true
    });
})

//creates new product
router.post('/', auth, upload.array("files"), async (req, res) => {
    
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        img: req.files,
        category: req.body.category,
        about: req.body.about,
        userId: req.user._id
    })

    try{
        await product.save();
        res.send(200);
    }catch(e){
        console.log(e);
        res.send(500);
    }
})


module.exports = router;