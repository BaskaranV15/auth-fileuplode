const express=require('express');
const router=express.Router();
const authMiddleware=require('../middlewares/auth-middleware')
// will handle n middleware
router.get('/home',authMiddleware,(req,res)=>{
    const {username,userid,role}=req.useInfo;
    res.json({
        message:'welcome to home page',
        user:{
            _id:userid,
            username,
            role
        }
    })
})

module.exports=router;