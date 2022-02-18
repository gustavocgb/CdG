import * as fs from 'fs'
import * as path from 'path'
import * as fastCsv from 'fast-csv'
// import { ReaderAddressInterface, config, csv } from "../../../interfaces/adpters/db/addressRepository/readerAddress";

export class FastCsv {

    async readerAll(parms: any){
        const { pathCsv, nameFile, delimiter } = parms?.csv as any

        let results: any[] = [];
        const readFile = () => {
            return new Promise((resolve, reject) => {
                fs.createReadStream(path.resolve(pathCsv, `./${nameFile}`))
                    .pipe(fastCsv.parse({ headers: true, delimiter: delimiter }))
                    .on('error', (error) => { reject(error) })
                    .on('data', (row) => results.push(row))
                    .on('end', () => { resolve(results) })
            });
        }
        const file = await readFile()
        return file
    }

    async readerOne(parms: any, skip: number) {
        const { pathCsv, nameFile, delimiter } = parms?.csv as any
        let row: any

        const readFile = () => {
            return new Promise((resolve, reject) => {
                fs.createReadStream(path.resolve(pathCsv, `./${nameFile}`))
                    .pipe(fastCsv.parse({ headers: true, delimiter: delimiter, skipRows: skip, maxRows: 1 }))
                    .on('error', (error) => { reject(error) })
                    .on('data', (rowData) => { row = rowData })
                    .on('end', () => { resolve(row) })
            });
        }
        const file = await readFile()
        return file
    }

}
