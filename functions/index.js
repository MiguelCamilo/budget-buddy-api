import functions from "firebase-functions"
import express from "express"
import cors from "cors"

import { get_all_expenses, post_expenses, delete_expenses  } from "./src/expenses/expenses.js"
import { get_all_income, post_income, delete_income } from "./src/income/income.js"
import { get_all_savings, post_savings, delete_savings } from "./src/savings/savings.js"
import { get_all_forum, post_forum } from "./src/forums/forums.js"

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

// expenses 
app.post('/expenses', post_expenses)
app.get('/expenses', get_all_expenses)
app.delete('/expenses/:id', delete_expenses)


// income 
app.post('/income', post_income)
app.get('/income', get_all_income)
app.delete('/income/:id', delete_income)

// savings
app.post('/savings', post_savings)
app.get('/savings', get_all_savings)
app.delete('/savings/:id', delete_savings)

// forums
app.post('/forum', post_forum)
app.get('/forum', get_all_forum)

export const api = functions.https.onRequest(app)