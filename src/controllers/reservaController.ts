import dotenv from "dotenv";
import * as verify from "../middlewares/verify";
import { QueryResult } from "pg";
import { pool } from "../database";
import { Request, Response } from "express";

dotenv.config();

export const registrarReserva = async(req: Request, res: Response) => {
    try {
        const {fecha, iddoctor, client, email, telefono, username} = req.body;
        const fechaRes = new Date(fecha);
        const nroRes = await verify.lastReservation() + 1;
        const idUser = await verify.getUserId(username);
        const estado = "aprobado";
        const resp: QueryResult = await pool.query(
            "insert into consultamedica(fecha,nroreserva,iduser,iddoctor,client,email,telefono,estado) values($1,$2,$3,$4,$5,$6,$7,$8)",
            [fechaRes,nroRes,idUser,iddoctor,client,email,telefono,estado]
        );
        return res.status(200).send({
            message: "Reservado"
        });
    } catch (error) {
       console.log(error);
       return res.status(500).send({
           message: "Error",
           error
       }); 
    }
}

export const getReservas = async(req: Request, res: Response) => {
    
    try {
        
        const username = req.query.username as string;
        const idUser = await verify.getUserId(username);
        const response: QueryResult = await pool.query(
            "select consultamedica.fecha,consultamedica.nroreserva,consultamedica.client,consultamedica.email,consultamedica.telefono from consultamedica where consultamedica.iduser = ?",
            [idUser]
        );
        const reservas = response.rows;
        return res.status(200).send(reservas);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error",
            error
        });
    }
}