import express from "express"
import { config } from "dotenv"
import cors from "cors"
import errorHandlerMiddleware from "./middlewares/errorHandler.js"
import cookieParser from "cookie-parser"

config({
    path: "./config/config.env"
})

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))


import poll from "./routes/pollRoutes.js"
app.use("/api/v1", poll)


export default app;


app.get("/", (req, res) => {
    res.send(
        `<h1> Site is working. Click <a herf=${process.env.FRONTEND_URL}>here </a> to visit frontend.</h1>`
    )
})


app.use(errorHandlerMiddleware)