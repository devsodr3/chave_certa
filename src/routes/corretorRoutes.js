
const router = require("express").Router();
const Corretor = require("../models/corretor");

router.post("/corretor", (req, res)=>{
    const payload = req.body;
    Corretor.create(Corretor.validarDados(payload));
});


module.exports = router;