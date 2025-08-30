import pkg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pkg;
const pool_instance = new Pool({
    connectionString: process.env.PG_CONNECTION_STRING
})

export default pool_instance;