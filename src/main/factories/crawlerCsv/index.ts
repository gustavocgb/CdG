import { GeoCrawler } from '../../../application/useCases/geoCrawler/GeoCrawler'
// import { Geocoder } from '../../../application/rules/geocoder/geocoder'
import { GeoService } from '../../../domain/rules/geoService'
import { AddressSource, csvData } from '../../../domain/rules/addressSource'
import { FastCsv } from '../../../infra/csv/fast-csv/fast-csv'
// import { GoogleApi, HereApi, GeocodeFarmApi, TomtomApi, OpenCageApi, OpenRouteServiceApi, MapBoxApi } from '../../../infra/GeocodApi/apis'
import { AddressRepository } from "../../../application/rules/addressRepository/addressRepository";
// import { ResponseRepository } from "../../../application/rules/responseRepository/responseRepository";
import { Response } from '../../../domain/rules/response'
import { ResponseRepositoryPostegreSql } from "../../../infra/db/techs/postegreSql/useCases/responseRepository";
import path from "path";
import {HttpsGet} from "../../../infra/http/httpsNode/https-get";

export const crawlerCsv = (): any => {
    //
    // const googleApi = new GoogleApi()
    // const hereApi = new HereApi()
    // const geocodeFarmApi = new GeocodeFarmApi()
    // const openCageApi = new OpenCageApi()
    // const tomtomApi = new TomtomApi()
    // const openRouteServiceApi = new OpenRouteServiceApi()
    // const mapBoxApi = new MapBoxApi()
    //
    // const listApi = [hereApi]
    // // const listApi = [hereApi, geocodeFarmApi, openCageApi, tomtomApi, openRouteServiceApi, openStreetMapApi, mapBoxApi]
    // const listGeocoder: any = []
    //
    // for (let api of listApi) {
    //     const geocoder = new Geocoder(
    //         GeoService.createGeoService({
    //             name: api.getName(),
    //             url: api.getApiUrl(),
    //             apiKey: api.getApiKey(),
    //             maxRequestPerSecond: api.getMaxRequestPerSecond(),
    //             maxRequest: api.getMaxRequest(),
    //             isDay: api.getIsDay(),
    //         }),
    //         new HttpsGet(),
    //         api.createJasonMapper()
    //     )
    //     listGeocoder.push(geocoder)
    // }
    //
    // const data: csvData = {
    //     nameFile: 'id29-clientes-mapeado_consolidado.csv',
    //     delimiter: ';',
    //     pathCsv: path.join(__dirname, '../../../../../public/files/csv/address')
    // }
    //
    // const addressRepository = new AddressRepository(AddressSource.createAddressSource('csv', {csv: data}), new FastCsv())
    // const responseRepository = new ResponseRepository(Response.createResponse(), new ResponseRepositoryPostegreSql())
    //
    // return new GeoCrawler(listGeocoder, addressRepository, responseRepository)

}
