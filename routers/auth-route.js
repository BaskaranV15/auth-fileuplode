const express=require('express');
const router=express.Router();
const {registerUser,loginUser,changePassword}=require('../controllers/auth-controller');
const authMiddleware=require('../middlewares/auth-middleware')
//router related to authentication and authorization
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/changePassword',authMiddleware,changePassword);

module.exports=router;