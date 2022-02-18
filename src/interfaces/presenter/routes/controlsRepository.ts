import {
    getControlsRepositoryFactory,
    postControlsRepositoryFactory,
    updateControlsRepositoryFactory,
    deleteControlsRepositoryFactory
} from "../../../main/factories/controlsRepository";
import {statusJson} from "../../adpters/route/statusJson";

export const controlsRepository = {
    route(route: any) {
        route.get('/controls', statusJson(getControlsRepositoryFactory()))
        route.post('/controls', statusJson(postControlsRepositoryFactory()))
        route.put('/controls', statusJson(updateControlsRepositoryFactory()))
        route.delete('/controls', statusJson(deleteControlsRepositoryFactory()))
    }
}

