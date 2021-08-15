import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const singup = async(req: Request, res: Response) => {
    try {
        //insertar el usuario a la base de datos
        const {username, namecomplete, email, password, ci} = req.body;
        const roltype = "Cliente";
        const rol: QueryResult = await pool.query('SELECT rols.id FROM rols WHERE rols.rol = $1', [roltype]);
        const rolAsignado = rol.rows[0].id;
        const response: QueryResult = await pool.query('INSERT INTO users (username, namecomplete, email, password, ci, idrol) VALUES ($1, $2, $3, $4, $5, $6)', [username,namecomplete,email,password,ci,rolAsignado]);

        //agregamos un token en caso lo requieran en los clientes
        const token = jwt.sign({user: username}, `${process.env.SECRETKEY}`, {
            expiresIn: 86400 //24 HORAS
        });

        //retornamos lo que nos sea de utilidad en los clientes
        return res.status(200).json({
            token,
            user: {
                username,
                namecomplete,
                email,
                ci,
                roltype
            }
        });
    } catch (error) {
        return res.status(500).json('Error revisa la base de datos');
    }
}

export const singin = async(req: Request, res: Response) => {
    try {
            //encontrar al usuario
            const {username, password} = req.body;
            const userFound: QueryResult = await pool.query('SELECT * FROM users WHERE users.username = $1', [username]);
            if(userFound.rows.length == 0){
                return res.status(400).json({message: 'Usuario no encontrado'});
            }
            if(password != userFound.rows[0].password){
                return res.status(400).json({message: 'Contraseña incorrecta'});
            }
        
            const name = userFound.rows[0].namecomplete;
            const email = userFound.rows[0].email;
            const ci = userFound.rows[0].ci;
            //creamos el token
            const token = jwt.sign({user: username}, `${process.env.SECRETKEY}`, {
                expiresIn: 86400 //24 horas
            });
            const rolFound: QueryResult = await pool.query('SELECT rols.rol FROM rols WHERE rols.id = $1', [userFound.rows[0].idrol]); 
            const rol = rolFound.rows[0].rol;
                
            return res.status(200).json({
                token,
                user: {
                    username,
                    email,
                    ci,
                    name,
                    rol
                }
            });
    } catch (error) {
        return res.status(500).json('Error revisa la base de datos');
    }


}