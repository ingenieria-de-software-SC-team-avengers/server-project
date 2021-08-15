import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const registerTemperature = async (req: Request, res: Response) => {
  try {
    //datos enviados por el req (valor,username) buscar el id user por el username
    const { valor, username } = req.body;
    const idUser: QueryResult = await pool.query(
      "SELECT users.id FROM users WHERE users.username = $1",
      [username]
    );
    const userSensor = idUser.rows[0].id;
    const response: QueryResult = await pool.query(
      "INSERT INTO dataSensors (valor,fecha,idUser) VALUES ($1,$2,$3)",
      [valor, "now()", userSensor]
    );

    //retornamos algo para confirmar el registro del dato del sensor
    return res.status(200).json({
      message: "Registro guardado exitosamente",
    });
  } catch (error) {
    return res.status(500).json("Error no se pudo registrar la temperatura");
  }
};

export const getAllTemperatures = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const userResponse: QueryResult = await pool.query(
      "SELECT users.id FROM users WHERE users.username = $1",
      [username]
    );
    const idUser = userResponse.rows[0].id;
    const temperatures: QueryResult = await pool.query(
      "SELECT datasensors.valor,datasensors.fecha FROM datasensors WHERE datasensors.iduser = $1",
      [idUser]
    );
    const respuesta = temperatures.rows;
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(500).json({
        message: 'Error al obtener las temperaturas de este usuario'
    });
  }
};
