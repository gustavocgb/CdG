import {sendFile} from "../../adpters/route/sendFile";

export const home = {
    route(route: any) {
        route.get('/', sendFile('home'));
    }
}


