import { ObjectId } from "mongodb";
import { db_connection } from "./db_connection.js";

// get all
export const getAllExpenses = async (req, res) => {
    const db = db_connection()

    const collection = await db.collection('expenses').find({}).toArray()
    res.send(collection)
}

// post
export const postExpense = async (req,res) => {
    const expense = req.body 
    const db = db_connection()

    await db.collection('expenses').insertOne(expense)
        .catch(err => { 
            res.status(500).send({ success: false, message: err }) 
            return
        })
        
        res.status(201).send({ message: 'Expense Added' })
}