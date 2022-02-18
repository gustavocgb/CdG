import {Response} from '../../../domain/rules/response'

export abstract class ResponseRepository {

    protected response: any

    constructor() {
        this.response = Response.createResponse()
    }

    abstract saveResponseGeoapi(data: any): Promise<any>
    abstract saveResponseGeocodify(data: any): Promise<any>

}
