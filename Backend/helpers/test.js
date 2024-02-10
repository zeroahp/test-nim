let COMPUTER = 1;
let HUMAN = 2;
const maxQuare = 10;


class move
{
	constructor()
	{
		this.pile_index;
		this.stones_removed;
		
	}
	
};


function showPiles (piles, n)
{
	let i;
	process.stdout.write("Current Game Status -> ");
	for (i=0; i<n; i++){
        process.stdout.write(" " + piles[i]);
    }
	process.stdout.write("\n");
	return;
}


function gameOver(piles, n)
{
	let i;
	for (i=0; i<n; i++)
		if (piles[i]!=0)
			return false;

	return true;
}

// A function to declare the winner of the game
function declareWinner(whoseTurn)
{
	if (whoseTurn == COMPUTER)
		console.log("\nHUMAN won\n");
	else
		console.log("\nCOMPUTER won\n");
	return;
}

// A function to calculate the Nim-Sum at any point
// of the game.
function calculateNimSum(piles, n)
{
	let i, nimsum = piles[0];
	for (i=1; i<n; i++)
		nimsum = nimsum ^ piles[i];
	return nimsum;
}

// A function to make moves of the Nim Game
function makeMove(piles, n, moves)
{
	let i, nim_sum = calculateNimSum(piles, n);

	if (nim_sum != 0)
	{
		for (i=0; i<n; i++)
		{
			// If this is not an illegal move
			// then make this move.
			if ((piles[i] ^ nim_sum) < piles[i])
			{
				moves.pile_index = i;
				moves.stones_removed = piles[i]-(piles[i]^nim_sum);
				piles[i] = (piles[i] ^ nim_sum);
				break;
			}
		}
	}

	else
	{
		// Create an array to hold indices of non-empty piles
		let non_zero_indices = new Array(n);
		let count;

		for (i=0, count=0; i<n; i++){
			if (piles[i] > 0)
				non_zero_indices [count++] = i;
		}
		let randomIndex = Math.floor(Math.random() * (count));
		moves.pile_index = non_zero_indices[randomIndex];
		moves.stones_removed = 1 + Math.floor(Math.random() * (piles[moves.pile_index]));
		piles[moves.pile_index] = piles[moves.pile_index] - moves.stones_removed;

		if (piles[moves.pile_index] < 0)
			piles[moves.pile_index]=0;
	}
	return;
}

// function humanPlay(piles, n, moves, p, s){
// 	let pileIndex = p;
// 	let stoneRemoved = s;

// 	if(pileIndex < 0 || pileIndex >= n || stoneRemoved < 1 || stoneRemoved > piles[pileIndex])
// 	{
// 		console.log("khong hop le!");
// 		humanPlay(piles, n, moves)
// 	} else {
// 		moves.pile_index = pileIndex;
// 		moves.stones_removed = stoneRemoved;
// 		piles[moves.pile_index] = piles[moves.pile_index] - moves.stones_removed;

// 	}
// }

function playGame(piles, n, whoseTurn)
{
	console.log("\nGAME STARTS\n");
	let moves = new move();

	while (gameOver(piles, n) == false)
	{
		showPiles(piles, n);


		if (whoseTurn == COMPUTER)
		{
			makeMove(piles, n, moves);
			console.log("COMPUTER removes", moves.stones_removed, "stones from pile at index ", moves.pile_index);
			whoseTurn = HUMAN;
		}
		else
		{
			// humanPlay(piles, n, moves, p, s);
			makeMove(piles, n, moves);

			console.log("HUMAN removes", moves.stones_removed, "stones from pile at index", moves.pile_index);
			whoseTurn = COMPUTER;
		}
	}

	showPiles(piles, n);
	declareWinner(whoseTurn);
	return;
}

function knowWinnerBeforePlaying(piles, n, whoseTurn)
{
	process.stdout.write("Prediction before playing the game -> ");

	if (calculateNimSum(piles, n) !=0)
	{
		if (whoseTurn == COMPUTER)
			console.log("COMPUTER will win");
		else
			console.log("HUMAN will win");
	}
	else
	{
		if (whoseTurn == COMPUTER)
			console.log("HUMAN will win");
		else
			console.log("COMPUTER will win");
	}

	return;
}


//draw board
function drawBoard(piles, n) {
    console.log("Current Game Board:");
    for(let i = 0; i < n; i++) {
        let stones = new Array(piles[i]).fill("x").join('');
        console.log(`[${stones}]`);
    }
    console.log(" ");
}

function showPile(piles, n) {
    drawBoard(piles, n);
}

// Driver program to test above functions
//---------------------------------------------------------

//to binary
function decimalToBinary(decimalNumber) {
    return decimalNumber.toString(2);
}
//random
function generateRandomArray(){
    // Math.floor(Math.random() * (max - min + 1)) + min
    let pileArray = Math.floor(Math.random() * (6)) + 1;
    let randomArray = [];
    for(let i = 0; i< pileArray ; i++){
        let randomNumber = Math.floor(Math.random() * (5)) + 1;
        randomArray.push(randomNumber);
    }
    return randomArray;
}


let array = generateRandomArray();
console.log("array", array);
console.log("array", array.length);

console.log("--------------------");
console.log(decimalToBinary(calculateNimSum(array, array.length)));

showPile(array, array.length);

knowWinnerBeforePlaying(array, array.length,HUMAN);

// let p = prompt("nhap da")
// let s = prompt("nhap sl")
playGame(array, array.length, HUMAN);

