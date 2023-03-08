import { MongoClient } from "mongodb";
import { MONGO_CREDENTIALS } from "../../utils.js";

export const db_connection = () => {
	const client = new MongoClient(MONGO_CREDENTIALS.uri);
	return client.db(MONGO_CREDENTIALS.db);
};
