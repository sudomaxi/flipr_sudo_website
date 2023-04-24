const express = require("express");
const cors = require("cors");
const busboy = require('connect-busboy');
const app = express();

require("dotenv").config();

app.use(express.static('storage'));
app.use(cors({
  corsOption: {
    origin: '*'
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(busboy({
    highWaterMark: 2*1024*1024
}));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(
    "mongodb+srv://subha:subha41@cluster0.nejigio.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
    initial();
  })
  .catch((err) => {
    console.log("Connection error: ", err);
  });

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("Added Admin Role");
      });

      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("Added User Role");
      });
    }
  });
};

app.get("/", (req, res) => {
  res.json({ hi: "Hi" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/podcast.routes")(app);
require("./app/routes/view.routes")(app);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started");
});
