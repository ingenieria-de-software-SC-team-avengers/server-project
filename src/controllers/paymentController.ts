import { Client, resources } from "coinbase-commerce-node";
import { config } from "dotenv";
import { Request, Response } from "express";

config();

Client.init(process.env.COINBASE_API_KEY as string);

const {Charge} = resources;

export const createPayment = async(req: Request, res: Response) => {
    
    const chargeData: any = {
        name: 'Pago de reserva',
        description: 'Comodidad para pagar con criptomonedas',
        local_price: {
            amount: '0.2',
            currency: 'USD'
        },
        pricing_type: 'fixed_price',
        metadata: {
            customer_name: 'Cliente'
        },
        redirect_url: 'https://temperatureappweb.netlify.app/client/home'
        
    };
    const charge = await Charge.create(chargeData);

    return res.status(200).send(charge);
};