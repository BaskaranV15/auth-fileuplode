const user=require('../models/User');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
//register
const registerUser=async(req,res)=>{
    try{
        // extract information from req body 
        const {username,email,password,role}=req.body;
        // Validate input
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // check if user already exit in database
        const checkExistUser=await user.findOne({$or:[{username},{email}]});
        if(checkExistUser){
            return res.status(400).json({
                success:false,
                message:"user or email already exist .please try with different username and email"
            })
        }

        const salt=await bcrypt.genSalt(10); //default is 10
        const hashedPassword=await bcrypt.hash(password,salt);

        // now create new user and save in database
        const newCreatedUser=new user({
            username,
            email,
            password:hashedPassword,
            role:role || 'user'
        })

        await newCreatedUser.save();

        if(newCreatedUser){
            res.status(201).json({
                success:true,
                message:"user register successfully",
            })
        }else{
            res.status(400).json({
                success:false,
                message:"unable to register try again later",
            })
        }
    }catch(err){
        res.status(505).json({
            success:false,
            error:err.message,
            message:"something went wrong please try again!"
        })
    }
};


//login
const loginUser=async(req,res)=>{
    try{
        const {username,password}=req.body;
        if(!username || !password){
            return res.status(400).json({
                success:false,
                message:"user and password are required"
            })
        }
        //find if current user exist in database or not
        const UserExist=await user.findOne({username});
        if(!UserExist){
            return res.status(400).json({
                success:false,
                message:"invalid credential or user does not exist"
            })
        }

        const isPassWordMatch=await bcrypt.compare(password,UserExist.password);
        if(!isPassWordMatch){
            return res.status(400).json({
                success:false,
                message:"password is missMatch or password incorrect"
            })
        }
        // CREATE BEARER TOKEN if password matches

        const accessToken=jwt.sign({
            userId:UserExist._id,
            username:UserExist.username,
            role:UserExist.role
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:'30m'
        })
        res.status(200).json({
            success:true,
            message:"Login successfully",
            accessToken
        })
    }catch(err){
        res.status(505).json({
            success:false,
            error:err.message,
            message:"something went wrong please try again!"
        })
    }
}

module.exports={registerUser,loginUser};