import {Controls, ControlsEntity} from "../rules/controls";

export class ControlsConcrete implements Controls {

    private id?: number | undefined
    private requests?: number | undefined
    private currentAddress?: number | undefined
    private geoapiId?: string | undefined
    private isDay?: boolean | undefined
    private date?: Date | undefined
    private geocodify?: number | undefined
    private totalGeocodify?: number |undefined
    private geoapiKey?: string | undefined
    private isGeocoding?: boolean | undefined
    private isRequests?: boolean | undefined
    private isAddress?: boolean | undefined
    private isDate?: boolean | undefined
    private errors?: number | undefined
    private initialDate?: Date | undefined
    private totalErrors?: number | undefined
    private totalRequests?: number | undefined

    constructor() {}

    getControls(): ControlsEntity {
        let obj: ControlsEntity = {
            id: this.id,
            currentAddress: this.currentAddress,
            geoapiId: this.geoapiId,
            requests: this.requests,
            geocodify: this.geocodify,
            date: this.date,
            isDate: this.isDate,
            geoapiKey: this.geoapiKey,
            isAddress: this.isAddress,
            isDay: this.isDay,
            isGeocoding: this.isGeocoding,
            isRequests: this.isRequests,
            totalGeocodify: this.totalGeocodify,
            totalErrors: this.totalErrors,
            errors: this.errors,
            initialDate: this.initialDate,
            totalRequests: this.totalRequests
        }
        return obj
    }

    setControls(controls: ControlsEntity): void {
        this.id = controls?.id
        this.currentAddress = controls?.currentAddress
        this.geoapiId = controls?.geoapiId
        this.requests = controls?.requests
        this.geocodify = controls?.geocodify
        this.date = controls?.date
        this.isDate = controls?.isDate
        this.geoapiKey = controls?.geoapiKey
        this.isAddress = controls?.isAddress
        this.isDay = controls?.isDay
        this.isGeocoding = controls?.isGeocoding
        this.isRequests = controls?.isRequests
        this.totalGeocodify = controls?.totalGeocodify
        this.totalErrors = controls?.totalErrors
        this.errors = controls?.errors
        this.initialDate = controls?.initialDate
        this.totalRequests = controls?.totalRequests
    }

    getCurrentAddress() {
        return this.currentAddress as number
    }
    getGeoapiId() {
        return this.geoapiId as string
    }
    getId() {
        return this.id as number
    }
    getRequests() {
        return this.requests as number
    }
    getIsDay(): boolean {
        return this.isDay as boolean
    }
    getDate(): Date {
        return this.date as Date
    }
    getGeocodify(): number {
        return this.geocodify as number
    }
    getTotalGeocodify(): number {
        return this.totalGeocodify as number
    }
    getGeoapiKey(): string {
        return this.geoapiKey as string
    }
    getIsGeocoding(): boolean {
        return this.isGeocoding as boolean
    }
    getIsRequests(): boolean {
        return this.isRequests as boolean
    }
    getIsAddress(): boolean {
        return this.isAddress as boolean
    }
    getIsDate(): boolean {
        return this.isDate as boolean
    }
    getErrors(): number {
        return this.errors as number
    }
    getInitialDate(): Date {
        return this.initialDate as Date
    }
    getTotalErrors(): number {
        return this.totalErrors as number
    }
    getTotalRequests(): number {
        return this.totalRequests as number
    }

    setIsDay(isDay: boolean) {
        this.isDay = isDay
    }
    setDate(date: Date) {
        this.date = date
    }
    setCurrentAddress(addressId: number) {
        this.currentAddress = addressId
    }
    setGeoapiId(geoapiId: string) {
        this.geoapiId = geoapiId
    }
    setId(id: number) {
        this.id = id
    }
    setRequests(requests: number) {
        this.requests = requests
    }
    setGeocodify(geocodify: number) {
        this.geocodify = geocodify
    }
    setTotalGeocodify(totalGeocodify: number) {
        this.totalGeocodify = totalGeocodify
    }
    setGeoapiKey(apiKey: string) {
        this.geoapiKey = apiKey
    }
    setIsGeocoding(isGeocoding: boolean) {
        this.isGeocoding = isGeocoding
    }
    setIsRequests(isRequests: boolean) {
        this.isRequests = isRequests
    }
    setIsAddress(isAddress: boolean) {
        this.isAddress = isAddress
    }
    setIsDate(isDate: boolean) {
        this.isDate = isDate
    }
    setErrors(errors: number) {
        this.errors = errors
    }
    setInitialDate(initialDate: Date) {
        this.initialDate = initialDate
    }
    setTotalErrors(totalErrors: number) {
        this.totalErrors = totalErrors
    }
    setTotalRequests(totalRequests: number) {
        this.totalRequests = totalRequests
    }
}
