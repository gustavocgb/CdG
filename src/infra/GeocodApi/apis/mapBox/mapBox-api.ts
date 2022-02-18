import env from "../../../dotenv";
import {Geocoder} from "../../../../application/rules/geocoder/geocoder";
import {HttpGet} from "../../../../interfaces/gateway/http";
import {ResponseEntity} from "../../../../domain/rules/response";
import {JsonMapper} from "../../mapper/jsonMapper";

export class MapBoxApi extends Geocoder {

    readonly httpGet: any

    constructor(httpGet: HttpGet<any, any>) {
        super({
            name: "MapBox",
            apiKey: env.MAPBOX_API_KEY,
            url: "https://api.mapbox.com/geocoding/v5/mapbox.places/*ADDRESS*.json?types=address&limit=1&country=BR&access_token=*KEY*",
            isDay: true,
            maxRequest: 3333,
            maxRequestPerSecond: 1,
            isInitialHours00: true
        })
        this.httpGet = httpGet
    }

    getFormatedAddress(address: string) {
        let addr = address.replace(/,/gi, '')
        return addr.replace(/-/gi, '')
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
        let attributes: any[] = [
            {
                id: 'neighborhood',
                text: undefined,
            },{
                id: 'place',
                text: undefined,
            },{
                id: 'postcode',
                text: undefined,
            },{
                id: 'region',
                text: undefined,
            },{
                id: 'country',
                text: undefined,
            }
        ]

        if (json.features) {
            for (let addr of json.features) {

                for (let context of addr.context) {
                    attributes.forEach(obj => {
                        if (context?.id.split('.')[0] === obj.id) obj.text = context?.text?.toString()
                    })
                }

                let obj:ResponseEntity = {
                    latitude: addr?.geometry?.coordinates?parseFloat(addr.geometry.coordinates[1]):undefined,
                    longitude: addr?.geometry?.coordinates?parseFloat(addr.geometry.coordinates[0]):undefined,
                    longWestBBox: addr?.bbox?parseFloat(addr.bbox[2]):undefined,
                    latSouthBBox: addr?.bbox?parseFloat(addr.bbox[3]):undefined,
                    longEastBBox: addr?.bbox?parseFloat(addr.bbox[0]):undefined,
                    latNorthBBox: addr?.bbox?parseFloat(addr.bbox[1]):undefined,
                    accuracy: addr?.relevance?parseFloat(addr.relevance):undefined,
                    full_address: addr?.place_name?.toString(),
                    number: addr?.address?.toString(),
                    public_place: addr?.text?.toString(),
                    place_type: addr?.place_type?addr.place_type[0]?.toString():undefined,
                    country: attributes[4]?.text,
                    city: attributes[1]?.text,
                    state: attributes[3]?.text,
                    district: attributes[0]?.text,
                    zip_code: attributes[2]?.text,
                }
                array.push(obj)
            }
        }
        return array
    }
}
