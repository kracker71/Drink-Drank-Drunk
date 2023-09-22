import express from "express";
import morgan from "morgan";
import {trim_all} from "request_trimmer"

//import route

const app = express();

app.use(express.json());
app.listen();

//cors
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"),
		res.header(
			"Access-Control-Allow-Headers",
			"Origin,X-Request-With,Content-Type,Accept,Authorization,ngrok-skip-browser-warning"
		),
		res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE"),
		next();
});

//log
morgan.token("splitter", (req) => {
	return "\x1b[36m--------------------------------------------\x1b[0m\n";
});
morgan.token("statusColor", (req, res, args) => {
	// get the status code if response written
	var status = (
		typeof res.headersSent !== "boolean"
			? Boolean(res.header)
			: res.headersSent
	)
		? res.statusCode
		: undefined;

	// get status color
	var color =
		status >= 500
			? 31 // red
			: status >= 400
			? 33 // yellow
			: status >= 300
			? 36 // cyan
			: status >= 200
			? 32 // green
			: 0; // no color

	return "\x1b[" + color + "m" + status + "\x1b[0m";
});

import UserRoute from "./route/user.route.js"

app.use(trim_all)

app.get("/",(req,res) => {
    res.send("Welcome to User Service")
})

app.use("/user", UserRoute)

export default app


