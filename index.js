const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let create a function to initialise the game [ starting a new game]

function initGame() {
    currentPlayer = "x";
    gameGrid = ["","","","","","","","",""];
   
   
    // making boxex emtey on ui by clicking on new game btn

    boxes.forEach((box,index)=>{
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";

        // initialise box with css property again [remove the green marks]

        box.classList = `box box${index+1}`;
        
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `current Player - ${currentPlayer}`;
   
}
initGame();

boxes.forEach((box , index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index]==""){
        gameGrid[index] = currentPlayer;
        boxes[index].innerHTML= currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap the turn [changing the gamer]

        swapTurn();

        // check if some one win the game or not

        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "x"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "x";
    }

    // ui update
    gameInfo.innerHTML = `current Player - ${currentPlayer}`;

}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position)=>{

        // all 3 boxex should be non emtey and have exactly same value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                // check if the winner is x

                if(gameGrid[position[0]] === "0") 
                answer = "0";
            else {
                answer = "x";
            } 

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
               
                // now we know who is the winner

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });



    // now we know who is the winner time to active new game btn

    if(answer!=""){
        gameInfo.innerHTML =`winner player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // when their is a tie

    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    })

    if(fillCount===9){
        gameInfo.innerHTML = "game tied !"
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener("click" , ()=>{
    initGame();
    
});