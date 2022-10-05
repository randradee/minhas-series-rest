const express = require("express");
const router = express.Router();
const Serie = require("../models/serie");

router.get("/", async (req, res) => {
    const series = await Serie.find({});
    res.send(series);
});

router.get("/:id", async (req, res) => {
    const serie = await Serie.find(req.params.id);
    res.send(req.body);
});

router.post("/", async (req, res) => {
    const serie = new Serie(req.body);
    // try {
    // await serie.save();
    res.send(serie);
    // } catch (e) {
    //     res.send({ success: false, errors: Object.keys(e.errors) });
    // }
});

module.exports = router;
