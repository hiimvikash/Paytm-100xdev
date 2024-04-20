const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://hiimvikash:hiimvikash@cluster0.ndb1cr0.mongodb.net/paytm");

const rootRouter = require('./routes/index');



app.use(cors());
app.use(express.json());




app.use("/api/v1", rootRouter);

app.listen(PORT, ()=>{
    console.log(`Server started @ ${PORT}`)
})