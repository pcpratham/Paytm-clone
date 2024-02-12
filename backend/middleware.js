const jwt = require("jsonwebtoken")
require("dotenv").config();

const authMiddleware = async(req,res,next) => {
    try{
        const authHeaders = req.headers.authorization;
        if(!authHeaders || !authHeaders.startsWith('Bearer ')){
            return res.status(403).json({
                msg:"token not found in headers"
            });
        }

        const token = authHeaders.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decoded.userId
        console.log("auth middleware hitted")
        next();
    }
    catch{
        return res.status(403).json({
            msg:"Error in auth middleware"
        });
    }
}


module.exports = authMiddleware;

