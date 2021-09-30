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

export const getAllDoctors = async(req: Request, res: Response) => {
    try {
        const response: QueryResult = await pool.query(
            "select doctors.nombre,doctors.matricula,doctors.especialidad,doctors.telefono,clinica.nombre as clinica,doctors.idclinic as idClinica from doctors,clinica where doctors.idclinic = clinica.id"
        );
        const doctors = response.rows;
        return res.status(200).json(doctors);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener los doctores"
        });
    }
}

export const getDoctorsClinic = async(req: Request, res: Response) => {
    try {
        const idclinic = req.params.clinic;
        const response: QueryResult = await pool.query(
            "select doctors.nombre, doctors.especialidad, doctors.telefono from doctors, clinica where doctors.idclinic = clinica.id and clinica.id = $1", [idclinic]
        );
        const doctorsclinic = response.rows;
        return res.status(200).json(doctorsclinic);
    } catch (error) {
        return res.status(500).json({
            message: "error al obtener los doctores de la clinica"
        });
    }

}