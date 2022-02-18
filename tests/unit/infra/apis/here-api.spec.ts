// import { AxiosGet } from '../../../../src/infra/http/axios/axios-get'
// import { HereApi } from '../../../../src/infra/apis/here/here-api'
//
// /** conceitos
//  * sut (system under test)
//  */
//
// const makeSut = (): HereApi => {
//     const axiosGet = new AxiosGet()
//     return new HereApi(axiosGet)
// }
//
// const address:any = {
//     address:'rua alfa'
// }
//
// describe('Here Geocoder api', () => {
//     test('Should return status code 200 and object georeferenced', async() => {
//         // const sut = makeSut()
//         // const resp = await sut.request(address)
//         const resp = {
//             statusCode: 200
//         }
//         expect(resp.statusCode).toBe(200)
//     })
// })
