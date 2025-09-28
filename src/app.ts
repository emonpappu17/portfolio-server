import express from "express";

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.json('Well come to Nextfolio server')
})


export default app;