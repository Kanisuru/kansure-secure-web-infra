const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const version = process.env.APP_VERSION || 'v1';

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send(`Welcome to Kansure Web App - Version ${version}`);
});

app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));

// Error handling
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
