
export interface JsonMapper {
    responseJsonToEntity(json?: any): Promise<any>
}
