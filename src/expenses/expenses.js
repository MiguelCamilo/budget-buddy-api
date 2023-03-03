import { ObjectId } from "mongodb";
import { db_connection } from "../connection/db_connection.js";

// get all
export const getAllExpenses = async (req, res) => {
	const db = db_connection();
    // .sort() let's you sort by 1 being ascending and descinding
	const collection = await db.collection("expenses").find({}).sort({ amount: -1 }).toArray();
	res.send(collection) 
};

// post
export const postExpense = async (req, res) => {
	const expense = req.body;
	const db = db_connection();

	try {
		await db.collection("expenses").insertOne(expense);
		await getAllExpenses(req,res);
        res.status(204)

	} catch (err) {
		res.status(500).send(err);
	}
};

// delete
export const deleteExpense = async (req, res) => {
	const query = { _id: new ObjectId(req.params.id) }
	const db = db_connection();

	try {
		await db.collection("expenses").deleteOne(query)
		await getAllExpenses(req,res)
		res.status(200)

	} catch (err) {
		res.status(500).send(err);
	}
	
}