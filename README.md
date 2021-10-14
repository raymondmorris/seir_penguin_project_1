# Project 1 Documentation
## By: Raymond Morris

## Introduction 

This is a two player trivia game on One Piece. Within the game there is a start, series of questions, and ultimitely a winner (whoever gets to 10 first). 

Created game using HTML, CSS, JS, and jQuery. Once start is clicked, the start fucntion disapears and reveals the questions. The questions are randomly generated with user input player names and will display the score for each player until there is a winner. Which will then display a new area with the winner, fireworks at top of page and a play again button to reset the score and questions.

## Technologies Used

-HTML
-CSS
-JS
-jQuery   
    
-Used jQuery fireworks plugin for fireworks above winner from: https://www.jqueryscript.net/animation/Realistic-Fireworks-Animations-Using-jQuery-And-Canvas-fireworks-js.html


## Challenges

### Had trouble with restart (play again) function 
Had some trouble with my restart code. I initially put this before the choose answer function
```
$("#winner").on("click", ($playAgain) => {
            state.which = true
            $("#winner").css("display", "none")
            $("#question").css("display", "block")
            $("#answer-box").css("display", "flex")
        })
```
It was not updated score and restarting on player 2. I ended up putting it within the choose answer function to include a restart function and setBoard function which worked when placed within each players win criteria.
```
if(state.player1 === 2) {
        state.player1++
        $("#question").css("display", "none")
        $("#answer-box").css("display", "none")
        $("#winner").css("display", "block")
        $("#winner h1").text(`THE WINNER IS: PLAYER 1!!!`)
        restart()
        $("#winner").on("click", ($playAgain) => {
            state.which = true
            $("#winner").css("display", "none")
            $("#question").css("display", "block")
            $("#answer-box").css("display", "flex")
        })
        serBoard()
```

<!-- #### Example table
| Column1 | Column2 |
|---------|---------|
| Thing1  | Thing2  |
| Thing3  | Thing4  | -->