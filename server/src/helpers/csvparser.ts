import fs = require('fs');
import path = require('path');
const csv = require('csv-parser');
import {Response} from 'express';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

 class Csvparser{

    constructor(){
        // this.readFilesInDir()
    }

  

    readFilesInDir = (res:Response) => {
        /**
         * Function reades all filels in uploads directory and converts data to json
         */
        fs.readdir(path.join(__dirname,'../../uploads'), (err:any, filenames:any) => {
          if (err) {
            console.log({
                status:false,
                message:'failed to read files',
                err:err},'ErrorLogs'
            )
            res.json({status:false,message:'Failed to get sales'})
          }
          if(filenames.length == 0){
            res.status(200).json({status:true,data:[],message:'sales collected'})
          }

            let results:any =[]; 
            filenames.forEach((filename:string)=> {
                results.push(this.readListOfFiles(filename,null))
            })
            Promise.all(results).then((sales:any)=>{
              res.status(200).json({status:true,message:'sales collected',data:sales.flat()})
            })
        });
    }

    //get all records that fall within requested date range
    getRecordsBetweenDates = (req:any,res:Response,callback:any) => {
        fs.readdir(path.join(__dirname,'../../uploads'), (err:any, filenames:any) => {
          if (err) {
            console.log({
                status:false,
                message:'failed to read files',
                err:err},'ErrorLogs'
            )
            res.json({status:false,message:'Failed to get dashbaord sales'})
          }
          if(filenames.length == 0){
            res.status(200).json({status:true,data:[],message:'sales collected'})
          }

            let results:any =[]; 
            filenames.forEach((filename:string)=> {
              results.push(this.readListOfFiles(filename,req.body))
            })
            Promise.all(results).then((sales:any)=>{
              callback(sales.flat())
            })
        });
    }

    readListOfFiles = (filename:string,query:any) => {
      return new Promise(async (resolve:any,reject:any)=>{
          let results:any = []
          await fs.createReadStream(path.join(__dirname,'../../uploads',filename))
          .pipe(csv({
            mapHeaders: ({ header }) => header.replace(/\s+/g,'')
          }))
          .on('data', (data:any) =>{ 
            if(query !=null){
              //adds date comaprission here
              const start = moment(query.from, 'YYYY-MM-DD');
              const end   = moment(query.to, 'YYYY-MM-DD');
              const date   = moment(data.OrderDate)
              const range = moment.range(start, end);
              data.TotalProfit = parseInt(data.TotalProfit)
              range.contains(date) ? results.push(data) : ''
            }else{
              return results.push(data)
            }
          })
          .on('end', () => {
              console.log({
                  status:true,
                  message:'Data harvested'
              },'SuccessLogs') 
              resolve(results) 
          });
        });
    }
}

export default new Csvparser();