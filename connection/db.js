const mongoose = require('mongoose');
const DBURL = process.env.DBURL;

mongoose.connect(DBURL).then(() => {
    console.log("DB connected SuccessFuly")
}).catch((err) => {
    console.log("DB connection failed", err)
})