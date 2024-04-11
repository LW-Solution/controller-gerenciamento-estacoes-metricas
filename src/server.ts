import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';

const app = express();

app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(async () => {
    console.log('Database Ok');
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`)
    })
})
