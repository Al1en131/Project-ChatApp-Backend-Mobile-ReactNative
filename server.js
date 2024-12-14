const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./config/db');
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


app.use(routes);

// Test DB connection
db.connect((err) => {
  if (err) {
    console.error('DB connection error: ', err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL DB');
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://127.0.0.1:${port}`);
});
