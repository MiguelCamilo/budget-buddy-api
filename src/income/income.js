import { ObjectId } from "mongodb";
import { db_connection } from "../connection/db_connection.js";

// get
export const get_all_income = async (req,res) => {
    const db = db_connection()

    const collection = await db.collection("income").find({}).sort({ amount: -1 }).toArray();
    res.send(collection)
}

// post
export const post_income = async (req,res) => {
    const income = req.body;
    const db = db_connection()

    try {
        await db.collection("income").insertOne(income)
        const all_income = await get_all_income(req,res)
        res.status(200).send({ message: "Added income successfully.", data: all_income })

    } catch (err) {
        res.status(500)
    }
}

// delete
export const delete_income = async (req,res) => {
    const query = { _id: new ObjectId(req.params.id)}
    const db = db_connection()

    try {
        await db.collection("income").deleteOne(query)
        const all_income = await get_all_income(req,res)
        res.status(200).send({ message: "Deleted income successfully.", data: all_income })
    }catch (err) {
        res.status(500)
    }
}