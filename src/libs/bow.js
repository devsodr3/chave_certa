const fs = require("fs");

class BoW{

    #words;

    constructor(){
        fs.readFile("src/libs/bow.json", "utf-8", (err, data) => {
            if(err)
                throw new Error(err.message);
            this.#words = JSON.parse(data);
            
        });
    }

    #ignorar(token){
        const toIgnore = ["com","de", "e", "em", "na", "no", "do", "da", "o", ","];
            if(token == undefined) 
                return true;
            return toIgnore.includes(token);
    }

    #preProccess(descricao){

        descricao = descricao.replaceAll('\n', ' ');
        descricao = descricao.replaceAll(';', ' ');
        descricao = descricao.replaceAll(':', ' ');
        descricao = descricao.replaceAll('/', ' ');
        return descricao.split(' ')
                .map(string => (string.charAt(string.length - 1) === ',' || string.charAt(string.length - 1) === '.') ? string.slice(0, (string.length - 1)) : string)
                .filter(string => this.#ignorar(string) ? '' : string);
    }

 
    #extrairBinarios(tokens){
        const binaryVector = new Array();
        BoW.forEach((value, word) => {
            if(tokens.includes(word)) 
                binaryVector.push(value);
            else 
                binaryVector.push(0);
        });
        return binaryVector;
    }


    getBowVector(text){
        const tokens = this.#preProccess(text);
        
    }

}

module.exports =  new BoW();