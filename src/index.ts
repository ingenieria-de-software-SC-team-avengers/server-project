//en este archivo hacemos todas las conf que necesite el server, instanciar el server, cors, etc
import Server from "./app";
import * as dotenv from "dotenv"
import express from 'express';
import cors from "cors";
import morgan from "morgan";
import './database';
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const server = new Server();

server.app.use(cors({
    origin: true,
    credentials: true
}));

server.app.use(morgan('dev'));
server.app.use(express.json());
server.app.use(express.urlencoded({extended: false}));

server.app.use('/api', authRoutes);
server.app.use('/api', userRoutes);

server.start(() => {
    console.log(`servidor corriendo en el puerto ${process.env.PORT || 3000}`)
});