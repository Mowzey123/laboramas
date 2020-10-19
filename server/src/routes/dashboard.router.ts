import { Request, Response,Router} from 'express';
import winstonobj from '../helpers/winstonLogger';
const path = require('path')
import Csvparser from '../helpers/csvparser';

class dashboardRouter{
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    // get dashboard data
    filterDashbordData = (req:Request,res:Response) => {
        // generate unique name for uploaded file
       Csvparser.getRecordsBetweenDates(req,res,(data:any)=>{
           console.log(data)
           const sortedArray = data.sort(function(a:any, b:any) { // sort array returned
                return a.TotalProfit - b.TotalProfit 
            });
        //    console.log(sortedArray)
            res.status(200).json({
                status:true,
                data:sortedArray.slice(0,5),
                totalprofit:sortedArray.reduce((prev:any, cur:any) =>{
                    return prev + cur.TotalProfit;
                  }, 0)
            })
       })
    }

    routes(): void {
        this.router.post('/filterDashbordData',this.filterDashbordData);
    }

}
// access
const dashboardRouterObj = new dashboardRouter();
dashboardRouterObj.routes();
const dashboardrouter = dashboardRouterObj.router;
export default dashboardrouter;
