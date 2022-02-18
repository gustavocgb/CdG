import { HttpGet, HttpResponse, HttpGetParams } from "../../../interfaces/gateway/http/";
import * as https from 'https'

export class HttpsGet implements HttpGet<any, any> {
    async get (params: HttpGetParams<any>): Promise<HttpResponse<any>> {
        const get = () => {
            return new Promise((resolve, reject) => {
                let body = ''
                let options = require('url').parse(encodeURI(params.url))
                options.headers = {
                    'User-Agent': 'javascript'
                }
                https.get(options, (res) => {
                    res.on('data', (data: any) => {
                        body += data
                    });
                    res.on('end', () => {
                        resolve({
                            statusCode: res?.statusCode,
                            body: body
                        })
                    })
                    res.on('error', (error: any) => { reject(new Error(error)) })
                })
            });
        }
        const response = await get()
        return response as HttpResponse<any>
    }
}
