import { Request, Response } from '../../../infra/framework/express/adapters/express-route-adapter'
import {Controller} from "../../gateway/controller/controller";

export const statusJson = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpResponse = await controller.handle(req)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}
