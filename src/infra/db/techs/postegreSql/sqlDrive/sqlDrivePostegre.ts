import {getParams, SqlDrive} from '../../../../../interfaces/adpters/db/sqlDrive'
import { dataBase } from "../config/database";
import {Mapper} from "../../../../mapper/mapper";
import {GeoapiModel} from "../../../models/geoapi";

export class SqlDrivePostegre implements SqlDrive {
    GetMany(application: string, params: getParams): Promise<any> {
        throw new Error('Method not implemented.');
    }

    Delete(data?: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    async GetFirst(application:string, params:getParams): Promise<any> {

        console.log(params)

        // console.log('sqlDrive')
        // console.log(params)

        let select: string[] = []
        let where: string[] = []
        let values: any[] = []

        Object.entries(params).forEach(objParams => {
            // select
            // if (objParams[0] === 'select'){
            //     objParams[1].forEach((objValue:any) => {
            //         select.push(objValue)
            //     })
            // }
            // where
            if (objParams[0] === 'where'){


                objParams[1].forEach((objValue:any, index:any) => {
                    where.push(objValue[0]+' '+objValue[1]+' '+'$'+(index+1))
                    values.push(objValue[2])
                })
            }
        })

        const text = `SELECT ${select} FROM public."Controls" ${where.length>0?'where '+where:''};`;
        console.log(text)
        // console.log(values)
        // const query = {
        //     text: 'SELECT * FROM public."Controls" WHERE geoapi_id = $1 AND "isDay" = $2;',
        //     values: values
        // }
        //
        // const client = await dataBase.connect()
        // const response = await client.query(query)
        // await dataBase.disconnect(client)
        // console.log(response.rows)

        //
        //
        // const dataModel = mapperGeoapi.entityToModel(data)
        // const {flag} = dataModel
        // flag = get {
        //     const query = {
        //         text: 'SELECT * FROM public."Geoapi" JOIN public."Controls" ON (public."Geoapi".geoapi_id = public."Controls".geoapi_id) WHERE public."Geoapi".geoapi_id = $1',
        //         values: [geoapi_id]
        //     }
        // }
        // const query = {
        //     text: 'UPDATE public."Controls" SET date = $1 WHERE id = $2',
        //     values: [date, id]
        // }
        return Promise.resolve(undefined);
    }

    Post(data?: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    Update(data?: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    GetUnique(application: string, params: getParams): Promise<any> {
        throw new Error('Method not implemented.');
    }

}

let mapperGeoapi: Mapper = {
    modelToEntity(model: any) {
        throw 'method not implemented'
    },
    entityToModel(entity: any) {
        // console.log(entity)
        let model: GeoapiModel = {
            geoapi_id: entity?.geoapiId?.toString()
        }
        return model
    }
}
