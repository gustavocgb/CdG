import {ResponseConcrete} from "../entity/Response";

export interface ResponseEntity {
    full_address?: string,
    public_place?: string,
    number?: string,
    district?: string,
    zip_code?: string,
    city?: string,
    state?: string,
    country?: string,
    accuracy?: number,
    latitude?: number,
    longitude?: number,
    place_type?: string,
    longWestBBox?: number,
    latNorthBBox?: number,
    longEastBBox?: number,
    latSouthBBox?: number,
}

export abstract class Response {

    abstract getFull_address(): string
    abstract getPublic_place(): string
    abstract getNumber(): string
    abstract getDistrict(): string
    abstract getZip_code(): string
    abstract getCity(): string
    abstract getState(): string
    abstract getCountry(): string
    abstract getAccuracy(): number
    abstract getLatitude(): number
    abstract getLongitude(): number
    abstract getPlace_type(): string
    abstract getLongWestBBox(): number
    abstract getLatNorthBBox(): number
    abstract getLongEastBBox(): number
    abstract getLatSouthBBox(): number

    abstract setFull_address(data: string): void
    abstract setPublic_place(data: string): void
    abstract setNumber(data: string): void
    abstract setDistrict(data: string): void
    abstract setZip_code(data: string): void
    abstract setCity(data: string): void
    abstract setState(data: string): void
    abstract setCountry(data: string): void
    abstract setAccuracy(data: number): void
    abstract setLatitude(data: number): void
    abstract setLongitude(data: number): void
    abstract setPlace_type(data: string): void
    abstract setLongWestBBox(data: number): void
    abstract setLatNorthBBox(data: number): void
    abstract setLongEastBBox(data: number): void
    abstract setLatSouthBBox(data: number): void

    public static createResponse(): ResponseConcrete {
        return new ResponseConcrete()
    }

}
