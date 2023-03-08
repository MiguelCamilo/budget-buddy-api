import { db_connection } from "../connection/db_connection.js";

// get all
export const get_all_savings = async (req, res) => {
	const db = db_connection();
    // .sort() let's you sort by 1 being ascending and descinding
	const collection = await db.collection("savings").find({}).sort({ amount: -1 }).toArray();
    res.send(collection)
};

// post
export const post_savings = async (req, res) => {
	const { title, goal } = req.body;

	// validation 
	if ( title.length < 1 || goal.length <= 0 ) {
		return res.status(500).send({ message: "Please enter a title and goal"})
	}

	const savings = { title, goal }
	const db = db_connection();

	try {
		await db.collection("savings").insertOne(savings);
		const all_savings = await get_all_savings(req,res);
        res.status(200).send({ message: "Added savings successfully.", data: all_savings });

	} catch (err) {
		res.status(500).send({ message: "Unable to add savings"})
	}
};