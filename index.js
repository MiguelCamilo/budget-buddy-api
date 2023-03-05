import dotenv from "dotenv";
import express from "express"
import cors from "cors"
dotenv.config();

import { get_all_expenses, post_expenses, delete_expenses } from "./src/expenses/expenses.js";
import { get_all_income, post_income, delete_income } from "./src/income/income.js";

// imports forums

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3030

// expenses 
app.post('/expenses', post_expenses)
app.get('/expenses', get_all_expenses)
app.delete('/expenses/:id', delete_expenses)


// income 
app.post('/income', post_income)
app.get('/income', get_all_income)
app.delete('/income/:id', delete_income)

// forums CRUD


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})