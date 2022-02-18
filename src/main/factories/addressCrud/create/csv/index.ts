import { AddressSource, csvData } from '../../../../../domain/rules/addressSource'
import { FastCsv } from '../../../../../infra/csv/fast-csv/fast-csv'
// import { ReaderAddress } from "../../../../../../application/addressRepository/ReaderAddress";
// import {AddressRepositoryPostegreSql} from "../../../../../infra/db/postegreSql/useCases/addressRepository";
// import { CreateAddress } from "../../../../../../application/addressRepository/CreateAddress";
import path from "path";

export const addressCreateCsv = (): any => {
    //
    // const data: csvData = {
    //     nameFile: 'id29-clientes-mapeado_consolidado.csv',
    //     delimiter: ';',
    //     pathCsv: path.join(path.resolve(), 'public/files/csv/address')
    // }
    //
    // const readerRepository = new ReaderAddress(AddressSource.createAddressSource('csv', {csv: data}), new FastCsv())
    // const addresRepositorySql = new AddressRepositoryPostegreSql()
    //
    // return new CreateAddress(addressRepository, addresRepositorySql)

}
