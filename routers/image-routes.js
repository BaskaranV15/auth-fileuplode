const express=require('express');
const router=express.Router();
const a=require('../controllers/image-controller')
const authMiddleware=require('../middlewares/auth-middleware')
const adminMiddleware=require('../middlewares/admin-middleware')
const uploadMiddleware=require('../middlewares/upload-middleware')
const {uploadImageController,fetchImageController,imageDeleteController}=require('../controllers/image-controller')

// upload the image

router.post('/upload',authMiddleware,adminMiddleware,uploadMiddleware.single('image'),uploadImageController);
// get all image 
router.get('/allImage',authMiddleware,fetchImageController);
// delete 679a5cbbd0d3b21568f31116
router.delete('/:id',authMiddleware,adminMiddleware,imageDeleteController);

module.exports=router;
