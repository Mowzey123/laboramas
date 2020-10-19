import express =  require('express');
import bodyParser = require('body-parser');
import * as Config from './config/index';
const xss = require('xss-clean');
import { NextFunction ,Request,Response} from 'express';
import salesrouter from "./routes/sales.router";
import dashboardrouter from "./routes/dashboard.router"
const fileUpload =  require('express-fileupload');

class Server{

    app:express.Application;
    port: any;
  

    constructor(){
        this.app =  express();
        this.configureApp();
        this.configureRoutes();
    }


    configureApp():void{
         // this.app.use(cors);
         this.app.set('port', Config.PORT || 4000); 
         this.app.disable('x-powered-by');
         this.app.use(function(req, res, next) {  
             res.header("Access-Control-Allow-Origin", "*");
             res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
             res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
             res.header("Access-Control-Allow-Credentials", "true");
             next();
           });
         this.app.use(express.json({ limit: '10kb' })); // Body limit is 10
          this.app.use(fileUpload({ // limit file upload size
            limits: { fileSize: 100000 },
            }));
         this.app.use(express.json());
         this.app.use(express.urlencoded({extended: false}));
         this.app.use(xss());
    }

    // configure server routes
    configureRoutes():void{
        this.app.use('/salesReports',salesrouter);
        this.app.use('/dashboardRoutes',dashboardrouter);
    }

    startServer = () => {
        this.app.listen(this.app.get('port'),() => {
            console.log({msg:`Server started on port ${this.app.get('port')}`},'SuccessLogs');
        });
    }
}

const serverObj = new Server();
serverObj.startServer();
export default serverObj.app;