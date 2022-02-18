// import { FastCsv } from '../../../../../src/infra/csv/fast-csv/fast-csv'
// import path from 'path'
//
// const makeSut = (): FastCsv => {
//     return new FastCsv()
// }
//
// describe('', () => {
//     test('', async() => {
//         const sut = makeSut()
//         const pathCsv = path.join(__dirname, '../../../../../public/files/csv/address')
//         const nameCsv = 'test.csv'
//         const delimiter = ';'
//         const csv = await sut.reader(pathCsv, nameCsv, delimiter)
//         expect(csv).toEqual(expect.anything())
//     })
//
//     test('', async() => {
//         const sut = makeSut()
//         const pathCsv = path.join(__dirname, '../../../../../public/files/csv/address')
//         const nameCsv = 'test.csv'
//         const delimiter = ';'
//         jest.spyOn(sut, 'reader').mockImplementation(()=> {return Promise.reject(new Error())})
//         await expect(sut.reader(pathCsv, nameCsv, delimiter)).rejects.toThrow(new Error())
//     })
// })
