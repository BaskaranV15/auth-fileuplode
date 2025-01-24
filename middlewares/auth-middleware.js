const jwt=require('jsonwebtoken');


const authMiddleware=(req,res,next)=>{
    const autHeader=req.headers['authorization'];
    // console.log(autHeader);
    const token=autHeader && autHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Access denied .No token provided.log in to continue"
        })
    }

    // decode the token
    try{
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decodeToken);
        
        req.useInfo=decodeToken;
        next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"Access denied .No token provided.log in to continue"
        })
    }
    
}
module.exports=authMiddleware;