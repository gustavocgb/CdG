import {Geocoder} from "../../../../application/rules/geocoder/geocoder";
import {HttpGet} from "../../../../interfaces/gateway/http";
import {ResponseEntity} from "../../../../domain/rules/response";
import {JsonMapper} from "../../mapper/jsonMapper";

export class NominatimApi extends Geocoder {

    readonly httpGet: any

    constructor(httpGet: HttpGet<any, any>) {
        super({
            name: "Nominatim",
            apiKey: undefined,
            url: "https://nominatim.openstreetmap.org/?addressdetails=1&q=*ADDRESS*&format=json&countrycodes=BR&limit=1",
            isDay: true,
            maxRequest: 86400,
            maxRequestPerSecond: 1,
            isInitialHours00: true
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

        if (json) {
            for (let addr of json) {
                let obj:ResponseEntity = {
                    accuracy: addr?.importance?parseFloat(addr.importance):undefined,
                    latitude: addr?.lat?parseFloat(addr.lat):undefined,
                    longitude: addr?.lon?parseFloat(addr.lon):undefined,
                    longWestBBox: addr?.boundingbox?parseFloat(addr.boundingbox[2]):undefined,
                    latSouthBBox: addr?.boundingbox?parseFloat(addr.boundingbox[3]):undefined,
                    longEastBBox: addr?.boundingbox?parseFloat(addr.boundingbox[0]):undefined,
                    latNorthBBox: addr?.boundingbox?parseFloat(addr.boundingbox[1]):undefined,
                    full_address: addr?.display_name?.toString(),
                    city: addr?.address?.town?.toString() || addr?.address?.city?.toString(),
                    district: addr?.address?.suburb?.toString(),
                    country: addr?.address?.country?.toString(),
                    public_place: addr?.address?.road?.toString(),
                    state: addr?.address?.state?.toString(),
                    zip_code: addr?.address?.postcode?.toString()
                }
                array.push(obj)
            }
        }
        return array
    }
}
