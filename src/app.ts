import express from "express";

export default class Server{
    public app: express.Application;
    public port: number;

    constructor(){
        this.app = express();
        this.port = 3000;
    }

    start(callback: any){
        this.app.listen(this.port || process.env.PORT || 3000, callback);
    }
}

