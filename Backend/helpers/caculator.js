module.exports.decimalToBinary = (decimalNumber) => {
    return decimalNumber.toString(2);
}

module.exports.calculateNimSum = (piles, n) =>
{
    let i, nimsum = piles[0];
    for (i=1; i<n; i++){
        nimsum = nimsum ^ piles[i];
        console.log("i", i);
        console.log("nimsum[i]", nimsum);
    }
    
    console.log("nimsum", nimsum);
    return nimsum;
}