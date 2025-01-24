const mongoose=require('mongoose');

const dbcon=async()=>{
    // console.log(process.env.MONGO_URL);
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DataBase connected successfully");
    }catch(err){
        console.error("error message",err);
        process.exit(1);
    }
}

module.exports=dbcon;