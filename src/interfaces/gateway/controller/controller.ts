
export interface Controller {
    handle(req: any): Promise<any>
}
