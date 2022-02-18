import {HttpResponse} from "./http-response";

export type HttpGetParams<T> = {
    url: string
    config?: T
}

export interface HttpGet<T, R> {
    get (params: HttpGetParams<T>): Promise<HttpResponse<R>>
}
