
const router = require("express").Router();
const Imovel = require("../models/imovel")

router.post("/imovel", (req, res)=>{
    const payload = req.body;
    Imovel.create(payload);
});

module.exports = router;

