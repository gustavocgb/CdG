import {Mapper} from "../../mapper/mapper";
import {ControlsModel} from "../models/controls";
import {ControlsEntity} from "../../../domain/rules/controls";

export let mapperControls: Mapper = {
    modelToEntity(model: ControlsModel) {
        let objEntity: any = {}
        let entity: ControlsEntity = {
            id: model?.id,
            isDate: model?.isDate,
            isRequests: model?.isRequests,
            isAddress: model?.isAddress,
            date: model?.date?new Date(model.date):undefined,
            currentAddress: model?.current_address,
            isGeocoding: model?.isGeocoding,
            geocodify: model?.geocodify,
            requests: model?.requests,
            totalGeocodify: model?.total_geocodify,
            isDay: model?.isDay,
            geoapiKey: model?.geoapi_key,
            geoapiId: model?.geoapi_id,
            errors: model?.errors,
            totalRequests: model?.total_requests,
            initialDate: model?.initial_date?new Date(model.initial_date):undefined,
            totalErrors: model?.total_errors,
        }
        let arrayEntity = Object.entries(entity).filter(([key, value]) => value != null)
        for (let item of arrayEntity) {
            objEntity[item[0]] = item[1]
        }
        return objEntity
    },
    entityToModel(entity: ControlsEntity) {
        let objModel: any = {}
        let model: ControlsModel = {
            id: entity?.id,
            isDate: entity?.isDate,
            isRequests: entity?.isRequests,
            isAddress: entity?.isAddress,
            date: entity?.date?new Date(entity.date):undefined,
            current_address: entity?.currentAddress,
            isGeocoding: entity?.isGeocoding,
            geocodify: entity?.geocodify,
            requests: entity?.requests,
            total_geocodify: entity?.totalGeocodify,
            isDay: entity?.isDay,
            geoapi_key: entity?.geoapiKey,
            geoapi_id: entity?.geoapiId,
            errors: entity?.errors,
            initial_date: entity?.initialDate?new Date(entity.initialDate):undefined,
            total_errors: entity?.totalErrors,
            total_requests: entity?.totalRequests
        }
        let arrayModel = Object.entries(model).filter(([key, value]) => value != null)
        for (let item of arrayModel) {
            objModel[item[0]] = item[1]
        }
        return objModel
    }
}
