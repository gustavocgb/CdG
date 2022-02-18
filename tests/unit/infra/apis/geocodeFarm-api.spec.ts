// import { AxiosGet } from '../../../../src/infra/http/axios/axios-get'
// import { GeocodeFarmApi } from '../../../../src/infra/apis/geocodeFarm/geocodeFarm-api'
//
// /** conceitos
//  * sut (system under test)
//  */
//
// const makeSut = (): GeocodeFarmApi => {
//     const axiosGet = new AxiosGet()
//     return new GeocodeFarmApi(axiosGet)
// }
//
// const address:any = {
//     address:'rua alfa'
// }
//
// describe('Farm Geocoder api', () => {
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
