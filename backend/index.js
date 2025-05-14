const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Users = require("./models/users");

const port = 3000

mongoose
	.connect(
"mongodb+srv://essanhajimaryam10:7jYvmRt9Pnw2Jc9n@cluster0.ie7haqb.mongodb.net/"	)
	.then(() => {
		console.log("connected successfully");
	})
	.catch((error) => {
		console.log("error with connecting with the DB ", error);
	});
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 