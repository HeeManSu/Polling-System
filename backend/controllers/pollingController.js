// import {pool} from "../config/database.js";
import pool from "../config/database.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import errorHandlerClass from "../utils/errorClass.js"
import knexInstance from "../config/database.js";
// const pool = require("../config/database.js")



//This will create new poll.
export const createPoll = catchAsyncError(async (req, res, next) => {
    try {

        const { name, vote } = req.body;

        console.log(name)
        console.log(vote)

        // const newPoll = await pool.query(
        //     `INSERT INTO data
        //      (name, choice, "date")
        //      VALUES
        //      ($1, $2, $3) RETURNING *`,
        //     [name, vote, new Date()]
        // );

        const newPoll = await knexInstance('data').insert({
            name: name,
            choice: vote,
            date: new Date()
        }).returning('*');

        res.status(200).json({
            success: true,
            newPoll: newPoll[0],
            message: "New poll created successfully",
        });
    } catch (error) {
        throw new Error(error)
    }
});


//This will fetch all the created polls.
export const getAllPoll = catchAsyncError(async (req, res, next) => {
    try {

        // const allPolls = await knexInstance('data').orderBy('date', 'desc');

        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        console.log("page: ", page)
        console.log("size: ", size)

        const offSet = (page - 1) * size;

        console.log("offset", offSet)

        const totalQuery = await knexInstance('data').count('* as total').first();
        const total = parseInt(totalQuery.total);
        console.log("total ", total);
        const allPolls = await knexInstance('data')
        .select('*')
        .offset(offSet)
        .limit(size);

        res.status(200).json({
            success: true,
            allPolls: allPolls,
            total,
            page,
            size
        })
    } catch (error) {
        next(new errorHandlerClass("unable to get all poll", 400))
    }
})


//This will count the total number of votes for the line chart.
export const countVotes = catchAsyncError(async (req, res, next) => {
    try {
        const { choice } = req.query;
        if (choice.toLowerCase() === "all") {

            const countYes = await knexInstance('data')
                .select(knexInstance.raw('COUNT(*) as count'), 'date')
                .where('choice', true)
                .groupBy('date')
                .orderBy('date');

            const countNo = await knexInstance('data')
                .select(knexInstance.raw('COUNT(*) as count'), 'date')
                .where('choice', false)
                .groupBy('date')
                .orderBy('date');

            res.json({
                lineGraphData: {
                    countYes: countYes,
                    countNo: countNo,
                    message: "Showing both data"
                }
            })
        } else {
            const count = await knexInstance('data')
                .select(knexInstance.raw('COUNT(*) as count'), 'date')
                .where('choice', choice.toLowerCase())
                .groupBy('date')
                .orderBy('date');

            res.json({
                lineGraphData: count,
                message: `Showing ${choice.toLowerCase()} data `
            })
        }
    } catch (error) {
        return new Error(error)
    }
})

//This will show the count the total yes and no.
export const countResults = catchAsyncError(async (req, res, next) => {
    try {
        // const result = await pool.query(
        //     `SELECT COUNT(*), 
        //     choice FROM data GROUP BY
        //     choice`
        // );

        const result = await knexInstance('data')
            .select(knexInstance.raw('COUNT(*) as count'), 'choice')
            .groupBy('choice');

        res.json({
            data: result,
            message: "Showing overall results"
        });
    } catch (error) {
        next(new errorHandlerClass("unable to show overall results", 400))
    }
})


