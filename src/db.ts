import { Pool } from 'pg';

const pool = new Pool({
    user: "postgres",
    password: "###",
    host: "localhost",
    port: 5432,
    database: "node_postgres"
})

export default pool