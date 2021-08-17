import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const resgisterClinic = async(req: Request, res: Response) => {
    try {
        const {nombre, direccion} = req.body;
        const response: QueryResult = await pool.query(
            "INSERT INTO clinica(nombre,direccion) VALUES ($1,$2)",
            [nombre,direccion]
        );
    
        return res.status(200).json({
            message: "Registro de la clinica exitoso"
        });
    } catch (error) {
        return res.status(500).json({
            error: "No se pudo registrar la clinica"
        });
    }
}

export const getAllClinic = async(req: Request, res: Response) => {
    try {
        const response: QueryResult = await pool.query(
            "select clinica.nombre,clinica.direccion from clinica"
        );
        const clinics = response.rows;
        return res.status(200).json(clinics);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener las clinicas"
        });
    }
}

