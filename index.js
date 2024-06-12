const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/api", require("./routes/contactRoutes"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});