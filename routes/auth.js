const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/auth", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.send({ success: false, errors: error });
    }
});

router.post("/auth", async (req, res) => {
    const user = req.body;
    try {
        const userDB = await User.findOne({ username: user.username });
        if (userDB) {
            if (userDB.password === user.password) {
                res.send({
                    success: true,
                    message: "Usuário autenticado com sucesso",
                    token: "",
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

module.exports = router;
