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