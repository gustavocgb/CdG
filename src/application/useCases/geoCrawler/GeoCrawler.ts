import {GeoCrawlerInterface} from "../../rules/geoCrawler/geoCrawler";
import {AddressRepository} from "../../rules/addressRepository/addressRepository";
import {ResponseRepository} from "../../rules/responseRepository/responseRepository";
import {Geocoder} from "../../rules/geocoder/geocoder";
import {ControlsRepository, get, update} from "../../rules/controlsRepository/controlsRepository";

interface saveResponseGeoapi {
    geoapiId: any
    currentDate: Date
    error?: string | null
    addressId: number
    generatedResponse: boolean
}

export class GeoCrawler implements GeoCrawlerInterface {

    readonly geocoder: Geocoder
    readonly addressRepository: AddressRepository
    readonly responseRepository: ResponseRepository
    readonly controlsRepository: ControlsRepository

    constructor(geocoder: Geocoder, addressRepository: AddressRepository, responseRepository: ResponseRepository, controlsRepository: ControlsRepository) {
        this.geocoder = geocoder
        this.addressRepository = addressRepository
        this.responseRepository = responseRepository
        this.controlsRepository = controlsRepository
    }

    async geocodify() {
        // --------------------- begin --------------------
        // flags
        let isFirstGetControls = true

        // objects
        let dataUpdateRequests: update
        let dataUpdateFlags: update
        let dataGetControls: get = {where:{geoapiId: this.geocoder.GeoService().getName()}}
        let dataSaveResponseGeoapi: saveResponseGeoapi

        // variables
        let searchBody = undefined
        let search = undefined
        let errorMessage = undefined
        let logDate = undefined

        // update flags
        dataUpdateFlags = {
            id: {id: this.controlsRepository.Controls().getId()},
            value: {
                isGeocoding: true,
                isAddress: true,
                isDate: true,
                isRequests: true
            }
        }
        await this.controlsRepository.update(dataUpdateFlags)

        try {

            for (let i=this.controlsRepository.Controls().getRequests(); i<=this.geocoder.GeoService().getMaxRequest(); i++) {

                // start algorithm
                this.controlsRepository.Controls().setIsGeocoding(true)

                // if not first request, get Controls
                if (!isFirstGetControls) {
                    this.controlsRepository.Controls().setControls(await this.controlsRepository.getControlsByGeoapiId(dataGetControls))
                    // take three hours, because timezone
                    this.controlsRepository.Controls().getDate().setHours(this.controlsRepository.Controls().getDate().getHours() - 3)
                }

                // create a new Date for verify
                let currentDate = new Date()
                // take three hours, because timezone
                currentDate.setHours(currentDate.getHours() - 3)
                // verify date
                if (currentDate < this.controlsRepository.Controls().getDate() ) this.controlsRepository.Controls().setIsDate(true); else this.controlsRepository.Controls().setIsDate(false)

                // verify requests
                if (this.controlsRepository.Controls().getRequests() < this.geocoder.GeoService().getMaxRequest()) {
                    this.controlsRepository.Controls().setIsRequests(true)
                } else {
                    this.controlsRepository.Controls().setIsRequests(false)
                }

                // get addresss
                this.addressRepository.Address().setAddressData(await this.addressRepository.readerOneAddress(this.controlsRepository.Controls().getCurrentAddress()))
                if (this.addressRepository.Address().getAddress()) this.controlsRepository.Controls().setIsAddress(true); else  this.controlsRepository.Controls().setIsAddress(false)

                // verify general
                if (this.controlsRepository.Controls().getIsRequests() && this.controlsRepository.Controls().getIsDate() && this.controlsRepository.Controls().getIsAddress()) {

                    searchBody = null
                    search = null
                    errorMessage = null
                    logDate = new Date()

                    try{
                        // geocodify
                        search = await this.geocoder.responseGeoapi(this.addressRepository.Address().getAddress())
                        console.log('- '+this.geocoder.GeoService().getName()+' - '+logDate.toLocaleDateString()+' '+logDate.toLocaleTimeString()+' - '+'geocodify request id '+this.addressRepository.Address().getId()+' from '+this.addressRepository.AddressSource().getName())
                        // parse of response geoapi
                        searchBody = await this.geocoder.responseMapper(search?.body)
                    } catch (e) {
                        // console.log(e)
                        errorMessage = (e as Error).message
                        console.log('ErrorApi: '+this.geocoder.GeoService().getName()+' - '+logDate.toLocaleDateString()+' '+logDate.toLocaleTimeString()+' - '+'geocodify request id ' +this.addressRepository.Address().getId()+'; '+errorMessage)
                    }

                    // update requests
                    dataUpdateRequests = {
                        id: {id: this.controlsRepository.Controls().getId()},
                        value: {
                            requests: this.controlsRepository.Controls().getRequests()+1,
                            currentAddress: this.addressRepository.Address().getId(),
                            geocodify: searchBody && searchBody.length>0?this.controlsRepository.Controls().getGeocodify()+1:this.controlsRepository.Controls().getGeocodify(),
                            totalGeocodify: searchBody && searchBody.length>0?this.controlsRepository.Controls().getTotalGeocodify()+1:this.controlsRepository.Controls().getTotalGeocodify(),
                            errors: errorMessage?this.controlsRepository.Controls().getErrors()+1:this.controlsRepository.Controls().getErrors(),
                            totalErrors: errorMessage?this.controlsRepository.Controls().getTotalErrors()+1:this.controlsRepository.Controls().getTotalErrors(),
                            totalRequests: this.controlsRepository.Controls().getTotalRequests()+1,
                        }
                    }
                    // update requests, currentRequest and geocodify
                    await this.controlsRepository.update(dataUpdateRequests)

                    dataSaveResponseGeoapi = {
                        geoapiId: this.controlsRepository.Controls().getGeoapiId(),
                        currentDate: new Date(),
                        error: errorMessage?errorMessage:null,
                        addressId: this.addressRepository.Address().getId(),
                        generatedResponse: searchBody && searchBody.length>0 ? true : false
                    }
                    // save response geoapi
                    await this.responseRepository.saveResponseGeoapi(dataSaveResponseGeoapi)

                    // save response geocodify
                    if (searchBody && searchBody.length>0) {
                        for (let obj of searchBody) {
                            obj['geoapiId'] = this.controlsRepository.Controls().getGeoapiId()
                            obj['addressId'] = this.addressRepository.Address().getId()
                            await this.responseRepository.saveResponseGeocodify(obj)
                        }
                    }

                } else {
                    // stop geocoding and break for
                    console.log('- ' + this.geocoder.GeoService().getName() + ' - ' + 'Final loop')
                    if (!this.controlsRepository.Controls().getIsAddress()) console.log('- ' + this.geocoder.GeoService().getName() + ' - ' + 'Expired address')
                    if (!this.controlsRepository.Controls().getIsRequests()) console.log('- ' + this.geocoder.GeoService().getName() + ' - ' + 'Expired requests')
                    if (!this.controlsRepository.Controls().getIsDate()) console.log('- ' + this.geocoder.GeoService().getName() + ' - ' + 'Expired date')
                    this.controlsRepository.Controls().setIsGeocoding(false)

                    // update flags
                    dataUpdateFlags = {
                        id: {id: this.controlsRepository.Controls().getId()},
                        value: {
                            isGeocoding: this.controlsRepository.Controls().getIsGeocoding(),
                            isAddress: !this.controlsRepository.Controls().getIsAddress()?false:true,
                            isDate: !this.controlsRepository.Controls().getIsDate()?false:true,
                            isRequests: !this.controlsRepository.Controls().getIsRequests()?false:true
                        }
                    }
                    await this.controlsRepository.update(dataUpdateFlags)

                    // final loop
                    break
                }
                // set firstRequestGetControls
                isFirstGetControls = false
            }
        } catch (e) {
            // console.log(e)
            let error = (e as Error).message
            console.log('Error: '+this.geocoder.GeoService().getName()+'; '+error)
        }
        // --------------------- end --------------------
    }

    async run() {

        return new Promise(async (resolve, reject) => {
            try {
                const _24HoursInMilliseconds = 86400000

                // get controls
                let dataGetControls: get = {where:{geoapiId: this.geocoder.GeoService().getName()}}
                let dataCreateDate: update
                let dataResetControls: update
                this.controlsRepository.Controls().setControls(await this.controlsRepository.getControlsByGeoapiId(dataGetControls))

                // if initial date null, create date
                if (!this.controlsRepository.Controls().getInitialDate()) {
                    const createInitialDate = new Date()
                    dataCreateDate = {
                        id:{id: this.controlsRepository.Controls().getId()},
                        value:{initialDate: createInitialDate}
                    }
                    await this.controlsRepository.update(dataCreateDate)
                }

                // if date null, create date
                if (!this.controlsRepository.Controls().getDate()) {
                    const createDate = new Date()
                    // if api is day, add one day else add one month
                    if (this.geocoder.GeoService().getIsDay()) createDate.setDate(createDate.getDate() + 1); else createDate.setMonth(createDate.getMonth() + 1)
                    if (this.geocoder.GeoService().getIsInitialHours00()) createDate.setUTCHours(3,0,0,1);
                    dataCreateDate = {
                        id:{id: this.controlsRepository.Controls().getId()},
                        value:{date: createDate}
                    }
                    await this.controlsRepository.update(dataCreateDate)

                    // take three hours, because timezone
                    createDate.setHours(createDate.getHours() - 3)
                    this.controlsRepository.Controls().setDate(createDate)
                } else {
                    this.controlsRepository.Controls().getDate().setHours(this.controlsRepository.Controls().getDate().getHours() - 3)
                }

                // first thread
                if (this.controlsRepository.Controls().getDate()) this.geocodify()

                // routine, if isDay
                if (this.geocoder.GeoService().getIsDay()){
                    let currentDate = new Date()
                    let timeBlock = null

                    // take three hours, because timezone
                    currentDate.setHours(currentDate.getHours() - 3)

                    // calculate time to end of date, in milliseconds
                    if (this.geocoder.GeoService().getIsInitialHours00()){
                        let date00Hours = new Date()
                        date00Hours.setDate(date00Hours.getDate()+1)
                        date00Hours.setHours(0,0,0,1)
                        date00Hours.setHours(date00Hours.getHours() - 3)

                        timeBlock = date00Hours.getTime() - currentDate.getTime()
                    } else {
                        timeBlock = this.controlsRepository.Controls().getDate().getTime() - currentDate.getTime()
                    }

                    let isBlock = true
                    if (isBlock) {
                        setTimeout(async () => {
                            console.log('- ' + this.geocoder.GeoService().getName() + ' - ' + 'time block')
                            // await two minutes
                            await new Promise(resolve => setTimeout(resolve, 20000))
                            let dateResetBlock = new Date()
                            dateResetBlock.setDate(dateResetBlock.getDate() + 1)
                            if (this.geocoder.GeoService().getIsInitialHours00()) dateResetBlock.setUTCHours(3,0,0,1);
                            // reset date controls
                            dataResetControls = {
                                id: {id: this.controlsRepository.Controls().getId()},
                                value: {
                                    date: dateResetBlock,
                                    requests: 0,
                                    geocodify: 0,
                                    errors: 0,
                                    isGeocoding: false,
                                    isDate: true,
                                }
                            }
                            await this.controlsRepository.update(dataResetControls)
                            this.controlsRepository.Controls().setControls(await this.controlsRepository.getControlsByGeoapiId(dataGetControls))
                            this.controlsRepository.Controls().getDate().setHours(this.controlsRepository.Controls().getDate().getHours() - 3)
                            // second thread
                            if (this.controlsRepository.Controls().getDate()) this.geocodify()

                            // daily thread
                            setInterval(async () => {
                                console.log('- ' + this.geocoder.GeoService().getName() + ' - ' + 'is its in ROUTINE')
                                // await two minutes
                                await new Promise(resolve => setTimeout(resolve, 20000))
                                let dateResetRoutine = new Date()
                                dateResetRoutine.setDate(dateResetRoutine.getDate() + 1)
                                if (this.geocoder.GeoService().getIsInitialHours00()) dateResetRoutine.setUTCHours(3,0,0,1);
                                // reset date controls
                                dataResetControls = {
                                    id: {id: this.controlsRepository.Controls().getId()},
                                    value: {
                                        date: dateResetBlock,
                                        requests: 0,
                                        geocodify: 0,
                                        errors: 0,
                                        isGeocoding: false,
                                        isDate: true,
                                    }
                                }
                                await this.controlsRepository.update(dataResetControls)
                                this.controlsRepository.Controls().setControls(await this.controlsRepository.getControlsByGeoapiId(dataGetControls))
                                this.controlsRepository.Controls().getDate().setHours(this.controlsRepository.Controls().getDate().getHours() - 3)
                                if (this.controlsRepository.Controls().getDate()) this.geocodify()
                            }, _24HoursInMilliseconds)
                        }, timeBlock)
                    }
                }
                resolve('ok')
            } catch (e) {
                console.log(e)
                return reject(e)
            }
        })
    }
}
