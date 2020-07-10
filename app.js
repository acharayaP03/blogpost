const path = require('path')
const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars')// template engine.
const methodOverride = require('method-override'); // to override post method to put or delete while updating the request.
const passport = require('passport') // for authentication ..
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const connectDB = require('./Database/db');
const route = require('./routes/index');
const authRoute = require('./routes/auth');
const blogsRoute = require('./routes/blogs');
const blogPageRoute = require('./routes/pagesRoute');
const { googleAuth } = require('./Controllers/authController');;
//hooking our helper 
const { formateDate, truncate, stripTags, stripNBSP, getAllblogs, select } = require('./Helpers/hbs')


//load the config file.
dotenv.config({ path: './configs/config.env'});

//Google authentication via passport
googleAuth(passport);

//Database connection..
connectDB()

const app = express();

// To recieve form data.
app.use(express.urlencoded({ extended: false}));
app.use(express.json())

//Method override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
  )

//Logger 
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

//Handlebars template engine for express
app.engine('.hbs', exphbs({ helpers: { formateDate, stripTags, truncate, stripNBSP, getAllblogs, select } ,defaultLayout: 'main' ,extname: '.hbs'}));
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

//Set Global variable

app.use(function(req, res, next){
    res.locals.user = req.user || null;
    next();
})

//For serving static files 
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/', route);
app.use('/blog', blogPageRoute);
//if login in with google is clicked then we will redirect to this route.
app.use('/auth', authRoute);
app.use('/blogs', blogsRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${ process.env.PORT}`)
})