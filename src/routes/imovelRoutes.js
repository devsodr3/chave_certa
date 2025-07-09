
const router = require("express").Router();
const Imovel = require("../models/imovel")
const cosS = require("../libs/cosSimilarity");
const BoW = require("../libs/bow");
const Cluster = require("../libs/cluster");
const Corretor = require("../models/corretor")


async function getImoveisCounter(corretorId){
    return await Imovel.count({
        where:{corretor: corretorId}
    })
}

async function getImoveisCorretor(id){
    const corretor = await Corretor.findByPk(id);
    const imoveis = await corretor.getImovels();
    return imoveis;
}


async function cadastrarImovel(payload){
    const bowVector = BoW.getBowVector(payload.descricao);
    const norma = cosS.calcNorma(bowVector);
    return await Imovel.create({bowVector, norma, ...Imovel.validarDados({...payload})});
}

router.post("/imovel", 
    async (req, res, next) => {req.novoImovel = await cadastrarImovel(req.body); next()},
    async (req, res, next) => {
        const corretorId = req.body.corretor;
        const amount = await getImoveisCounter(corretorId);
        console.log(amount)
        if(amount >= 1) Cluster.DBSCAN(await getImoveisCorretor(corretorId));
        next();
    },
    (req, res)=>{res.send(req.novoImovel)}
);

router.get("/imovel", (req, res)=>{
    const {text, value, location} = req.params;

})

module.exports = router;

