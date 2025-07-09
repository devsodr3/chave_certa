const cosS = require("./cosSimilarity");
const BoW = require("./bow");

const epsilon = 0.2;
const minSamples = 4;


const visiteds = new Set();

function getNeighbors(imovel, imoveis){
    
    return imoveis.filter((curr) =>{
        if(!curr || visiteds.has(curr.id)) return;

        const distance = 1 - cosS.getSimilaridade(
                cosS.calcScalar(Array.from(imovel.bowVector), Array.from(curr.bowVector)),
                imovel.norma,
                curr.norma);

        if(distance < epsilon){
            visiteds.add(curr.id);
            return curr;
        }
    });
}

function scanCluster(startPoint, imoveis, cluster){

    cluster = cluster || new Array();
    const neighbors = getNeighbors(startPoint, imoveis);

    if(neighbors.length > minSamples){
        neighbors.forEach(neighbor => {
            cluster.push(neighbor);
            scanCluster(neighbor, imoveis, cluster);
        });
    }
    return cluster;
}

function DBSCAN(imoveis){

    
    const clusters = new Array();
    imoveis.forEach(imovel =>{ 
        if(!imovel || visiteds.has(imovel.id))
            return;
        clusters.push(scanCluster(imovel, imoveis));
    });
    
    return clusters;
}




module.exports = {DBSCAN}