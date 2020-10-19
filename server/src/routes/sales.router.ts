import { Request, Response,Router} from 'express';
const path = require('path')
import Csvparser from '../helpers/csvparser';

class salesRouter{
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    // upload sales report
    uploadSalesReports = (req:any,res:Response) => {
        // generate unique name for uploaded file
        const newfilenames = `${path.join(__dirname,'../../uploads/')}${Date.now()}.${req.files.file.name.split(".")[1]}`;
        req.files.file.mv(newfilenames,(err:any)=> {
            if (err){
                console.log(
                    {
                        status:false,
                        message:"Failed to upload file",
                        err:err
                    },"ErrorLogs"
                )
                res.status(200).
                json({
                    status:false,
                    message:"Failed to upload file"
                })
            }else{
                res.status(200).json({
                    status:true,
                    message:"upload file"
                })
            }
        });
    }

    getAllSales  = (req:Request,res:Response) => {
        Csvparser.readFilesInDir(res);
    }



    routes(): void {
        this.router.post('/uploadSalesReports',this.uploadSalesReports);
        this.router.post('/getAllSales',this.getAllSales);
    }

}
// access
const salesRouterObj = new salesRouter();
salesRouterObj.routes();
const salesrouter = salesRouterObj.router;
export default salesrouter;
