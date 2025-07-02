

const BoW = new Map([['teste', 7]]);

function ignore(string)
{
    const toIgnore = ["com","de", "e", "em", "na", "no", "do", "da", "o", ","];
    if(string == undefined) 
        return true;
    return toIgnore.includes(string);
}

//we shold isolate cleaner ',' and '.'
const preProccess = text => {
    
    text = text.replaceAll('\n', ' ');
    text = text.replaceAll(';', ' ');
    text = text.replaceAll(':', ' ');
    text = text.replaceAll('/', ' ');
    return text.split(' ')
            .map(string => (string.charAt(string.length - 1) === ',' || string.charAt(string.length - 1) === '.') ? string.slice(0, (string.length - 1)) : string)
            .filter(string => ignore(string) ? '' : string);
}

 
const extractBinary = tokens => tokens.map(word => BoW.includes(word) ? 1 : 0);
const calcScalar = (binaryA, binaryB) => binaryA.reduce((acc, a, iA) => acc + (a * binaryB[iA]), 0);
const calcNorma = binaryVector => binaryVector.reduce((acc, digit) => acc + Math.pow(digit, 2), 0);
module.exports = {preProccess, calcNorma, BoW};