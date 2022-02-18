import {Response} from "../rules/response";

export class ResponseConcrete implements Response {

    private full_address: string | undefined
    private public_place: string | undefined
    private number: string | undefined
    private district: string | undefined
    private zip_code: string | undefined
    private city: string | undefined
    private state: string | undefined
    private country: string | undefined
    private accuracy: number | undefined
    private latitude: number | undefined
    private longitude: number | undefined
    private place_type: string | undefined
    private longWestBBox: number | undefined
    private latNorthBBox: number | undefined
    private longEastBBox: number | undefined
    private latSouthBBox: number | undefined

    constructor() {}

    getFull_address() {
        return this.full_address as string
    }
    getPublic_place() {
        return this.public_place as string
    }
    getNumber(){
        return this.number as string
    }
    getDistrict(){
        return this.district as string
    }
    getZip_code(){
        return this.zip_code as string
    }
    getCity(){
        return this.city as string
    }
    getState(){
        return this.state as string
    }
    getCountry(){
        return this.country as string
    }
    getAccuracy(){
        return this.accuracy as number
    }
    getLatitude(){
        return this.latitude as number
    }
    getLongitude(){
        return this.longitude as number
    }
    getPlace_type(){
        return this.place_type as string
    }
    getLongWestBBox(){
        return this.longWestBBox as number
    }
    getLatNorthBBox(){
        return this.latNorthBBox as number
    }
    getLongEastBBox(){
        return this.longEastBBox as number
    }
    getLatSouthBBox(){
        return this.latSouthBBox as number
    }

    setFull_address(data: string) {
        this.full_address = data
    }
    setPublic_place(data: string) {
        this.public_place = data
    }
    setNumber(data: string) {
        this.number = data
    }
    setDistrict(data: string) {
        this.district = data
    }
    setZip_code(data: string) {
        this.zip_code = data
    }
    setCity(data: string) {
        this.city = data
    }
    setState(data: string) {
        this.state = data
    }
    setCountry(data: string) {
        this.country = data
    }
    setAccuracy(data: number) {
        this.accuracy = data
    }
    setLatitude(data: number) {
        this.latitude = data
    }
    setLongitude(data: number) {
        this.longitude = data
    }
    setPlace_type(data: string) {
        this.place_type = data
    }
    setLongWestBBox(data: number) {
        this.longWestBBox = data
    }
    setLatNorthBBox(data: number) {
        this.latNorthBBox = data
    }
    setLongEastBBox(data: number) {
        this.longEastBBox = data
    }
    setLatSouthBBox(data: number) {
        this.latSouthBBox = data
    }

}
