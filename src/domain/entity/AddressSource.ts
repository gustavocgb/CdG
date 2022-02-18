import {AddressSource, AddressSourceConfig} from "../rules/addressSource";

export class AddressSourceConcrete implements AddressSource {

    private name: string | undefined
    private source: any | undefined

    constructor(source?: AddressSourceConfig) {
        this.name = source?.name
        this.source = source
    }

    getName() {
        return this.name as string
    }

    getSource(){
        return this.source as any
    }


}
