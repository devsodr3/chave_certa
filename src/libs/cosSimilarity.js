
const BoW = require("./bow");





//we should isolate the cleaners ',' and '.'

const calcScalar = (binaryA, binaryB) => binaryA.reduce((acc, a, iA) => acc + (a * binaryB[iA]), 0);
const calcNorma = vetorBinario => Math.sqrt(vetorBinario.reduce((acc, digit) => acc + Math.pow(digit, 2), 0));
const getSimilaridade = (scalar, normaA, normaB) => scalar / (normaA * normaB)



module.exports = {calcNorma, calcScalar, getSimilaridade};