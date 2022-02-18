import { dataBase } from "../config/database"
import {ResponseRepository} from "../../../../../application/rules/responseRepository/responseRepository";
import {Mapper} from "../../../../mapper/mapper";
import {SearchModel} from "../../../models/search";
import {ResponseModel} from "../../../models/response";

export class ResponseRepositoryPostegreSql extends ResponseRepository {

    constructor() {
        super()
    }

    async executeQuery(query: any) {
        const client = await dataBase.connect()
        const response = await client.query(query)
        await dataBase.disconnect(client)
        return response
    }

    async saveResponseGeoapi(data: any) {
        const dataModel = mapperSearch.entityToModel(data)
        const {geoapi_id, error, date, request_id, generated_response} = dataModel as any
        const query = {
            text: 'INSERT INTO public."Search" (date, error, generated_response, request_id, geoapi_id) VALUES($1, $2, $3, $4, $5)',
            values: [date, error, generated_response, request_id, geoapi_id]
        }
        await this.executeQuery(query)
    }

    async saveResponseGeocodify(data: any) {
        const dataModel = mapperResponse.entityToModel(data)
        const {
            full_address,
            public_place,
            number,
            district,
            zip_code,
            city,
            state,
            country,
            accuracy,
            latitude,
            longitude,
            place_type,
            longWestBBox,
            latNorthBBox,
            longEastBBox,
            latSouthBBox,
            request_id,
            geoapi_id
        } = dataModel as any

        const value = [
            full_address,
            public_place,
            district,
            zip_code,
            city,
            state,
            country,
            accuracy,
            latitude,
            longitude,
            place_type,
            longWestBBox,
            latNorthBBox,
            longEastBBox,
            latSouthBBox,
            request_id,
            number,
            geoapi_id
        ]

        const query = {
            text: 'INSERT INTO public."Response"(' +
                    'full_address,' +
                    'public_place,' +
                    'district,' +
                    'zip_code,' +
                    'city,' +
                    'state,' +
                    'country,' +
                    'accuracy,' +
                    'latitude,' +
                    'longitude,' +
                    'place_type,' +
                    '"longWestBBox",' +
                    '"latNorthBBox",' +
                    '"longEastBBox",' +
                    '"latSouthBBox",' +
                    'request_id,' +
                    '"number",' +
                    'geoapi_id' +
                ') ' +
                'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)',
            values: value
        }
        await this.executeQuery(query)
    }

}

let mapperSearch: Mapper = {
    modelToEntity(model: any) {
        throw 'method not implemented'
    },
    entityToModel(entity: any) {
        // console.log(entity)
        let model: SearchModel = {
            request_id: entity?.addressId?parseInt(entity.addressId):undefined,
            date: entity?.currentDate?new Date(entity.currentDate):undefined,
            geoapi_id: entity?.geoapiId?.toString(),
            error: entity?.error?.toString(),
            generated_response: entity?.generatedResponse
        }
        return model
    }
}

let mapperResponse: Mapper = {
    modelToEntity(model: any) {
        throw 'method not implemented'
    },
    entityToModel(entity: any) {
        // console.log(entity)
        let model: ResponseModel = {
            full_address: entity?.full_address?.toString(),
            latitude: entity?.latitude?parseFloat(entity.latitude):undefined,
            longitude: entity?.longitude?parseFloat(entity.longitude):undefined,
            longWestBBox: entity?.longWestBBox?parseFloat(entity.longWestBBox):undefined,
            latSouthBBox: entity?.latSouthBBox?parseFloat(entity.latSouthBBox):undefined,
            longEastBBox: entity?.longEastBBox?parseFloat(entity.longEastBBox):undefined,
            latNorthBBox: entity?.latNorthBBox?parseFloat(entity.latNorthBBox):undefined,
            state: entity?.state?.toString(),
            zip_code: entity?.zip_code?.toString(),
            public_place: entity?.public_place?.toString(),
            city: entity?.city?.toString(),
            number: entity?.number?.toString(),
            country: entity?.country?.toString(),
            district: entity?.district?.toString(),
            accuracy: entity?.accuracy?parseFloat(entity.accuracy):undefined,
            place_type: entity?.place_type?.toString(),
            request_id: entity?.addressId?parseInt(entity.addressId):undefined,
            geoapi_id: entity?.geoapiId?.toString()
        }
        return model
    }
}
