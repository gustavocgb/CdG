import { GeoServiceConcrete } from "../entity/GeoService";

export type GeoServiceEntity = {
    name: string | undefined
    url: string | undefined
    apiKey?: string | undefined
    maxRequestPerSecond?: number | undefined
    maxRequest: number | undefined
    isDay?: boolean | undefined
    isInitialHours00?: boolean | undefined
}

export abstract class GeoService {

    abstract getName(): string
    abstract getApiUrl(address: string): String
    abstract getApiKey(): string
    abstract getMaxRequestPerSecond(): number
    abstract getMaxRequest(): number
    abstract getIsDay(): boolean
    abstract getIsInitialHours00(): boolean
    abstract setName(name: string): void
    abstract setApiUrl(url: string): void
    abstract setApiKey(apiKey: string): void
    abstract setMaxRequestPerSecond(second: number): void
    abstract setMaxRequest(request: number): void
    abstract setIsDay(isDay: boolean): void
    abstract setIsInitialHours00(isInitialHours: boolean): void

    public static createGeoService(data?: GeoServiceEntity): GeoServiceConcrete {
        return new GeoServiceConcrete(data)
    }

}
