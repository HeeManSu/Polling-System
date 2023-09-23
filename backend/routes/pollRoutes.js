import express from "express"
import {  countResults, countVotes, createPoll, getAllPoll } from "../controllers/pollingController.js";


const router = express.Router();

router.route("/polldata").post(createPoll)
router.route("/polldata").get(getAllPoll)
router.route("/totalvotes").get(countVotes)
router.route("/results").get(countResults)

export default router;
