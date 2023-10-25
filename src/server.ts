import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { mongoConnect } from '@src/database/mongo/connection.ts';
import orderRoutes from './routes/order.route.ts';
import { pgConnect } from './database/postgresql/connection';

mongoConnect();
pgConnect();

const app = express();

// enable cors
app.use(cors());

// morgan logging
app.use(morgan("combined"));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to order service!');
});

app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 8102

app.listen(PORT , () => {
    console.log(`Server started! http://localhost:${PORT}`);
});