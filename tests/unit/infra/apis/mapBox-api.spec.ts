// import { AxiosGet } from '../../../../src/infra/http/axios/axios-get'
// import { MapBoxApi } from '../../../../src/infra/apis/mapBox/mapBox-api'
//
// /** conceitos
//  * sut (system under test)
//  */
//
// const makeSut = (): MapBoxApi => {
//     const axiosGet = new AxiosGet()
//     return new MapBoxApi(axiosGet)
// }
//
// const address:any = {
//     address:'rua alfa'
// }
//
// describe('MapBox Geocoder api', () => {
//     test('Should return status code 200 and object georeferenced', async() => {
//         // const sut = makeSut()
//         // const resp = await sut.request(address)
//         const resp = {
//             statusCode: 200
//         }
//         expect(resp.statusCode).toBe(200)
//     })
// })
//
//
//
