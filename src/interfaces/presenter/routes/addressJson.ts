import {addressCreateJson} from "../../../main/factories";
import {statusJson} from "../../adpters/route/statusJson";

export const addressJson = {
    route(route: any) {
        route.get('/address/json/create', statusJson(addressCreateJson()))
    }
}

