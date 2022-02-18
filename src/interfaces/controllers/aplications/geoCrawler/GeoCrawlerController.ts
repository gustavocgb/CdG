import {Controller} from "../../../gateway/controller/controller";
import {GeoCrawlerInterface} from "../../../../application/rules/geoCrawler/geoCrawler";

export class GeoCrawlerController implements Controller {

    readonly geoCrawlers: GeoCrawlerInterface[]

    constructor(geoCrawlers: GeoCrawlerInterface[]) {
        this.geoCrawlers = geoCrawlers
    }

    async handle(req: any) {

        try {

            console.log("-- Crawler its runing.. ... --")
            await Promise.all(this.geoCrawlers.map((resp: any) => (
                resp.run()
            )))

            return {
                statusCode: 200,
                body: {
                    ok: 'Crawler its runing..'
                }
            }

        } catch (e) {
            console.log(e)
            return {
                statusCode: 500,
                body: {
                    error: 'server error'
                }
            }
        }

    }


}
