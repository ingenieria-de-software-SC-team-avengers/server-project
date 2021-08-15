import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const registerDoctor = async(req: Request, res: Response) => {
    try {
        const {nombre,matricula,especialidad,idclinic,telefono} = req.body;
        const response: QueryResult = await pool.query(
            "INSERT INTO doctors(nombre,matricula,especialidad,idClinic,telefono) VALUES ($1,$2,$3,$4,$5)",
            [nombre,matricula,especialidad,idclinic,telefono]
        );
    
        return res.status(200).json({
            message: "Doctor registrado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            message: "No se pudo registrar al doctor"
        });
    }

}