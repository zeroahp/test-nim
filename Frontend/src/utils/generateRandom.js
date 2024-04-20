
// random number j
export const generateRandomNumberOfPileArray = (piles) =>{
    return Math.floor(Math.random() * piles) + 2;
}

export const generateRandomStoneArray = (pileArray, maxStones) =>{
    // Math.floor(Math.random() * (max - min + 1)) + min
    let randomArray = [];
    for(let i = 0; i< pileArray ; i++){
        let randomNumber = Math.floor(Math.random() * (maxStones)) + 1;
        randomArray.push(randomNumber);
    }
    return randomArray;
}
//end random number

// random string
export const randomString = (user1, user2) => {
    
    const user = [user1, user2];
    
    const randomIndex = Math.floor(Math.random() * user.length);
    const randomUser = user[randomIndex];

    return randomUser;
}
// end random string

export const randomIdBoard = () => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

