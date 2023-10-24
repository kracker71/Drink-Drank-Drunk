import express, { Express, Request, Response } from 'express';

const morgan = require("morgan");
const cors =  require("cors");
const connectDB = require("../config/db");
const bodyParser = require("body-parser");

const orderRoutes = require("../routes/order.route");

connectDB();

const app = express();

// enable cors
app.use(cors());

// morgan logging
app.use(morgan("combined"));

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome to order service!');
});

app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 8102

app.listen(PORT , () => {
    console.log(`Server listening in port ${PORT}`);
});