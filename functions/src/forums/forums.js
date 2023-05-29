import { errorMonitor } from "events";
import { db_connection } from "../connection/db_connection.js";
import { time } from "console";

// get all
export const get_all_forum = async (req, res) => {
    const db = db_connection()

    const collection = await db.collection("forums").find({}).sort({ timestamp: -1 }).toArray()
    return res.status(200).send(collection)
}

export const post_forum = async (req, res) => {
    const { title, info, timestamp, userId } = req.body
    
    const post = {
        title,
        info,
        timestamp,
        userId
    }
    const db = db_connection()

    try { 
        await db.collection("forums").insertOne(post)
        const all_post = await get_all_forum(req, res)
        res.status(200).send({ message: "Added post successfully.", data: all_post })
    } catch (err) {
        console.error(errorMonitor)
        res.status(500).send({ message: "Unable to add post" })
    }
}