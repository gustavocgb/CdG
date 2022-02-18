import {addressCreateCsv} from "../../../main/factories";
import {statusJson} from "../../adpters/route/statusJson";

export const addressCsv = {
    route(route: any) {
        route.get('/address/csv/create', statusJson(addressCreateCsv()))
    }
}


