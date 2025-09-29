require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const port = 3000;
const apiRoute = require("./routes/index");
const { dbConnect } = require("./modules/database");

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, 
}));

app.use(express.json());
app.use(apiRoute);
dbConnect(process.env.DB_LINK);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
