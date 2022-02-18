import {ControlsRepository, get, update} from "../../../../../application/rules/controlsRepository/controlsRepository";
import {getParams, SqlDrive, updateParams} from "../../sqlDrive";

export class SqlControlsRepository extends ControlsRepository {

    readonly sqlDrive: SqlDrive

    constructor(sqlDrive: SqlDrive) {
        super();
        this.sqlDrive = sqlDrive
    }

    async getControlsByGeoapiId(data: get) {
        let params: getParams
        params = {
            select: data?.select,
            where: data?.where
        }
        return await this.sqlDrive.GetFirst('controlsRepository', params)
    }

    async getControlsAllByGeoapiId(data: get): Promise<any> {
        let params: getParams
        params = {
            select: data?.select,
            where: data?.where
        }
        return await this.sqlDrive.GetMany('controlsRepository', params)
    }

    async update(data: update): Promise<any> {
        let params: updateParams
        params = {
            where: data?.id,
            value: data?.value
        }
        return await this.sqlDrive.Update('controlsRepository', params)
    }
}
