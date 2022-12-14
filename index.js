const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const jwtSecret = "abc123abc123abc123";

const PORT = process.env.PORT || 3000;
const mongo = process.env.MONGO || "mongodb://localhost/minhas-series-rest";
const User = require("./models/user");

//rotas
const series = require("./routes/series");
// const auth = require("./routes/auth.js");

app.use("/series", series);
// app.use("/auth", auth);

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

const createInitialUsers = require("./utils/createUser");

// manter a rota aqui por enquanto
app.post("/auth", async (req, res) => {
    const user = req.body;
    try {
        const userDB = await User.findOne({ username: user.username });
        if (userDB) {
            if (userDB.password === user.password) {
                const payload = {
                    id: userDB.id,
                    username: userDB.username,
                    roles: userDB.roles,
                };
                jwt.sign(payload, jwtSecret, (err, token) => {
                    res.send({
                        success: true,
                        message: "Usuário autenticado com sucesso",
                        token: token,
                    });
                });
            } else {
                res.send({ success: false, message: "Credenciais incorretas" });
            }
        } else {
            res.send({ success: false, message: "Credenciais incorretas" });
        }
    } catch (error) {
        res.send({ success: false, errors: Object.keys(error.errors) });
    }
});

mongoose
    .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        createInitialUsers().then(
            app.listen(PORT, console.log(`Listening on port ${PORT}`))
        );
    })
    .catch((e) => console.log(e));
