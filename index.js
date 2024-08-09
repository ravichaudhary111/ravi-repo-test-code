const express = require('express');
const userRoute = require('./router/user.route');
const dotenv = require('dotenv')
const app = express();

dotenv.config();
require('./connection/db')


app.use(userRoute);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port${PORT}`)
})

