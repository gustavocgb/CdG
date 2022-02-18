import { AddressConcrete } from "../entity/Address";

export interface AddressEntity {
    id?: number | undefined
    address: string | undefined
}

export abstract class Address {

    abstract getAddress(): string
    abstract getId(): any
    abstract getAddressData(): AddressEntity
    abstract setAddress(address: string): void
    abstract setId(id: number): void
    abstract setAddressData(address: AddressEntity): void


    public static createAddress(): any {
        return new AddressConcrete()
    }

}
