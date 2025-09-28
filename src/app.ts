import express from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app = express();
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
    res.json('Well come to Nextfolio server')
})

app.use(globalErrorHandler)
app.use(notFound)

export default app;