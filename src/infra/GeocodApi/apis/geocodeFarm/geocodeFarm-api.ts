// import {dataJsonMapper, JsonMapper} from "../../../../interfaces/adpters/api/JsonMapper";
//
// export class GeocodeFarmApi {
//
//     public name = "Farm"
//     public url = "https://www.geocode.farm/v3/json/forward/?addr=*ADDRESS*&country=br"
//     public apiKey? = undefined
//
//     private maxRequestPerSecond = 4
//     private maxRequest = 250
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
//     createJasonMapper(): GeocodeFarmMapper {
//         return new GeocodeFarmMapper()
//     }
//
// }
//
// class GeocodeFarmMapper implements JsonMapper {
//
//     getFormatedAddress(address: string) {
//         return address
//     }
//
//     mapper(data: any): any {
//
//         let array: any[] = []
//
//         if (data.geocoding_results.RESULTS) {
//             for (let addr of data.geocoding_results.RESULTS) {
//                 let obj:dataJsonMapper = {
//                     full_address: addr?.formatted_address,
//                     latitude: addr?.COORDINATES?.latitude,
//                     longitude: addr?.COORDINATES?.longitude,
//                     latNorthBBox: addr?.BOUNDARIES?.northeast_latitude,
//                     longEastBBox: addr?.BOUNDARIES?.northeast_longitude,
//                     latSouthBBox: addr?.BOUNDARIES?.southwest_latitude,
//                     longWestBBox: addr?.BOUNDARIES?.southwest_longitude,
//                     public_place: addr?.ADDRESS?.street_name,
//                     number: addr?.ADDRESS?.street_number,
//                     country: addr?.ADDRESS?.country,
//                     zip_code: addr?.ADDRESS?.postal_code,
//                     city: addr?.ADDRESS?.locality,
//                     district: addr?.ADDRESS?.neighborhood,
//                     state: addr?.ADDRESS?.admin_1
//                 }
//                 array.push(obj)
//             }
//         }
//         return array
//     }
// }
