// const Pool = require("pg").Pool;
import { config } from "dotenv"



// import pg from "pg"
// const {Pool} = pg;
config({
    path: "./config/config.env"
})

// const pool = new Pool({
//     user: "postgres",
//     password: process.env.DATABASE_PASSWORD,
//     database: "taghash_assignment",
//     host: "localhost",
//     port: 4004,
// })
// pool.connect((err) => {
//     if (err) {
//         throw Error(err);
//     }
//     console.log("connected to postgres database successfully");

// });


// export default pool;

import knex from "knex"

const knexConfig = {
    client: 'pg',
    connection: {
        user: 'postgres',
        password: process.env.DATABASE_PASSWORD,
        database: 'taghash_assignment',
        host: 'localhost',
        port: 4004,
    },
}

const knexInstance = knex(knexConfig);

knexInstance.raw('SELECT 1')
.then(() => {
    console.log("Connected with the database successfully");
})
.catch((error) => {
    console.error('Error connecting to the database', error)
})

export default knexInstance;