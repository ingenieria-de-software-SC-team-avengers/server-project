import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import dataRoutes from "./routes/dataSensorsRoutes";
import clinicRoutes from "./routes/clinicRoutes";
import dotenv from "dotenv";
import doctorRoutes from "./routes/doctorRoutes";
import consultaRoutes from "./routes/consultaRoutes";

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
app.use("/api", clinicRoutes);
app.use("/api", doctorRoutes);
app.use("/api", consultaRoutes);

export default app;
