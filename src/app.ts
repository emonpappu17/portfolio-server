import express from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.json('Well come to Nextfolio server')
})

app.use(globalErrorHandler)
app.use()

export default app;