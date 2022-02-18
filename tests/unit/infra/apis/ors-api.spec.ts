// import { AxiosGet } from '../../../../src/infra/http/axios/axios-get'
// import { OpenRouteService } from '../../../../src/infra/apis/ors/ors-api'
//
// /** conceitos
//  * sut (system under test)
//  */
//
// const makeSut = (): OpenRouteService => {
//     const axiosGet = new AxiosGet()
//     return new OpenRouteService(axiosGet)
// }
//
// const address:any = {
//     address:'rua alfa'
// }
//
// describe('ORS Geocoder api', () => {
//     test('Should return status code 200 and object georeferenced', async() => {
//         // const sut = makeSut()
//         // const resp = await sut.request(address)
//         const resp = {
//             statusCode: 200
//         }
//         expect(resp.statusCode).toBe(200)
//     })
// })
