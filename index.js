const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/addProduct');
const cartRoutes = require('./routes/cart');
const productsRoutes = require('./routes/products');
const myProductsRoutes = require('./routes/myProducts');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
//const User = require('./models/user');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');

const MONGODB_URI = `mongodb+srv://d1mpleo:inemev15@cluster0.fta6y.mongodb.net/onlineAdPlatform?retryWrites=true&w=majority`;


const app = express();

const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    extname: 'hbs'
})

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

app.engine('hbs', hbs.engine); //Регистрируем в экспрессе,что есть такой движок 
app.set('view engine', 'hbs');//использование движка
app.set('views', 'public/views');//хранение шаблонов в указанной папке

app.use(express.static(path.join(__dirname, 'public')));
app.use('/media', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

app.use('/', homeRoutes);
app.use('/add', addRoutes); //TODO merge with products
app.use('/cart', cartRoutes);
app.use('/products', productsRoutes);
app.use('/myProducts', myProductsRoutes)
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

async function start(){

    try{
        await mongoose.connect(MONGODB_URI, {maxPoolSize:50, wtimeoutMS:2500,});
        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}`);
        })
    }catch(e){
        console.log(e);
    }
}

start();

