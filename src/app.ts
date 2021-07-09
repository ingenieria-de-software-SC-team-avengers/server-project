import express from "express";

export default class Server{
    public app: express.Application;

    constructor(){
        this.app = express();
    }

    start(callback: any){
        this.app.listen(callback);
    }
}

