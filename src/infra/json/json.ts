// import {ReaderAddressInterface, config, json} from "../../interfaces/adpters/db/addressRepository/readerAddress";
// import fs from "fs";
// import path from "path";
// import {AddressRepository} from "../../application/addressRepository/AddressRepository";
//
// export class Json implements AddressRepository {
//
//     async readerAll(parms: config) {
//         const {pathJson, nameFile} = parms?.json as json
//
//         let results: any[] = [];
//         const readFile = () => {
//             return new Promise((resolve, reject) => {
//                 let rawdata = fs.readFileSync(path.resolve(pathJson, `./${nameFile}`));
//
//                 let convertedData = String(rawdata)
//                     .replace(/\n/gi, ',')
//                     .slice(0, -1);
//
//                 let jsonData = JSON.parse(`[${convertedData}]`);
//                 for(let obj of jsonData){
//                     const {number, street, unit, city, district, region, postcode} = obj
//                     let _street = street?street+', ':''
//                     let _number = number?number+', ':''
//                     let _unit = unit?unit+', ':''
//                     let _district = district?district+', ':''
//                     let _city = city?city+', ':''
//                     let _region = region?region+', ':''
//                     let full_address: string = _street+_number+_unit+_district+_city+_region
//                     obj['full_address'] = full_address.slice(0, -2)
//                     results.push(obj)
//                 }
//                 resolve(results)
//             });
//         }
//         const file = await readFile()
//         return file
//     }
//
//     readerOne(parms: config, skip: number): Promise<any> {
//         throw new Error("Method not implemented.");
//     }
//
// }
//
// // const JSONparse = require('JSONStream').parse()
// // fs.createReadStream(path.resolve(pathJson, `./${nameFile}`), {encoding: 'utf8'})
// //     .pipe(JSONparse)
// //     .on('error', (error: any) => { reject(error) })
// //     .on('data', (row: any) => {
// //         const {number, street, unit, city, district, region, postcode} = row
// //         let _street = street?street+', ':''
// //         let _number = number?number+', ':''
// //         let _unit = unit?unit+', ':''
// //         let _district = district?district+', ':''
// //         let _city = city?city+', ':''
// //         let _region = region?region+', ':''
// //         let _postcode = postcode?postcode+', ':''
// //         let full_address: string = _street+_number+_unit+_district+_city+_region+_postcode
// //         row['full_address'] = full_address.slice(0, -2)
// //         results.push(row)
// //     })
// //     .on('end', () => { resolve(results) })
