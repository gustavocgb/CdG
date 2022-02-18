import "dotenv/config";
import { env } from 'process';

export default {
	APP_PORT: Number.parseInt(env.APP_PORT as any),

	DB_HOST: env.DB_HOST,
	DB_NAME: env.DB_NAME,
	DB_USER: env.DB_USER,
	DB_PASS: env.DB_PASS,
	DB_PORT: Number.parseInt(env.DB_PORT as any),

	GEOCODIFY_API_KEY: env.GEOCODIFY_API_KEY,
	GOOGLE_API_KEY: env.GOOGLE_API_KEY,
	HERE_API_KEY: env.HERE_API_KEY,
	MAPBOX_API_KEY: env.MAPBOX_API_KEY,
	OPENCAGE_API_KEY: env.OPENCAGE_API_KEY,
	ORS_API_KEY: env.ORS_API_KEY,
	TOMTOM_API_KEY: env.TOMTOM_API_KEY,

	GEOAPI_SECRET: env.GEOAPI_SECRET,
}