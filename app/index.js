import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";

import { PORT } from "./config.js";
import school_routes from "./routes/school_route.js";
import student_routes from "./routes/student_route.js";
import user_routes from "./routes/user_route.js";
import validate_token from "./middleware/validate_token.js";

const app = express();

const error_handling = (err, req, res, next) => {
    return res.status(500).json({message: err.toString()});
}

mongoose.connect("mongodb://localhost:27017/schoolDB")
    .then(() => console.log("DB berhasil connect"))
    .catch((err) => console.log(err));


app.use(error_handling);
app.use(bodyParser.json({ type: "application/json" }));
app.use(helmet());
app.use(cors());

app.use("/user", user_routes);
app.use("/schools", validate_token, school_routes);
app.use("/students", validate_token, student_routes);

app.listen(PORT);