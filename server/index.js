const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const overlayRoutes = require('./routes/overlay');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(overlayRoutes);
require("dotenv").config();
const PORT = process.env.PORT || 3000;


const connectWithDb = require("./config/databse");
connectWithDb();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
