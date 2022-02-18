import env from "../../../dotenv";
import {Geocoder} from "../../../../application/rules/geocoder/geocoder";
import {HttpGet} from "../../../../interfaces/gateway/http";
import {ResponseEntity} from "../../../../domain/rules/response";
import {JsonMapper} from "../../mapper/jsonMapper";

export class HereApi extends Geocoder {

    readonly httpGet: any

    constructor(httpGet: HttpGet<any, any>) {
        super({
            name: "Here",
            apiKey: env.HERE_API_KEY,
            url: "https://geocode.search.hereapi.com/v1/geocode?q=*ADDRESS*&apiKey=*KEY*&in=countryCode:BRA&limit=1",
            isDay: true,
            maxRequest: 8333,
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

        if (json.items) {
            for (let addr of json.items) {
                let obj:ResponseEntity = {
                    full_address: addr?.address?.label?.toString(),
                    latitude: addr?.position?.lat?parseFloat(addr.position.lat):undefined,
                    longitude: addr?.position?.lng?parseFloat(addr.position.lng):undefined,
                    longWestBBox: addr?.mapView?.west?parseFloat(addr.mapView.west):undefined,
                    latSouthBBox: addr?.mapView?.south?parseFloat(addr.mapView.south):undefined,
                    longEastBBox: addr?.mapView?.east?parseFloat(addr.mapView.east):undefined,
                    latNorthBBox: addr?.mapView?.north?parseFloat(addr.mapView.north):undefined,
                    state: addr?.address?.state?.toString(),
                    zip_code: addr?.address?.postalCode?.toString(),
                    public_place: addr?.address?.street?.toString(),
                    city: addr?.address?.city?.toString(),
                    number: addr?.address?.houseNumber?.toString(),
                    country: addr?.address?.countryName?.toString(),
                    district: addr?.address?.district?.toString(),
                    accuracy: addr?.scoring?.queryScore?parseFloat(addr.scoring.queryScore):undefined,
                }
                array.push(obj)
            }
        }
        return array
    }
}
