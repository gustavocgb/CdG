export interface getParams {
    where?: {}
    select?: {}
    or?: boolean
}

export interface postParams {
    value?: any
}

export interface updateParams {
    where?: any
    value?: any
}

export interface deleteParams {
    id?: any
}

export interface SqlDrive {
    GetUnique(application: string, params: getParams): Promise<any>
    GetMany(application: string, params: getParams): Promise<any>
    GetFirst(application: string, params: getParams): Promise<any>
    Post(application: string, params: postParams): Promise<any>
    Update(application: string, params: updateParams): Promise<any>
    Delete(application: string, params: deleteParams): Promise<any>

}
