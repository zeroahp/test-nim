
//calculateNimSum
function calculateNimSum (piles, n)
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

// A function to make moves of the Nim Game
module.exports.makeMove = (piles, n, moves) =>
{
	let i, nim_sum = calculateNimSum(piles, n);

	if (nim_sum != 0)
	{
        // ----------------
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
        // ----------------

        let newBoard = [...currentBoard];

        if (currentRow === null) {
            // Nếu chưa có hàng nào được ghim, ghim hàng đang xử lý
            newBoard[rowIndex] -= 1;
            await dispatch(setCurrentBoard(newBoard));
            setcurrentRow(rowIndex);

            if (newBoard[rowIndex] === 0) {
                // Nếu đã loại bỏ hết đá từ một hàng, chuyển lượt cho người chơi khác
                handleChangeTurn();
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
