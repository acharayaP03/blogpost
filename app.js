const express = require('express')
const dotenv = require('dotenv');

const connectDB = require('./Database/db');
const morgan = require('morgan');
const exphbs = require('express-handlebars')// template engine.
const route = require('./routes/index')


//load the config file.
dotenv.config({ path: './configs/config.env'});

connectDB()

const app = express();

//Logger 
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

//Handlebars template engine for express
app.engine('.hbs', exphbs({ defaultLayout: 'main' ,extname: '.hbs'}));
app.set('view engine', '.hbs');

//routes
app.use('/', route);

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${ process.env.PORT}`)
})