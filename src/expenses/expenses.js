// import { ObjectId } from "mongodb";
import { db_connection } from "../connection/db_connection.js";

// get all
export const getAllExpenses = async (req, res) => {
	const db = db_connection();
    // .sort() let's you sort by 1 being ascending and descin
	const collection = await db.collection("expenses").find({}).sort({ date: -1 }).toArray();
	res.send(collection)
    return 
};

// post
export const postExpense = async (req, res) => {
	const expense = req.body;
	// expense.date = new Date()
	const db = db_connection();

	try {
		await db.collection("expenses").insertOne(expense);
		await getAllExpenses(req,res);
        
	} catch (err) {
		res.status(500).send(err);
	}
};
