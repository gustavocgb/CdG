import {Controller} from "../../../gateway/controller/controller"
import {ControlsRepository} from "../../../../application/rules/controlsRepository/controlsRepository";
import path from "path";

export class GetControlsRepositoryController implements Controller {

    readonly constrolsRepository: ControlsRepository

    constructor(constrolsRepository: ControlsRepository) {
        this.constrolsRepository = constrolsRepository
    }

    async handle(req: any) {

        try {

            const geoApis = await this.constrolsRepository.getControlsAllByGeoapiId()

            return {
                statusCode: 200,
                body: {
                    body: geoApis
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
