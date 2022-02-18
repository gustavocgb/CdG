// import { AxiosGet } from '../../../../src/infra/http/axios/axios-get'
// import { OpenStreetMapApi } from '../../../../src/infra/apis/osm/osm-api'
//
// /** conceitos
//  * sut (system under test)
//  */
//
// const makeSut = (): OpenStreetMapApi => {
//     const axiosGet = new AxiosGet()
//     return new OpenStreetMapApi(axiosGet)
// }
//
// const address:any = {
//     address:'rua alfa'
// }
//
// describe('OSM Geocoder api', () => {
//     test('Should return status code 200 and object georeferenced', async() => {
//         // const sut = makeSut()
//         // const resp = await sut.request(address)
//         const resp = {
//             statusCode: 200
//         }
//         expect(resp.statusCode).toBe(200)
//     })
// })
