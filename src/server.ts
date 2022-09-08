import { sequelize } from './database/index';
import express from "express"
import {adminJs, adminJsRouter} from "./adminjs"
import * as dotenv from "dotenv";

const app = express()
dotenv.config();

app.use(express.static('public'))
app.use(adminJs.options.rootPath, adminJsRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, async ()=>{
    await sequelize.authenticate().then(()=>{
        console.log(`DB connection successfull`)
    })
    console.log('Server started successfuly at port ' + PORT )
})