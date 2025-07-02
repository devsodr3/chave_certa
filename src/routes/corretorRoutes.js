
const router = require("express").Router();
const Corretor = require("../models/corretor");

router.post("/corretor", (req, res)=>{
    const cadastro = req.body;
    console.log(cadastro)
    Corretor.create(cadastro);
});


module.exports = router;