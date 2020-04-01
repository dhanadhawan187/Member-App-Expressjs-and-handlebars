const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 5000;
const logger = require("./middleware/logger");
const members = require("./members");

app.use(logger);

//handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//render home page
app.get("/", (res, req) =>
  req.render("index", {
    title: "Memeber App",
    members
  })
);
//static
app.use(express.static(path.join(__dirname, "public")));

//body parsermiddle ware
app.use(express.json());
//for form details safety
app.use(express.urlencoded({ extended: false }));

//member api routes
app.use("/api/members/", require("./routes/api/members"));

/*app.get("/", (req, res) => {  
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
*/
app.listen(PORT, () => console.log(`server started ${PORT}`));
