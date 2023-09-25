// import {pool} from "../config/database.js";
import pool from "../config/database.js";
import { redis } from "../config/redis.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import errorHandlerClass from "../utils/errorClass.js"
// const pool = require("../config/database.js")


//This will create new poll.
export const createPoll = catchAsyncError(async (req, res, next) => {
    try {

        const { name, vote } = req.body;

        // console.log(name)
        // console.log(vote)

        const newPoll = await pool.query(
            `INSERT INTO data
             (name, choice, "date")
             VALUES
             ($1, $2, $3) RETURNING *`,
            [name, vote, new Date()]
        );

        res.status(200).json({
            success: true,
            newPoll: newPoll.rows[0],
            message: "New poll created successfully",
        });
    } catch (error) {
        throw new Error(error)
    }
});


//This will fetch all the created polls.
export const getAllPoll = catchAsyncError(async (req, res, next) => {
    try {

        const allPolls = await pool.query(`SELECT * FROM data ORDER BY date`);
        res.status(200).json({
            success: true,
            allPolls: allPolls
        })
    } catch (error) {

        next(new errorHandlerClass("unable to get all poll", 400))
    }
})


//This will count the total number of votes for the line chart.
export const countVotes = catchAsyncError(async (req, res, next) => {
    try {
        const { choice } = req.query;

        const redisKey = `countVotes:${choice.toLowerCase()}`;

        redis.get(redisKey, async (err, cachedData) => {
            if (err) throw err;

            if (cachedData) {

                console.log("Showing cached data for the line graph")

                res.json({
                    lineGraphData: JSON.parse(cachedData),
                    message: `Showing ${choice.toLowerCase()} data (cached)`
                });
            } else {
                console.log("showing database data for the line graph")
                let count;
                if (choice.toLowerCase() === "all") {
                    const countYes = await pool.query(
                        `SELECT COUNT(*), date
                        FROM data
                        WHERE choice = true
                        GROUP BY date
                        ORDER BY date`
                    );

                    const countNo = await pool.query(
                        `SELECT COUNT(*), date
                        FROM data
                        WHERE choice = false
                        GROUP BY date
                        ORDER BY date`
                    );
                    count = {
                        countYes: countYes.rows,
                        countNo: countNo.rows,
                        message: "Showing both data"
                    };
                } else {
                    const result = await pool.query(
                        `SELECT COUNT(*), date
                        FROM data
                        WHERE choice = ${choice.toLowerCase()}
                        GROUP BY date
                        ORDER BY date`,
                    );
                    count = {
                        lineGraphData: result.rows,
                        message: `Showing ${choice.toLowerCase()} data `
                    };
                }

                redis.setex(redisKey, 3600, JSON.stringify(count)); 

                res.json(count);
            }
        });
    } catch (error) {
        next(new errorHandlerClass("unable to count poll", 400));
    }
})

//This will show the count the total yes and no.
export const countResults = catchAsyncError(async (req, res, next) => {
    try {
        redis.get('countResults', async (err, cachedData) => {
            if (err) throw err;

            if (cachedData) {

                console.log("Showing you cached total count for bar graph ")
                res.json({
                    data: JSON.parse(cachedData),
                    message: "Showing overall results (cached)"
                });
            } else {
                const result = await pool.query(
                    `SELECT COUNT(*), 
                    choice FROM data GROUP BY
                    choice`
                );

                console.log("Total count data for bar graph is fetched from the database")
                if (result) {
                    redis.setex('countResults', 3600, JSON.stringify(result.rows));
                }
                res.json({
                    data: result.rows,
                    message: "Showing overall results"
                });
            }
        });
    } catch (error) {
        next(new errorHandlerClass("unable to show overall results", 400));
    }
})


