import {Address, AddressEntity} from "../rules/address";

export class AddressConcrete implements Address {

    private address: string | undefined
    private id: number | undefined

    constructor() {}

    getAddress() {
        return this.address as string
    }

    getAddressData() {
        let obj: AddressEntity = {
            id: this.id,
            address: this.address
        }
        return obj
    }


    getId() {
        return this.id
    }

    setAddress(address: string) {
        this.address = address
    }

    setAddressData(address: AddressEntity) {
        this.address = address.address
        this.id = address.id
    }

    setId(id: number) {
        this.id = id
    }

}
