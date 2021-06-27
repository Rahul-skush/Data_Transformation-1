const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Proj has just begin." });
});

require("./app/routes/job.routes.js")(app);
require("./app/routes/stage.routes.js")(app);
require("./app/routes/stageDetail.routes.js")(app);
require("./app/routes/file.routes.js")(app);
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});