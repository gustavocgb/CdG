import env from "../../../dotenv";
import {Geocoder} from "../../../../application/rules/geocoder/geocoder";
import {HttpGet} from "../../../../interfaces/gateway/http";
import {ResponseEntity} from "../../../../domain/rules/response";
import {JsonMapper} from "../../mapper/jsonMapper";

export class GoogleApi extends Geocoder {

    readonly httpGet: any

    constructor(httpGet: HttpGet<any, any>) {
        super({
            name: "Google",
            apiKey: env.GOOGLE_API_KEY,
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=*ADDRESS*&key=*KEY*&components=country:BR",
            isDay: true,
            maxRequest: 1333,
            maxRequestPerSecond: 1,
            isInitialHours00: true
        })
        this.httpGet = httpGet
    }

    getFormatedAddress(address: string) {
        return address.replace(/ /g, "+")
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
        let array: Array<any> = [];
        let obj: ResponseEntity = {};

        if (json.results && json.status === "OK") {
            for (const addr of json.results) {
                obj.full_address = addr.formatted_address;

                addr.address_components.forEach((element: any) => {
                    obj.number = element.types.includes("street_number") ? element.long_name : obj.number;
                    obj.public_place = element.types.includes("route") ? element.long_name : obj.public_place;
                    obj.district = element.types.includes("sublocality_level_1") ? element.long_name : obj.district;
                    obj.zip_code = element.types.includes("postal_code") ? element.long_name : obj.zip_code;
                    obj.city = element.types.includes("administrative_area_level_2") ? element.long_name : obj.city;
                    obj.state = element.types.includes("administrative_area_level_1") ? element.long_name : obj.state;
                    obj.country = element.types.includes("country") ? element.long_name : obj.country;
                });

                obj.latitude = addr.geometry?.location?.lat;
                obj.longitude = addr.geometry?.location?.lng;

                obj.longWestBBox = addr.geometry?.viewport?.southwest.lng;
                obj.longEastBBox = addr.geometry?.viewport?.northeast.lng;
                obj.latNorthBBox = addr.geometry?.viewport?.northeast.lat;
                obj.latSouthBBox = addr.geometry?.viewport?.southwest.lat;

                obj.place_type = addr.types[0];

                array.push(obj);
            }
            return array;
        } else if (json.status !== "ZERO_RESULTS") {
            const status = json?.status;
            const error = json?.error_message || "";

            throw new Error(`${status}: ${error}`);
        }

    }
}
