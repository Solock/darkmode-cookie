import express from "express";
import nunjucks from "nunjucks";
import cookie from "cookie";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

const formParser = express.urlencoded({ extended: true });

app.post("/resources", formParser, (request, response) => {
  response.send(JSON.stringify(request.body));
  // request.body contains an object with our named fields
});

app.get("/add-cookie", (request, response) => {
  const favoriteTheme = request.body;

  response.set(
    "Set-Cookie",
    cookie.serialize("myCookie", favoriteTheme, {
      maxAge: 3600, // This is the time (in seconds) that this cookie will be stored
    }),
  );

  response.send("The cookie has been set");
});

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/options", (request, response) => {
  response.render("options");
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
