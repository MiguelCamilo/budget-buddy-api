import { ObjectId } from "mongodb";
import { db_connection } from "../connection/db_connection.js";

// get all
export const get_all_expenses = async (req, res) => {
	const db = db_connection();
    // .sort() let's you sort by 1 being ascending and descinding
	const collection = await db.collection("expenses").find({}).sort({ amount: -1 }).toArray();
    return collection
};

// post
export const post_expenses = async (req, res) => {
	const { type, title, amount } = req.body;

	// validation 
	if ( title.length < 1 || amount.length <= 0 ) {
		return res.status(500).send({ message: "Please enter a title and amount"})
	}

	const expense = { type, title, amount }
	const db = db_connection();

	try {
		await db.collection("expenses").insertOne(expense);
		const all_expenses = await get_all_expenses(req,res);
        res.status(200).send({ message: "Added expense successfully.", data: all_expenses });

	} catch (err) {
		res.status(500).send({ message: "Unable to add expense"})
	}
};

// delete
export const delete_expenses = async (req, res) => {
	const query = { _id: new ObjectId(req.params.id) }
	const db = db_connection();

	try {
		await db.collection("expenses").deleteOne(query)
		const all_expenses = await get_all_expenses(req,res);
		res.status(200).send({ message: "Expense successfully deleted.", data: all_expenses})

	} catch (err) {
		res.status(500).send({ message: "Unable to delete"});
	}
	
}

// cracking the code interview