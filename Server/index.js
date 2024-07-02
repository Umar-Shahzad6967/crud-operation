import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import router from "./Routes/UserRoutes.js";
import route from "./Routes/authroutes.js";
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

mongoose.connect('mongodb://localhost:27017/test').then(() => {
    console.log('DB connected ');

    app.listen(7000, () => {
        console.log(`Server running on port`);
    });
}).catch(error => console.log(error));

app.use('/api', router);
app.use('/auth', route);