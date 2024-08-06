import * as dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
dotenv.config({ path: '.env.template' });

//Importing Routes
import authRouter from './routes/auth.routes.js';
//import userRouter from './routes/user.routes.js';



//constants
const PORT = process.env.PORT || 5000;
const development = process.env.NODE_ENV === 'development';




//Connecting to Mongo DB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected....!')
    })
    .catch((err) => {
        console.log('Error', err.message);
    });


//Creating Server
const app = express();

// Using MiddleWares
app.use(express.json());
app.use(urlencoded({ extended: true }))

//Routes
app.use('/auth', authRouter)
//app.use('/user', userRouter)





//Listening Server
app.listen(PORT, (req, res, next) => {
    console.log("Server listening on !")
});