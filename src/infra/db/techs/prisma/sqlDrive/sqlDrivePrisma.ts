import {SqlDrive, getParams, updateParams} from "../../../../../interfaces/adpters/db/sqlDrive";
import {PrismaClient} from "@prisma/client";
import {mapperControls} from "../../../mapper/mapperControls";

export class SqlDrivePrisma implements SqlDrive {

    readonly prisma: PrismaClient = new PrismaClient()

    async GetFirst(application: string, params: getParams): Promise<any> {
        const where = mapperControls.entityToModel(params.where)
        let query: any
        let prisma: any

        switch (application) {
            case 'controlsRepository': prisma = this.prisma.controls
        }

        query = await prisma.findFirst({
            where: where,
            select: params?.select,
        })

        await this.prisma.$disconnect()
        return mapperControls.modelToEntity(query)
    }

    async GetMany(application: string, params: getParams): Promise<any> {
        const where = mapperControls.entityToModel(params.where)
        let query: any
        let prisma: any
        let array:any = []

        switch (application) {
            case 'controlsRepository': prisma = this.prisma.controls
        }

        query = await prisma.findMany({
            where: where,
            select: params?.select,
        })

        await this.prisma.$disconnect()
        for (let obj of query) {
            array.push(mapperControls.modelToEntity(obj))
        }
        return array
    }

    GetUnique(application: string, params: getParams): Promise<any> {
        return Promise.resolve(undefined);
    }

    Post(application: string, params: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    async Update(application: string, params: updateParams): Promise<any> {
        const where = mapperControls.entityToModel(params.where)
        const value = mapperControls.entityToModel(params.value)
        let query: any
        let prisma: any

        switch (application) {
            case 'controlsRepository': prisma = this.prisma.controls
        }

        query = await this.prisma.controls.update({
            where: where,
            data: value
        })

        await this.prisma.$disconnect()
        return query
    }

    Delete(application: string, params: any): Promise<any> {
        return Promise.resolve(undefined);
    }
}
