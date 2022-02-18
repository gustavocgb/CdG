import {AddressRepository} from "../../../../../application/rules/addressRepository/addressRepository";
import {dataBase} from "../config/database";
import {Mapper} from "../../../../mapper/mapper";
import {AddressEntity} from "../../../../../domain/rules/address";

export class AddressRepositoryPostegreSql extends AddressRepository {

    constructor() {
        super({
            name: 'sql',
            sql:{
                nameDB:'postegreSql'
            }
        });
    }

    async readerOneAddress(current?: any): Promise<any> {
        const client = await dataBase.connect()
        const query = {
            text: `SELECT * FROM public."Request" WHERE request_id > $1 ORDER BY request_id LIMIT 1`,
            values: [current]
        }
        const response = await client.query(query)
        await dataBase.disconnect(client)
        let entity = mapperRequest.modelToEntity(response.rows[0])
        return entity
    }

    readerAllAddress(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    createAddress(address?: any): Promise<any> {
        // entityToModel
        // const {full_address, public_place, district, city, state, zip_code, number, unit} = data
        // const query = {
        //     text: 'INSERT INTO public."Request"(full_address, public_place, district, city, state, zip_code, "number", unit) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
        //     values: [full_address, public_place, district, city, state, zip_code, number, unit]
        // }
        // const response = await this.sqlDrive.executeQuery(query)
        // return response
        throw new Error("Method not implemented.");
    }

}

let mapperRequest: Mapper = {
    modelToEntity(model: any) {
       let entity: AddressEntity = {
           id: model.request_id?parseInt(model.request_id):undefined,
           address: model?.full_address?.toString()
       }
       return entity
    },
    entityToModel(params: any) {
        throw 'method not implemented'
    }
}
