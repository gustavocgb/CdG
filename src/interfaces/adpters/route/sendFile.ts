import { Request, Response } from '../../../infra/framework/express/adapters/express-route-adapter'
import path from "path";

export const sendFile = (folder: string) => {
    return async (req: Request, res: Response) => {
        res.sendFile(path.join(path.resolve())+`/public/frontend/pages/${folder}/index.html`)
    }
}
