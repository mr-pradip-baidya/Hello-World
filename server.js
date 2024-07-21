
const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //stored req.body
const MenuItem = require("./models/MenuItem");

// Middleware function
const logRequest = (req, res, next) =>{
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
  next();
}





app.get("/", logRequest , function (req, res) {
 res.status(200).json("Data send successfully.")
  
});
 

// Import the router file
const personRoutes = require("./routes/personRoutes");
const menuItem = require("./routes/menuItemRoutes");

// Use the routers
app.use("/person", personRoutes);
app.use("/menu-item", menuItem);


// Use the middleware
app.use(logRequest);





app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/hotels`);
});


