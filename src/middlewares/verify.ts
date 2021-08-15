import { pool } from './../database';
import { QueryResult } from 'pg';
import { NextFunction, Request, Response } from "express";

export const emailDuplicate = async(req: Request, res: Response, next: NextFunction) => {
    const userEmail = req.body.email;
    const emailUser: QueryResult = await pool.query('SELECT users.email FROM users WHERE users.email = $1', [userEmail]);
    if(emailUser.rows.length > 0){
        return res.status(400).json({message: 'El email ya existe'});
    }
    next();
    return;
}

export const userNameDuplicate = async(req: Request, res: Response, next: NextFunction) => {
    const userName = req.body.username;
    const userNameUser: QueryResult = await pool.query('SELECT users.username FROM users WHERE users.username = $1', [userName]);
    if(userNameUser.rows.length > 0){
        return res.status(400).json({message: 'El usuario ya existe'});
    }
    next();
    return;
}

export const doctorAleatorio = async() => {
    const doctorMax: QueryResult = await pool.query(
        "select max(doctors.id) from doctors"
    );
    const max = doctorMax.rows[0].max;
    let doctorRnd = Math.floor(Math.random() * (max - 12)) + 12;
    return doctorRnd;
}

export const getUserId = async(username: string) => {
    const response: QueryResult = await pool.query(
        "select users.id from users where users.username = $1",
        [username]
    );
    const userId = response.rows[0].id;
    return userId;
}

export const lastReservation = async() => {
    const response: QueryResult = await pool.query(
        "select max(consultamedica.nroreserva) from consultamedica"
    );
    const maxNum = response.rows[0].max;
    return maxNum;
}

export const getInfoDoctor = async(id: number) => {
    const response: QueryResult = await pool.query(
        "select doctors.nombre as doctor,doctors.telefono as celDoctor,doctors.idclinic from doctors where doctors.id = $1",
        [id]
    );
    const infoDoctor = response.rows[0];
    return infoDoctor;
}

export const getInfoClinic = async(id: number) => {
    const response: QueryResult = await pool.query(
        "select clinica.nombre as posta,clinica.direccion as ubicacion from clinica where id = $1",
        [id]
    );
    const infoClinic = response.rows[0];
    return infoClinic;
}