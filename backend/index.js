const express = require("express");
const app = express();
const dbConnect = require("./config/database");
require("dotenv").config();
const router = require("./routes/routes");
const cors = require("cors");

// app.use(cors());
//set cors origin *
app.use(cors({origin: "*"}));
app.use(express.json());



const PORT = process.env.PORT || 4000;

app.listen(PORT,(req,res)=>{
    console.log(`App started at ${PORT}`);
});
app.use("/api/v1",router);

dbConnect();


