import { MongoClient } from "mongodb";

export const db_connection = () => {
    const client = new MongoClient(process.env.URI)
    return client.db(process.env.DB)
}
