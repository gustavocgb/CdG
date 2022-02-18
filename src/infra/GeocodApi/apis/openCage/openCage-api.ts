// import {dataJsonMapper, JsonMapper} from "../../../../interfaces/adpters/api/JsonMapper";
// import env from "../../../dotenv";
//
// export class OpenCageApi {
//
//     private name = "OpenCage"
//     private url = "https://api.opencagedata.com/geocode/v1/geojson?q=*ADDRESS*&key=*KEY*&pretty=1"
//     private apiKey? = env.OPENCAGE_API_KEY
//
//     private maxRequestPerSecond = 1
//     private maxRequest = 2500
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
//     createJasonMapper(): OpenCageApiMapper {
//         return new OpenCageApiMapper()
//     }
//
// }
//
// class OpenCageApiMapper implements JsonMapper {
//
//     getFormatedAddress(address: string) {
//         return address
//     }
//
//     mapper(data: any): any {
//
//         let array: any[] = []
//
//         if (data.features) {
//             for (let addr of data.features) {
//                 let obj:dataJsonMapper = {
//                     latitude: addr.geometry.coordinates?addr.geometry.coordinates[1]:undefined,
//                     longitude: addr.geometry.coordinates?addr.geometry.coordinates[0]:undefined,
//                     full_address: addr?.properties?.formatted,
//                     latNorthBBox: addr?.properties?.bounds?.northeast?.lat,
//                     longEastBBox: addr?.properties?.bounds?.northeast?.lng,
//                     latSouthBBox: addr?.properties?.bounds?.southwest?.lat,
//                     longWestBBox: addr?.properties?.bounds?.southwest?.lng,
//                     city: addr?.properties?.components?.city,
//                     district: addr?.properties?.components?.city_district,
//                     country: addr?.properties?.components?.county,
//                     place_type: addr?.properties?.components?.road_type,
//                     public_place: addr?.properties?.components?.road,
//                     state: addr?.properties?.components?.state,
//                     zip_code: addr?.properties?.components?.postcode,
//                 }
//                 array.push(obj)
//             }
//         }
//         return array
//     }
// }
