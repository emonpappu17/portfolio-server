import express from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";
import cookieParser from "cookie-parser";
import cors from "cors"
import { envVars } from "./app/config/env";

const app = express();
app.use(cookieParser())
app.use(express.json());

app.use(cors({
    origin: envVars.FRONTEND_URL,
    credentials: true
}))

app.use("/api", router);

app.get("/", (req, res) => {
    res.json('Well come to Nextfolio server')
})

app.use(globalErrorHandler)
app.use(notFound)

export default app;