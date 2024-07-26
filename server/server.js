const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/auth'); // Add this line

// Connect to database
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/api/items', require("./routes/items"));
app.use('/api/payment', require("./routes/payment"));


// Add this line after other routes
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
