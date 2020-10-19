import * as dotenv from "dotenv";
import * as path from 'path';

dotenv.config();
let workingpath: string =  path.resolve(__dirname).split('/build') [0];
    workingpath = workingpath +'/secretes/.env';

dotenv.config({ path: workingpath });


export const PORT = process.env.PORT;


