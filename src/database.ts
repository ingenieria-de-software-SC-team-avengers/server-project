import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    user: `${process.env.DBUSER}`,
    host: `${process.env.DBHOST}`,
    database: `${process.env.DBNAME}`,
    password: `${process.env.DBPASS}`,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect().then(db => console.log("Estas conectado a postgresql")).catch(error => console.log(error)); 