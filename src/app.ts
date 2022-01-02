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
import sequelize from "./utils/sequelize";

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(cors({
    origin: true,
    credentials: true
}));

//DATA BASE CONNECTION
sequelize.authenticate()
    .then(async () => {
        await sequelize.sync({logging: true});
        console.log(`Conectado a la base de datos`);
    }
).catch((error) => {
    console.error(error);
    process.exit(0);
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (_, res) => {
    res.send("<h1>Welcome to my API 🥵</h1>");
});

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", dataRoutes);
app.use("/api", clinicRoutes);
app.use("/api", doctorRoutes);
app.use("/api", consultaRoutes);

export default app;
