const mongoose = require('mongoose');

//const dbDetails = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD)

const connectDB = async () =>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log(
            'Mongo DB has been connected successfully'
            + "\n------------------------------------------------------------------------------"
            +"\nConnection Host: " + con.connection.host
            +"\n------------------------------------------------------------------------------")
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;