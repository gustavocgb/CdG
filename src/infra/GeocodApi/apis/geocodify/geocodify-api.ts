// import {dataJsonMapper, JsonMapper} from "../../../../interfaces/adpters/api/JsonMapper";
// import env from "../../../dotenv";
//
// export class GeocodifyApi {
//
//     public name = "Geocodify"
//     public url = "https://api.geocodify.com/v2/geocode?api_key=*KEY*&q=*ADDRESS*"
//     public apiKey? = env.GEOCODIFY_API_KEY
//
//     private maxRequestPerSecond = 1
//     private maxRequest = 1000
//     private isDay = true
//
//     getName() {
//         return this.name
//     }
//
//     getApiUrl() {
//         return this.url
//     }
//
//     getApiKey() {
//         return this.apiKey
//     }
//
//     getMaxRequestPerSecond() {
//         return this.maxRequestPerSecond
//     }
//
//     getMaxRequest() {
//         return this.maxRequest
//     }
//
//     getIsDay() {
//         return this.isDay
//     }
//
//     createJasonMapper(): GeocodifyMapper {
//         return new GeocodifyMapper()
//     }
//
// }
//
// class GeocodifyMapper implements JsonMapper {
//
//     getFormatedAddress(address: string) {
//         return address
//     }
//
//     mapper(data: any): any {
//
//         let array: any[] = []
//
//         if (data.response.features) {
//             for (let addr of data.response.features) {
//                 let obj:dataJsonMapper = {
//                     latitude: addr.geometry.coordinates?addr.geometry.coordinates[1]:undefined,
//                     longitude: addr.geometry.coordinates?addr.geometry.coordinates[0]:undefined,
//                     longWestBBox: addr.bbox?addr.bbox[2]:undefined,
//                     latSouthBBox: addr.bbox?addr.bbox[3]:undefined,
//                     longEastBBox: addr.bbox?addr.bbox[0]:undefined,
//                     latNorthBBox: addr.bbox?addr.bbox[1]:undefined,
//                     full_address: addr?.properties?.label,
//                     city: addr?.properties?.locality,
//                     district: addr?.properties?.neighbourhood,
//                     country: addr?.properties?.country,
//                     public_place: addr?.properties?.street,
//                     state: addr?.properties?.region,
//                     zip_code: addr?.properties?.postalcode,
//                     number: addr?.properties?.housenumber,
//                     accuracy: addr?.properties?.confidence,
//                     place_type: addr?.properties?.venue
//                 }
//                 array.push(obj)
//             }
//         }
//         return array
//     }
// }
