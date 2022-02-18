import env from "../../../dotenv";
import {Geocoder} from "../../../../application/rules/geocoder/geocoder";
import {HttpGet} from "../../../../interfaces/gateway/http";
import {ResponseEntity} from "../../../../domain/rules/response";
import {JsonMapper} from "../../mapper/jsonMapper";

export class OpenRouteServiceApi extends Geocoder {

    readonly httpGet: any

    constructor(httpGet: HttpGet<any, any>) {
        super({
            name: "OpenRouteService",
            apiKey: env.ORS_API_KEY,
            url: "https://api.openrouteservice.org/geocode/search?api_key=*KEY*&text=*ADDRESS*&boundary.country=BR&size=1",
            isDay: true,
            maxRequest: 1000,
            maxRequestPerSecond: 1,
            isInitialHours00: false
        })
        this.httpGet = httpGet
    }

    getFormatedAddress(address: string) {
        return address
    }

    getFullUrl(address:string) {
        let fullUrl = this.geoService.getApiUrl().replace('*ADDRESS*', address)
        return fullUrl.replace('*KEY*', this.geoService.getApiKey())
    }

    async responseGeoapi(address: string) {
        return new Promise(async (resolve, reject) => {
            try{
                // await a second to request
                await new Promise(resolve => setTimeout(resolve, 1000))
                const formatedAddress = this.getFormatedAddress(address)
                const resp = await this.httpGet.get({url:this.getFullUrl(formatedAddress) as string})
                resolve(resp)
            }catch (e: any) {
                reject(new Error(e))
            }
        })
    }

    async responseMapper(json: any) {
        return await mapper.responseJsonToEntity(json)
    }

}

let mapper: JsonMapper = {
    async responseJsonToEntity(json: any) {
        let array: any[] = []

        if (json.features) {
            for (let addr of json.features) {
                let obj:ResponseEntity = {
                    latitude: addr?.geometry?.coordinates?parseFloat(addr.geometry.coordinates[1]):undefined,
                    longitude: addr?.geometry?.coordinates?parseFloat(addr.geometry.coordinates[0]):undefined,
                    longWestBBox: addr?.bbox?parseFloat(addr.bbox[2]):undefined,
                    latSouthBBox: addr?.bbox?parseFloat(addr.bbox[3]):undefined,
                    longEastBBox: addr?.bbox?parseFloat(addr.bbox[0]):undefined,
                    latNorthBBox: addr?.bbox?parseFloat(addr.bbox[1]):undefined,
                    full_address: addr?.properties?.label?.toString(),
                    city: addr?.properties?.locality?.toString(),
                    district: addr?.properties?.neighbourhood?.toString(),
                    country: addr?.properties?.country?.toString(),
                    public_place: addr?.properties?.street?.toString(),
                    state: addr?.properties?.region?.toString(),
                    zip_code: addr?.properties?.postalcode?.toString(),
                    number: addr?.properties?.housenumber?.toString(),
                    accuracy: addr?.properties?.confidence?parseFloat(addr?.properties?.confidence):undefined,
                    place_type: addr?.properties?.venue?.toString()
                }
                array.push(obj)
            }
        }
        return array
    }
}
