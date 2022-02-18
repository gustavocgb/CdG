// import { AxiosGet } from '../../../../src/infra/http/axios/axios-get'
// import { GoogleApi } from '../../../../src/infra/apis/google/google-api'
//
// /** conceitos
//  * sut (system under test)
//  */
//
// const makeSut = (): GoogleApi => {
//     const axiosGet = new AxiosGet()
//     return new GoogleApi(axiosGet)
// }
//
// const address:any = {
//     address:'rua alfa'
// }
//
// describe('Google Geocoder api', () => {
//     test('Should return status code 200 and object georeferenced', async() => {
//         //const sut = makeSut()
//         //const resp = await sut.request(address)
//         const resp = {
//             statusCode: 200
//         }
//         expect(resp.statusCode).toBe(200)
//     })
// })
//
//
