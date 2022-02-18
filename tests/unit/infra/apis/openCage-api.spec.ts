// import { AxiosGet } from '../../../../src/infra/http/axios/axios-get'
// import { OpenCageApi } from '../../../../src/infra/apis/openCage/openCage-api'
//
// /** conceitos
//  * sut (system under test)
//  */
//
// const makeSut = (): OpenCageApi => {
//     const axiosGet = new AxiosGet()
//     return new OpenCageApi(axiosGet)
// }
//
// const address:any = {
//     address:'rua alfa'
// }
//
// describe('OpenCage Geocoder api', () => {
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
