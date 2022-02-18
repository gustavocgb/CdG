import { AddressSourceConcrete } from "../entity/AddressSource";

export type csvData = {
    nameFile: string
    path: string
    delimiter: string
}

export type jsonData = {
    nameFile: string
    path: string
}

export type sqlData = {
    nameDB: string
}

export type urlData = {
    url: string
}

export type AddressSourceConfig = {
    name: string
    json?: jsonData
    csv?: csvData
    sql?: sqlData
    url?: urlData
}

export abstract class AddressSource {

    abstract getName(): string
    abstract getSource(): any

    public static createAddressSource(source?: AddressSourceConfig): any {
        return new AddressSourceConcrete(source)
    }

}
