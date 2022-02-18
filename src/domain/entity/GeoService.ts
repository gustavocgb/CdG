import { GeoService, GeoServiceEntity } from '../rules/geoService'

export class GeoServiceConcrete implements GeoService {

    private name: string | undefined
    private url: string | undefined
    private apiKey: string | undefined
    private maxRequestPerSecond: number | undefined
    private maxRequest: number | undefined
    private isDay: boolean | undefined
    private isInitialHours00?: boolean | undefined

    constructor(data?: GeoServiceEntity) {
        this.name = data?.name
        this.url = data?.url
        this.apiKey = data?.apiKey
        this.maxRequestPerSecond = data?.maxRequestPerSecond
        this.maxRequest = data?.maxRequest
        this.isDay = data?.isDay
        this.isInitialHours00 = data?.isInitialHours00
    }

    getName() {
        return this.name as string
    }

    getApiUrl() {
        return this.url as string
    }

    getApiKey() {
        return this.apiKey as string
    }

    getMaxRequestPerSecond() {
        return this.maxRequestPerSecond as number
    }

    getMaxRequest() {
        return this.maxRequest as number
    }

    getIsDay() {
        return this.isDay as boolean
    }

    getIsInitialHours00() {
        return this.isInitialHours00 as boolean
    }

    setName(name:string) {
        this.name = name
    }

    setApiUrl(url:string) {
        this.url = url
    }

    setApiKey(apiKey:string) {
        return this.apiKey = apiKey
    }

    setMaxRequestPerSecond(second: number) {
        this.maxRequestPerSecond = second
    }

    setMaxRequest(request: number) {
        this.maxRequest = request
    }

    setIsDay(isDay: boolean) {
        this.isDay = isDay
    }

    setIsInitialHours00(isInitialHours: boolean) {
        this.isInitialHours00 = isInitialHours
    }

}
