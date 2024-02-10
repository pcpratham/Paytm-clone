const mongoose = require("mongoose");
require("dotenv").config();

// console.log(process.env.DATABASE_URL);
const dbConnect = () => { 
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("DB connected successfully")})
    .catch((err)=>{console.log("error in DB connection",err)})
}

module.exports = dbConnect;

//try agian