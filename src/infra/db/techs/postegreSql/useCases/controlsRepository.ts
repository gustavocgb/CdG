import { dataBase } from "../config/database"
import {Mapper} from "../../../../mapper/mapper";
import {ControlsRepository, get} from "../../../../../application/rules/controlsRepository/controlsRepository";
import {GeoapiModel} from "../../../models/geoapi";
import {ControlsEntity} from "../../../../../domain/rules/controls";
import {ControlsModel} from "../../../models/controls";

export class ControlsRepositoryPostegreSql extends ControlsRepository {

    constructor() {
        super()
    }

    async executeQuery(query: any) {
        const client = await dataBase.connect()
        const response = await client.query(query)
        await dataBase.disconnect(client)
        return response
    }

    async getControlsByGeoapiId(data: any) {
        const dataModel = mapperGeoapi.entityToModel(data)
        const { geoapi_id } = dataModel as any
        const query = {
            text: 'SELECT * FROM public."Geoapi" JOIN public."Controls" ON (public."Geoapi".geoapi_id = public."Controls".geoapi_id) WHERE public."Geoapi".geoapi_id = $1',
            values: [geoapi_id]
        }
        const response = await this.executeQuery(query)
        let entity = mapperControls.modelToEntity(response.rows[0])
        return entity
    }

    async createDate(data: any) {
        const dataModel = mapperControls.entityToModel(data)
        const { date, id } = dataModel as any
        const query = {
            text: 'UPDATE public."Controls" SET date = $1 WHERE id = $2',
            values: [date, id]
        }
        await this.executeQuery(query)
    }

    async createIntialDate(data: any) {
        const dataModel = mapperControls.entityToModel(data)
        const { initial_date, id } = dataModel as any
        const query = {
            text: 'UPDATE public."Controls" SET initial_date = $1 WHERE id = $2',
            values: [initial_date, id]
        }
        await this.executeQuery(query)
    }

    async updateRequests(data: any) {
        const dataModel = mapperControls.entityToModel(data)
        const { current_address, requests, geocodify, total_geocodify, id, errors, total_errors, total_requests } = dataModel as any
        const query = {
            text: 'UPDATE public."Controls" SET requests = $1, current_address = $2, geocodify = $3, total_geocodify = $4, total_requests = $5, errors = $6, total_errors = $7 WHERE id = $8',
            values: [requests, current_address, geocodify, total_geocodify, total_requests, errors, total_errors, id]
        }
        await this.executeQuery(query)
    }

    async updateFlags(data: any) {
        const dataModel = mapperControls.entityToModel(data)
        const { isGeocoding, isRequests, isAddress, isDate, id } = dataModel as any
        const query = {
            text: 'UPDATE public."Controls" SET "isGeocoding" = $1, "isRequests" = $2, "isAddress" = $3, "isDate" = $4 WHERE id = $5',
            values: [isGeocoding, isRequests, isAddress, isDate, id]
        }
        await this.executeQuery(query)
    }

    async resetControls(data: any) {
        const dataModel = mapperControls.entityToModel(data)
        const { date, requests, geocodify, isGeocoding, isDate, id, errors } = dataModel as any
        const query = {
            text: 'UPDATE public."Controls" SET date = $1, requests = $2, geocodify = $3, "isGeocoding" = $4, "isDate" = $5, errors = $6 WHERE id = $7',
            values: [date, requests, geocodify, isGeocoding, isDate, errors ,id]
        }
        await this.executeQuery(query)
    }

    getControlsAllByGeoapiId(data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    update(data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

}

let mapperControls: Mapper = {
    modelToEntity(model: any) {
        // console.log(model)
        let entity: ControlsEntity = {
            id: model?.id?parseInt(model.id):undefined,
            isDate: model?.isDate,
            isRequests: model?.isRequests,
            isAddress: model?.isAddress,
            date: model?.date?new Date(model.date):undefined,
            currentAddress: model.current_address??parseInt(model.current_address),
            isGeocoding: model?.isGeocoding,
            geocodify: model.geocodify??parseInt(model.geocodify),
            requests: model.requests??parseInt(model.requests),
            totalGeocodify: model.total_geocodify??parseInt(model.total_geocodify),
            isDay: model?.isDay,
            geoapiKey: model?.geoapi_key?.toString(),
            geoapiId: model?.geoapi_id?.toString(),
            errors: model.errors??parseInt(model.errors),
            totalRequests: model.total_requests??parseInt(model.total_requests),
            initialDate: model.initial_date?new Date(model.initial_date):undefined,
            totalErrors: model.total_errors??parseInt(model.total_errors),
        }
        return entity
    },
    entityToModel(entity: any) {
        let model: ControlsModel = {
            id: entity?.id?parseInt(entity.id):undefined,
            isDate: entity?.isDate,
            isRequests: entity?.isRequests,
            isAddress: entity?.isAddress,
            date: entity?.date?new Date(entity.date):undefined,
            current_address: entity?.currentAddress?parseInt(entity.currentAddress):undefined,
            isGeocoding: entity?.isGeocoding,
            geocodify: entity?.geocodify??parseInt(entity.geocodify),
            requests: entity?.requests??parseInt(entity.requests),
            total_geocodify: entity?.totalGeocodify??parseInt(entity.totalGeocodify),
            isDay: entity?.isDay,
            geoapi_key: entity?.geoapiKey?.toString(),
            geoapi_id: entity?.geoapiId?.toString(),
            errors: entity?.errors??parseInt(entity.errors),
            initial_date: entity?.initialDate?new Date(entity.initialDate):undefined,
            total_errors: entity?.totalErrors??parseInt(entity.totalErrors),
            total_requests: entity?.totalRequests??parseInt(entity.totalRequests)
        }
        return model
    }
}

let mapperGeoapi: Mapper = {
    modelToEntity(model: any) {
        throw 'method not implemented'
    },
    entityToModel(entity: any) {
        // console.log(entity)
        let model: GeoapiModel = {
            geoapi_id: entity?.geoapiId?.toString()
        }
        return model
    }
}
