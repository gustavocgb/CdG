export interface ResponseModel {
    geolocation_id?: number | undefined
    geoapi_id?: number
    request_id?: number
    full_address?: string | undefined
    public_place?: string | undefined
    number?: string | undefined
    district?: string | undefined
    zip_code?: string | undefined
    city?: string | undefined
    state?: string | undefined
    country?: string | undefined
    accuracy?: number | undefined
    latitude?: number | undefined
    longitude?: number | undefined
    place_type?: string | undefined
    longWestBBox?: number | undefined
    latNorthBBox?: number | undefined
    longEastBBox?: number | undefined
    latSouthBBox?: number | undefined
}
