const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const database = require("./config/database");

app.use(express.json());

require("dotenv").config();


const clientRoute = require("./routes/client/index.route");

database.connect();

app.use(bodyParser.json());

app.use(cors());
app.use(cors({
  origin: 'https://test-nim-client.vercel.app/' // Allow access from the new origin
}));


// Routes
clientRoute(app);

// const port = process.env.PORT ||3001 ;
// app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
// })

app.get("/", (req, res) => {
    res.send("Express on Vercel");
  });


