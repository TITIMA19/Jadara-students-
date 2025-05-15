const express = require('express')
const connectDB = require('./config/db');
const app = express()
const userRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');

const port = 3000

// mongoose

connectDB()


// Middleware
app.use(express.json());
app.use('/users', userRoutes);
app.use('/courses', coursesRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 