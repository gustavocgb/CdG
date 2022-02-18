export interface Mapper {
    entityToModel(params?: any): any
    modelToEntity(params?: any): any
}
