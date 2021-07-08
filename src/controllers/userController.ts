import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";

export const getUsers = async(req: Request, res: Response) => {
    try {
        const users: QueryResult = await pool.query('SELECT * FROM users');
        return res.status(200).json(users.rows);
    } catch (error) {
        return res.status(500).json('Error de privilegios revisa la doc de postgresql');
    }

}
