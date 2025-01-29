const Image=require('../models/Image');
const {uploadToCloudinary}=require('../helpers/cloudinaryHelpers');
const cloudinary = require('../config/cloudinary');
const fs=require('fs');
const { find, findById, findByIdAndDelete } = require('../models/User');
const { log } = require('console');
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
        const getCurrentIdOfImageToDelete=req.params.id;
        const userIds=req.userInfo.userId;//req.userInfo.userId

        const image=await Image.findById(getCurrentIdOfImageToDelete);
        if(!image){
            return res.status(404).json({
                success:false,
                message:'Image not found'
            })
        }

        // check is current image is upload by current user is try to delete a image
        if(image.uploadedBy.toString() !== userIds)
        {
            return res.status(403).json({
                success:false,
                message:'You are not authorize to delete this Image'
            })
        }

        // delete the image from cloudinary
        const cloud_del=await cloudinary.uploader.destroy(image.publicId);
        if(!cloud_del){
            return res.status(403).json({
                success:false,
                message:'image not delete from cloudinary'
            })
        }

        // delete image fromm mongodb
        await Image.findByIdAndDelete(getCurrentIdOfImageToDelete);
        res.status(200).json({
            success:true ,
            message:'Image deleted successfully'
        })

        
    }catch(err){
        res.status(500).json({
            success:false,
            error:err.message,
            message:'some thing went wrong'})
    }
}

module.exports={uploadImageController,fetchImageController,imageDeleteController};