import {AddressSource, AddressSourceConfig} from "../../../domain/rules/addressSource";
import {Address} from "../../../domain/rules/address";

export abstract class AddressRepository {

    protected addressSource: any
    protected address: any

    constructor(source?: AddressSourceConfig) {
        this.addressSource = AddressSource.createAddressSource(source)
        this.address = Address.createAddress()
    }

    abstract readerOneAddress(current?: any): Promise<any>
    abstract readerAllAddress(): Promise<any>
    abstract createAddress(address: any): Promise<any>

    AddressSource(): AddressSource {
        return this.addressSource
    }
    Address(): Address {
        return this.address
    }
}

