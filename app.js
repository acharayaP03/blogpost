const path = require('path')
const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars')// template engine.
const passport = require('passport') // for authentication ..
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const connectDB = require('./Database/db');
const route = require('./routes/index');
const authRoute = require('./routes/auth');
const { googleAuth } = require('./Controllers/authController')


//load the config file.
dotenv.config({ path: './configs/config.env'});

//Google authentication via passport
googleAuth(passport);

connectDB()

const app = express();

//Logger 
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

//Handlebars template engine for express
app.engine('.hbs', exphbs({ defaultLayout: 'main' ,extname: '.hbs'}));
app.set('view engine', '.hbs');

//session
app.use(session({
    secret: 'secrect knowledge',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection // this will save a session object in the database.
    })
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session())

//For serving static files 
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/', route);
//if login in with google is clicked then we will redirect to this route.
app.use('/auth', authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${ process.env.PORT}`)
})