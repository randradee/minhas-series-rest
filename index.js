const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const series = require("./routes/series");
const bodyParser = require("body-parser");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const mongo = process.env.MONGO || "mongodb://localhost/minhas-series-rest";

app.use("/series", series);

mongoose
    .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, console.log(`Listening on port ${PORT}`));
    })
    .catch((e) => console.log(e));
