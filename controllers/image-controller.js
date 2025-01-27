const Image=require('../models/Image');
const {uploadToCloudinary}=require('../helpers/cloudinaryHelpers');
const { uploader } = require('../config/cloudinary');
const fs=require('fs');
const { find } = require('../models/User');
const uploadImageController=async(req,res)=>{
    try{

        if (!req.userInfo || !req.userInfo.userId) {
            return res.status(400).json({
                success: false,
                message: 'User information is missing. Please authenticate.',
            });
        }
        // check if file is missing in req object
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:'file is required.upload a image',
            })
        }
            // upload to cloudinary
            const {url,publicId}= await uploadToCloudinary(req.file.path);

            // store image url and public id along with the upload user id in database
            const newlyUploadedImage= new Image({
                url,
                publicId,
                uploadedBy:req.userInfo.userId
            });
            await newlyUploadedImage.save();

            // delete a file from local machine
            fs.unlinkSync(req.file.path)
            res.status(201).json({
                success:true,
                message:'file or image uploaded successfully',
                image:newlyUploadedImage
            })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:'some thing went wrong'})
    }
}

const fetchImageController=async(req,res)=>{
    try{
        const image=await Image.find({})
        if(image.length<=0)
        {
            return res.status(200).json({
                success:true,
                message:'here all image',
                data:image
            })
        }
        if(image){
            res.status(200).json({
                success:true,
                message:'here all image',
                data:image
            })
        }
    }catch(err){
        res.status(500).json({
            success:false,
            error:err.message,
            message:'some thing went wrong'})
    }
}

const imageDeleteController=async(req,res)=>{
    try{

    }catch(err){
        res.status(500).json({
            success:false,
            error:err.message,
            message:'some thing went wrong'})
    }
}

module.exports={uploadImageController,fetchImageController};