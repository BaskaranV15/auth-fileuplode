const express=require('express');
const router=express.Router();
const a=require('../controllers/image-controller')
const authMiddleware=require('../middlewares/auth-middleware')
const adminMiddleware=require('../middlewares/admin-middleware')
const uploadMiddleware=require('../middlewares/upload-middleware')
const {uploadImageController,fetchImageController}=require('../controllers/image-controller')

// upload the image

router.post('/upload',authMiddleware,adminMiddleware,uploadMiddleware.single('image'),uploadImageController);

router.get('/allImage',authMiddleware,fetchImageController)
module.exports=router;
