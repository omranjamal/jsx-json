import express from 'express';
import {data as data1} from "./test-data.js";
import {data as data2} from "./data.js";

const app = express();

app.get('/', (req, res) => {
    res.json([
        data1,
        data2
    ]);
});

app.listen('8080', () => {
    console.log('LISTENING ON http://localhost:8080');
});
