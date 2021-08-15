import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";
import * as verify from "../middlewares/verify";
import dotenv from "dotenv";
import { WebhookClient } from "dialogflow-fulfillment";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

dotenv.config();

export const registerConsulta = async (req: Request, res: Response) => {
  let doctorRnd = await verify.doctorAleatorio(req, res);
  const idUser = await verify.getUserId(req, res);
  const lastR = await verify.lastReservation();
  const infoDoc = await verify.getInfoDoctor(doctorRnd);
  const {nombre,telefono,idclinic} = infoDoc;
  const infoClinic = await verify.getInfoClinic(idclinic);
/*   const agent = new WebhookClient({ request: req, response: res });
  console.log("Dialogflow Request headers: " + JSON.stringify(req.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(req.body));
  function reservarCita() {
    const fecha = req.body.queryResult.parameters.fecha;
    const nroreserva = lastR + 1;
    const cliente = req.body.queryResult.parameters.nombre.name;
    const email = req.body.queryResult.parameters.email;
    const telefono = req.body.queryResult.parameters.telefono;
    const msg = {
      to: email, // Change to your recipient
      from: "cristhian_086@hotmail.com", // Change to your verified sender
      templateId: "d-5b42f625733a4d95b7ab4f4779361942",
      dynamic_template_data: {
        
      },
    };
  } */
  console.log();
};
