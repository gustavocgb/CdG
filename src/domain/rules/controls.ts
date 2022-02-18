import {ControlsConcrete} from "../entity/Controls";

export interface ControlsEntity {
    id?: number | undefined
    requests?: number | undefined
    currentAddress?: number | undefined
    geoapiId?: string | undefined
    isDay?: boolean | undefined
    date?: Date | undefined
    geocodify?: number | undefined
    totalGeocodify?: number |undefined
    geoapiKey?: string | undefined
    isGeocoding?: boolean | undefined,
    isRequests?: boolean | undefined,
    isAddress?: boolean | undefined,
    isDate?: boolean | undefined,
    errors?: number | undefined,
    initialDate?: Date | undefined,
    totalErrors?: number | undefined,
    totalRequests?: number | undefined
}

export abstract class Controls {

    abstract getId(): number
    abstract getRequests(): number
    abstract getCurrentAddress(): number
    abstract getGeoapiId(): string
    abstract getIsDay(): boolean
    abstract getDate(): Date
    abstract getGeocodify(): number
    abstract getTotalGeocodify(): number
    abstract getGeoapiKey(): string
    abstract getIsGeocoding(): boolean
    abstract getIsRequests(): boolean
    abstract getIsAddress(): boolean
    abstract getIsDate(): boolean
    abstract getErrors(): number
    abstract getInitialDate(): Date
    abstract getTotalErrors(): number
    abstract getTotalRequests(): number
    abstract getControls(): ControlsEntity

    abstract setId(id: number): void
    abstract setRequests(requests: number): void
    abstract setCurrentAddress(address_id: number): void
    abstract setGeoapiId(geoapi_id: string): void
    abstract setIsDay(isDay: boolean): void
    abstract setDate(date: Date): void
    abstract setGeocodify(geocodify: number): void
    abstract setTotalGeocodify(totalGeocodify: number): void
    abstract setGeoapiKey(apiKey: string): void
    abstract setIsGeocoding(isGeocoding: boolean): void
    abstract setIsRequests(isRequests: boolean): void
    abstract setIsAddress(isAddress: boolean): void
    abstract setIsDate(isDate: boolean): void
    abstract setErrors(errors: number): void
    abstract setInitialDate(initialDate: Date): void
    abstract setTotalErrors(totalErrors: number): void
    abstract setTotalRequests(totalRequests: number): void
    abstract setControls(controls: ControlsEntity): void

    public static createControls(): any {
        return new ControlsConcrete()
    }

}
