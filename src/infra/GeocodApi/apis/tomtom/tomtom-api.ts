import {Geocoder} from "../../../../application/rules/geocoder/geocoder";
import {HttpGet} from "../../../../interfaces/gateway/http";
import env from "../../../dotenv";
import {JsonMapper} from "../../mapper/jsonMapper";
import {ResponseEntity} from "../../../../domain/rules/response";

export class TomtomApi extends Geocoder {

    readonly httpGet: any

    constructor(httpGet: HttpGet<any, any>) {
        super({
            name: "TomTom",
            apiKey: env.TOMTOM_API_KEY,
            url: "https://api.tomtom.com/search/2/geocode/*ADDRESS*.json?key=*KEY*&limit=1&countrySet=BR",
            isDay: true,
            maxRequest: 2500,
            maxRequestPerSecond: 5,
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

        if (json.results) {
            for (let addr of json.results) {
                let obj:ResponseEntity = {
                    full_address: addr?.address?.freeformAddress?.toString(),
                    latitude: addr?.position?.lat?parseFloat(addr.position.lat):undefined,
                    longitude: addr?.position?.lon?parseFloat(addr.position.lon):undefined,
                    longWestBBox: addr?.viewport?.topLeftPoint?.lon?parseFloat(addr.viewport.topLeftPoint.lon):undefined,
                    latSouthBBox: addr?.viewport?.btmRightPoint?.lat?parseFloat(addr.viewport.btmRightPoint.lat):undefined,
                    longEastBBox: addr?.viewport?.btmRightPoint?.lon?parseFloat(addr.viewport.btmRightPoint.lon):undefined,
                    latNorthBBox: addr?.viewport?.topLeftPoint?.lat?parseFloat(addr.viewport.topLeftPoint.lat):undefined,
                    city: addr?.address?.municipality?.toString(),
                    district: addr?.address?.municipalitySubdivision?.toString(),
                    country: addr?.address?.country?.toString(),
                    public_place: addr?.address?.streetName?.toString(),
                    state: addr?.address?.countrySubdivision?.toString(),
                    zip_code: addr?.address?.extendedPostalCode?.toString(),
                    number: addr?.address?.streetNumber?.toString(),
                    accuracy: addr?.score?parseFloat(addr.score):undefined
                }
                array.push(obj)
            }
        }
        return array
    }
}
