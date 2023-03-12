import { errorMonitor } from "events";
import { db_connection } from "../connection/db_connection.js";

// get all
export const get_all_forum = async (req, res) => {
    const db = db_connection()

    const collection = await db.collection("forums").find({}).toArray()
    return collection
}

export const post_forum = async (req, res) => {
    const { title, info } = req.body

    if ( title.length < 1 || info.length <= 0 ) {
        return res.status(500).send({ message: "Please enter a title and information."})
    }
    
    const post = { title, info }
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