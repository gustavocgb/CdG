import express from 'express'
import { cors } from "./middlewares"
import {routes} from './routes/index'
import env from '../../dotenv'
import {GeoCrawlerFactory} from "../../../main/factories";
import path from "path";

const port = env.APP_PORT || 3333
const app = express();

app.use(express.static(path.join(path.resolve())+'/public/frontend'))
app.use(express.json());
app.use(cors)
app.use(routes)

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`)
    // call crawler run
    // const resp = await GeoCrawlerFactory().handle()
    // console.log(resp)
})
