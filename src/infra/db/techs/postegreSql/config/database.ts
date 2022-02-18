import pkg from 'pg';
const { Pool } = pkg;
import env from '../../../../dotenv';

const pool = new Pool ({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    port: env.DB_PORT,
    database: env.DB_NAME
})

export const dataBase = {

    async pool() {
        return pool
    },

    async connect() {
        return await pool.connect()
    },

    async disconnect(client: any) {
        client.release(true)
    }

}
