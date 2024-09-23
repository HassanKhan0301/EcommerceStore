import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';


import userRoute from "./route/user-route.js";
import productRoute from "./route/product-route.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 4003;
const URI = process.env.MongoDBURI;


// Connect mongose
try {
    mongoose.connect(URI,{
        useNewUrlparser:true,
        useUnifiedTopology: true
    });
    console.log("Connected to MangoDb");

} catch (error) {
    console.log("error:",error);
}

app.use("/user",userRoute);
app.use("/product",productRoute)



app.listen(PORT,()=>{
    console.log(`Example App running ${PORT}`);
});