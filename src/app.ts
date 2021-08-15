import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import dataRoutes from "./routes/dataSensorsRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", dataRoutes);

export default app;
