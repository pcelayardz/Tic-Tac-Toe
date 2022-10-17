const state = {
    gameElement: document.querySelector('.game'),
    //cells: [null,null,null,null,null,null,null,null,null]
    cells: Array(9).fill(null),
    symbols: ['o','x'],
    winningCombinattions: [
        [0,1,2], //top row
        [3,4,5], //middle row
        [6,7,8], //bottom row
        [0,3,6], //left column
        [1,4,7], //middle column
        [2,5,9], //right column
        [0,4,8],
        [2,4,6]
    ],
    gameFinished:false
}

function drawBoard(){
    //This makes to not add more than 9 cells, so this makes the html clean and be drawn a again
    state.gameElement.innerHTML =''
    for(let i =0; i<9; i++){
        const cell = document.createElement('div')
        cell.classList.add('cell')
        /**
         * Does this cell have an x or an o? so, this code runs, 
         * otherwise it must be empty
         */
        if(state.cells[i]){
            const cellSymbol = document.createElement('p') // <p class="symbol"></p>
            cellSymbol.innerText = state.cells[i]
            cellSymbol.classList.add('symbol')

            cell.append(cellSymbol)
        }else{
            cell.addEventListener('click',function(){
                if (state.gameFinished){
                    return
                }
                state.symbols.reverse()
                state.cells[i] = state.symbols[0]

                drawBoard()

                if(checkForWinner()){
                    //winner code goes here
                    state.gameFinished = true
                    drawMessage("Congrats! You won")
                }

                if(checkForDraw()){
                    state.gameFinished = true

                    drawMessage("It's a draw")
                }
            })
        }  
        
        state.gameElement.append(cell)
    }
}

function drawMessage(message){
    const banner = document.createElement('div')
    banner.classList.add('banner')

    const h1 = document.createElement('h1')
    h1.innerText =message
    banner.append(h1)
    state.gameElement.append(banner)
}

function checkForWinner(){
    return state.winningCombinattions.some(function(combo){
        const cells = combo.map(function(index){
            return state.cells[index]
        })
        //The array does not have a null and all of the values are the same
        return !(cells.includes(null)) && new Set(cells).size === 1

    })
}

function checkForDraw(){
    return state.cells.every(function(cell){
        return cell !== null
    })
}
drawBoard()