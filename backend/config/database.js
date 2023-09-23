// const Pool = require("pg").Pool;
import { config } from "dotenv"


import pg from "pg"
const {Pool} = pg;
config({
    path: "./config/config.env"
})

const pool = new Pool({
    user: "postgres",
    password: process.env.DATABASE_PASSWORD,
    database: "taghash_assignment",
    host: "localhost",
    port: 4004,
})
pool.connect((err) => {
    if (err) {
        throw Error(err);
    }
    console.log("connected to postgres database successfully");

});


export default pool;