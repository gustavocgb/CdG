import {HttpGet, HttpGetParams, HttpResponse} from "../../gateway/http";

export class HttpsGetAdpter implements HttpGet<any, any> {

    readonly httpGet: HttpGet<any, any>

    constructor(httpGet: HttpGet<any, any>) {
        this.httpGet = httpGet
    }

    async get(params: HttpGetParams<any>): Promise<HttpResponse<any>> {
        return new Promise(async (resolve, reject) => {
            try {
                const resp = await this.httpGet.get(params)
                if (resp.statusCode === 200) {
                    resolve({
                        statusCode: resp.statusCode,
                        body: JSON.parse(resp.body)
                    })
                } else {
                    reject(new Error(`${resp.statusCode}: ${resp.body}`))
                }
            } catch (e: any) {
                reject(new Error(e))
            }
        })
    }
}
