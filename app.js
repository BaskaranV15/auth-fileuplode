const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
const port=process.env.PORT || 2005
const authRouter=require('./routers/auth-route');
const homeRouter=require('./routers/home-router');
const adminRouter=require('./routers/admin-route');
const uploadImageRoute=require('./routers/image-routes')

// db connection string
const dbConnection=require('./dbconfig/dbcon');
dbConnection();

//build in middleware 
app.use(express.json());

app.use(cors()); //allow different address


app.use('/api/v1',authRouter);
app.use('/api/v2/',homeRouter);
app.use('/api/v3/',adminRouter)
app.use('/api/v3/image',uploadImageRoute)
//

app.listen(port,()=>{
    console.log(`server lister on port ${port}`);
})