import {GeoService, GeoServiceEntity} from "../../../domain/rules/geoService";

export abstract class Geocoder {

    protected geoService: any

    constructor(geoServiceData: GeoServiceEntity) {
        this.geoService = GeoService.createGeoService(geoServiceData)
    }

    abstract getFormatedAddress(address: string): string
    abstract responseGeoapi(address: string): Promise<any>
    abstract responseMapper(json: any): Promise<any>

    GeoService(): GeoService {
        return this.geoService
    }
}
