const express = require('express')
const connectDB = require('./config/db');
const app = express()
const userRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
const  eventRoutes = require('./routes/events');
const  authRoutes = require("./routes/auth");
const cors = require("cors");
const port = 3000

// mongoose

connectDB()
// ✅ Allow all origins (for development)
app.use(cors());

// Middleware
app.use(express.json());
app.use('/users', userRoutes);
app.use('/courses', coursesRoutes);
app.use('/events', eventRoutes);
app.use("/api", authRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 