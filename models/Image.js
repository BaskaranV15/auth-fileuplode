const mongoose=require('mongoose');
const { applyTimestamps } = require('./User');

const ImageSchema=mongoose.Schema({
    url:{                      //image url upload in cloudinary
        type:String,
        require:true
    },
    publicId:{
        type:String,
        require:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
},{timestamps:true});


module.exports=mongoose.model('Image',ImageSchema)