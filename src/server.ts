import 'reflect-metadata';
import express, { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './app/routes/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);

// Using the router to publish Swagger + TSOA documentation
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("./swagger/swagger.json"))
  );
});

AppDataSource.initialize().then(async () => {
    console.log('Database Ok');
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`)
    })
})
