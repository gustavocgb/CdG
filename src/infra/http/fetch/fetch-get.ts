// import { HttpGet, HttpResponse, HttpGetParams } from "../../../interfaces/adpters/http/";
// import fetch from 'node-fetch';
//
// export class FetchGet implements HttpGet<any, any> {
//     async get (params: HttpGetParams<any>): Promise<HttpResponse<any>> {
//         const httpResponse = await fetch(params.url);
//         const body = await httpResponse.json()
//         return {
//             statusCode: httpResponse.status,
//             body: body,
//         }
//     }
// }
