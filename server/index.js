const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AuthRoute = require('./Routes/AuthRoute');
const UserRoute = require('./Routes/UserRoute');

const app = express();

app.use(express.json())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser())

// Handle preflight requests
app.use(cors({
    credentials: true,
    origin: ['http://127.0.0.1:5173', 'https://stylesense.vercel.app'],
}))

dotenv.config();
const port = process.env.PORT

app.get('/', (req, res) => {
    res.status(200).json("Hey This Is The API Talking !!!")
})

mongoose.set('strictQuery', false);

mongoose
    .connect(process.env.MONGO_URL || 5000)
    .then(() =>
        app.listen(port, () =>
            console.log(`Listening at ${port}`)
        )
    )
    .catch((error) => console.log(error));

// usage of routes

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)