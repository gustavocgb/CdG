import {addressCsv} from '../../../../interfaces/presenter/routes/addressCsv'
import {addressJson} from '../../../../interfaces/presenter/routes/addressJson'
import {home} from '../../../../interfaces/presenter/routes/home'
import {controlsRepository} from '../../../../interfaces/presenter/routes/controlsRepository'
import { Router } from 'express'

const route = Router();

// routes
home.route(route)
controlsRepository.route(route)
addressCsv.route(route)
addressJson.route(route)

export const routes = route
