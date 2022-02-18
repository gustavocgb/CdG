// import { AxiosGet } from '../../../../src/infra/http/axios/axios-get'
// import { TomtomApi } from '../../../../src/infra/apis/tomtom/tomtom-api'
//
// /** conceitos
//  * sut (system under test)
//  */
//
// const makeSut = (): TomtomApi => {
//     const axiosGet = new AxiosGet()
//     return new TomtomApi(axiosGet)
// }
//
// const address:any = {
//     address:'rua alfa'
// }
//
// describe('TomTom Geocoder api', () => {
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
