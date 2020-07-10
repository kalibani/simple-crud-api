const express = require('express')
require('dotenv').config();
const userRoute = require('./routes/userRoute')
const bookRoute = require('./routes/bookRoute')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRoute);
app.use('/book', bookRoute)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))