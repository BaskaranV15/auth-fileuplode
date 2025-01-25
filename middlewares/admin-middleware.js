

const isAdmin=(req,res,next)=>{
    // if(req.useInfo.role!=='admin'){
    //     return res.status(403).json({
    //         message:'Access denied ! .only admin will enter'
    //     })
    // }
    // next();
    if (!req.userInfo || req.userInfo.role !== 'admin') {
        return res.status(403).json({
            message: 'Access denied! Only admins are allowed.',
        });
    }
    next();
}

module.exports=isAdmin;