import dotenv from "dotenv";
import express from "express"
import cors from "cors"
dotenv.config();

// imports expenses
import { getAllExpenses, postExpense } from "./src/expenses/expenses.js";
// imports income

// imports forums

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3030

// expenses CRUD
app.post('/expenses', postExpense)
app.get('/expenses', getAllExpenses)

// income CRUD

// forums CRUD


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})