const express = require("express");
const router = express.Router();
const Serie = require("../models/serie");

router.get("/", async (req, res) => {
    try {
        const series = await Serie.find({});
        res.send(series);
    } catch (error) {
        res.send({ success: false, errors: error });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const serie = await Serie.findOne({ _id: req.params.id });
        res.send(serie);
    } catch (error) {
        res.send({ success: false, errors: error });
    }
});

router.post("/", async (req, res) => {
    const serie = new Serie(req.body);
    try {
        await serie.save();
        res.send(serie);
    } catch (error) {}
});

router.delete("/:id", async (req, res) => {
    try {
        await Serie.remove({ _id: req.params.id });
        res.send({
            success: true,
            message: `Serie com id ${req.params.id} deletada com sucesso`,
        });
    } catch (error) {
        res.send({ success: false, errors: error });
    }
});

router.put("/:id", async (req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id });
    serie.name = req.body.name;
    serie.status = req.body.status;
    console.log(serie);
    try {
        await serie.save();
        res.send(serie);
    } catch (e) {
        res.send({ success: false, errors: Object.keys(e.errors) });
    }
});

module.exports = router;
