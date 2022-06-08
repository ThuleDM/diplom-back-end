const {Router} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = Router();

router.get('/login', async (req,res) => {
    res.render('auth/login', {
        title: 'Authorization',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    })
})

router.get('/logout', async (req,res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    })
})

router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;
        const candidate = await User.findOne({email});

        if(candidate){
            const areSame = await bcrypt.compare(password, candidate.password);

            if(areSame){
                req.session.user = candidate;
                req.session.isAuthenticated = true,
                req.session.save(err => {
                    if(err){
                        throw err;
                    }
                    res.redirect('/products');
                })
            }else{
                req.flash('loginError', 'Неправильний пароль');
                res.redirect('/auth/login#login');
            }
        }else{
            req.flash('loginError', 'Такого користувача не існує');
            res.redirect('/auth/login#login');
        }
    }catch(e){
        console.log(e);
    }

})

router.post('/register', async(req, res) => {
    try{
        const {email, password, repeatPassword, name, phone} = req.body;

        const candidate = await User.findOne({email});

        if(candidate){
            req.flash('registerError', 'Користувач із цією електронною адресою вже існує');
            res.redirect('/auth/login#register');
        }else{
            if(!validateEmail(email)){
                req.flash('registerError', 'Невірний імейл');
                res.redirect('/auth/login#register');
            }else if(!validatePhone(phone)){
                console.log(phone);
                console.log(validatePhone(phone));
                req.flash('registerError', 'Невірний номер телефону');
                res.redirect('/auth/login#register');
            }else if(password !== repeatPassword){
                req.flash('registerError', 'Паролі не співпадають!');
                res.redirect('/auth/login#register');
            }else{
                const hashPassword = await bcrypt.hash(password, 10);
                const user = new User({
                    email, phone, name, password: hashPassword
                })
                await user.save();
                
                res.redirect('/auth/login#login');
            }
        }
 
    }catch(e){
        console.log(e);
    }
})

let validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
let validatePhone = function(phone) {
    let re = /^\+?3?8?(0\d{9})$/;
    return re.test(phone)
};

module.exports = router;