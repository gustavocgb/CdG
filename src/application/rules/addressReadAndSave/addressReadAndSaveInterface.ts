import {AddressRepository} from "../addressRepository/addressRepository";

export abstract class AddressReadAndSaveInterface {

    readonly addressRepository: any

    constructor(addressRepository: AddressRepository) {
        this.addressRepository = addressRepository
    }

    // abstract

}
