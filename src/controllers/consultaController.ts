import { WebhookClient } from "dialogflow-fulfillment";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database";
import * as verify from "../middlewares/verify";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

dotenv.config();

export const registerConsulta = async (req: Request, res: Response) => {
  const agent = new WebhookClient({ request: req, response: res });
  //console.log("Dialogflow Request headers: " + JSON.stringify(req.headers));
  //console.log("Dialogflow Request body: " + JSON.stringify(req.body));
  async function reservarCita() {
    const username = req.body.queryResult.parameters.username.name;
    let doctorRnd = await verify.doctorAleatorio();
    const idUser = await verify.getUserId(username);
    const lastR = await verify.lastReservation();
    const infoDoc = await verify.getInfoDoctor(doctorRnd);
    const {doctor,celdoctor,idclinic} = infoDoc;
    const infoClinic = await verify.getInfoClinic(idclinic);
    const {posta,ubicacion} = infoClinic;
    const nroreserva = lastR + 1;
    const fecha = req.body.queryResult.parameters.fecha;
    const nombre = req.body.queryResult.parameters.nombre[0].name;
    const email = req.body.queryResult.parameters.email;
    const telefono = req.body.queryResult.parameters.telefono;
    const msg = {
      to: email, // Change to your recipient
      from: "cristhian_086@hotmail.com", // Change to your verified sender
      templateId: "d-5b42f625733a4d95b7ab4f4779361942",
      dynamic_template_data: {
        doctor,posta,ubicacion,celdoctor,nombre,telefono,fecha,nroreserva
      },
    };
    const response: QueryResult = await pool.query(
        "insert into consultamedica(fecha,nroreserva,iduser,iddoctor,client,email,telefono) values($1,$2,$3,$4,$5,$6,$7)",
        ['now()',nroreserva,idUser,doctorRnd,nombre,email,telefono]
    );
    if(response){
        console.log("datos insertados correctamente de la consulta");
    }
    sgMail.send(msg);
    agent.add(`Gracias por reservar, la reserva fuen enviada a tu correo o tambien contactarse via whatsapp https://wa.me/59176672651`);
  }
  let intentMap = new Map();
  intentMap.set('reservarCita', reservarCita);
  agent.handleRequest(intentMap);
};

export const reservarConsulta = async(req: Request, res: Response) => {
    const {username,client,email,telefono} = req.body;
    
}
