import pkg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const {Pool} = pkg
const pool = new Pool ({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    ssl: true
})

export default pool