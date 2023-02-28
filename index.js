import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import express from "express"
import cors from "cors"
dotenv.config();

// imports expenses
import { getAllExpenses } from "./src/expenses.js";
// imports income

// imports forums

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.URI)
const db = client.db(process.env.DB)

// expenses CRUD
app.post('/expenses', )
app.get('/expenses', getAllExpenses)

// income CRUD

// forums CRUD