require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const rootRouter = require('./routes/index');



app.use(cors());
app.use(express.json());




app.use("/api/v1", rootRouter);

app.listen(PORT, ()=>{
    console.log(`Server started @ ${PORT}`)
})