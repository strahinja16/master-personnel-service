import "reflect-metadata";
import express from 'express';
import { createServer } from 'http';
import startGrpcServer from "./grpc";
import cors from 'cors';
import { getDbConnection  } from "./db";

const app = express();

app.use('*', cors());
app.get('/health', (req, res) => res.send('Healthy'));

getDbConnection();
startGrpcServer();

const httpServer = createServer(app);
httpServer.listen(
    { port: 3000 },
    (): void => console.log('\n🚀  Express is now running on personnel-service'));
