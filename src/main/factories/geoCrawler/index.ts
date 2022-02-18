import { GeoCrawler } from '../../../application/useCases/geoCrawler/GeoCrawler'
import { HttpsGet } from '../../../infra/http/httpsNode/https-get'
import { GoogleApi, HereApi, TomtomApi, OpenRouteServiceApi, MapBoxApi, NominatimApi } from '../../../infra/GeocodApi/apis'
import { ResponseRepositoryPostegreSql } from "../../../infra/db/techs/postegreSql/useCases/responseRepository";
import { AddressRepositoryPostegreSql } from "../../../infra/db/techs/postegreSql/useCases/addressRepository";
import { SqlControlsRepository } from "../../../interfaces/adpters/db/useCases/controlsRepository/sqlControlsRepository"
import { GeoCrawlerController } from "../../../interfaces/controllers/aplications/geoCrawler/GeoCrawlerController";
import { HttpsGetAdpter } from "../../../interfaces/adpters/http/http-getAdpter";
import { SqlDrivePrisma } from "../../../infra/db/techs/prisma/sqlDrive/sqlDrivePrisma";

export const GeoCrawlerFactory = (): any => {

    const listApi = [GoogleApi, HereApi, TomtomApi, OpenRouteServiceApi, MapBoxApi, NominatimApi]
    const listGeoCrawlers: any = []

    for (let api of listApi) {
        const geoCrawler = new GeoCrawler(new api(new HttpsGetAdpter(new HttpsGet())), new AddressRepositoryPostegreSql(), new ResponseRepositoryPostegreSql(), new SqlControlsRepository(new SqlDrivePrisma()))
        listGeoCrawlers.push(geoCrawler)
    }

    return new GeoCrawlerController(listGeoCrawlers)
}
