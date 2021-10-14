//********************** */
// App states and functions
//********************** */

//Players state for multiplayer
const state = {
    player1: 0,
    player2: 0,
    which: true,
}

//Player state for single player
const singlePlayer = {
    player: 0,
    which: true,
}

//Winner function for reset
const winnerScreen = () => {
    $("#container").fireworks({
        //   sound:true,// sound effect
        });
    state.player1++
    $("#question").css("display", "none")
    $("#answer-box").css("display", "none")
    $("#winner").css("display", "block")
    restart()
    $("#winner").on("click", "button", () => {
        $("#winner").css("display", "none")
        $("#question").css("display", "block")
        $("#answer-box").css("display", "flex")
        $("canvas").remove()
    })
    setBoard()
}

//Function for restart
const restart = () => {
    state.player1 = 0;
    state.player2 = 0;
    $p1score.text("0")
    $p2score.text("0")
    questionsUsed.forEach(question => {
        questions.push(question)
    })
    questionsUsed = []
    state.which = true;
    $(".counter h2").text(questions.length)

}

// Questions and used questions for refill
let questions = [];
let questionsUsed = [];
//****************** */
//  Main Dom Element
//****************** */

const $question = $("#question")
const $a = $("#a")
const $b = $("#b")
const $c = $("#c")
const $d = $("#d")

const $p1score = $(".player1 h4")
const $p2score = $(".player2 h4")
const $startBtn = $("#start")
const $playAgain = $("#winner")

//******************* */
//  Functions
//******************* */


// Single player select and start
$("#player-selection").on("click", ".single", () => {
    $(".counter").css("width", "25vw")
    $("#player-selection").css("display", "none")
    $("#start").css("display", "block")
    $("#score .player2").css("display", "none")
    $("#score").css("justify-content", "space-around")
$("#start").on("click", "button", () => {
    $("#start").css("display", "none")
    $("#turn").css("display", "block")
    $("#turn h1").text(`Get Ready!!`)
    setTimeout(() => {
    singlePlayer.which = true;
    $("#turn").css("display", "none")
    $("#question").css("display", "block")
    $("#answer-box").css("display", "flex")
    $(".counter").css("display", "block")
    $(".player1 h3").text(prompt("Enter name for player 1"))
}, 2000)

//Function to check answers, add scores, and move questions from questions to questions used
const chooseAnswer = (event, question) => {
    console.log(event)
    if (event.target.innerText === question.answer) {
        if (state.which) {
            $(".correct").css("display", "block")
            setTimeout(() => {
                $(".correct").css("display", "none")
                singlePlayer.player++
                singlePlayer.which = !singlePlayer.which
                //Removes question from questions and places it in another array
                const value = questions.indexOf(question)
                questionsUsed.push(question)
                questions.splice(value, 1)
                setBoard(questions)
            }, 2000)           
        } 
    } else { 
        $(".incorrect").css("display", "block")
            setTimeout(() => {
                $(".incorrect").css("display", "none")
                singlePlayer.which = !singlePlayer.which
                const value = questions.indexOf(question)
                questionsUsed.push(question)
                questions.splice(value, 1)
                setBoard(questions)
            }, 2000)


    }
}


// Set board, random question, answers, and a winning restart function
const setBoard = (q) => {
    $(".counter h2").text(questions.length)
    const name1 = $(".player1 h3").text().toUpperCase()

    //If no more questions Determines the players correct answer and displays, resets board
    if(questions == 0) {
        $("#winner h1").text(`You got ${singlePlayer.player} out of ${questionsUsed.length}`)
        $("#container").fireworks({
            //   sound:true,// sound effect
            });
        singlePlayer.player++
        $("#question").css("display", "none")
        $("#answer-box").css("display", "none")
        $("#winner").css("display", "block")
        singlePlayer.player = 0;
        $p1score.text("0")
        questionsUsed.forEach(question => {
        questions.push(question)
        })
        questionsUsed = []
        singlePlayer.which = true;

        $("#winner").on("click", "button", () => {
            $("#winner").css("display", "none")
            $("#question").css("display", "block")
            $("#answer-box").css("display", "flex")
            $("canvas").remove()
        })
        setBoard()

    } else {

    // Getting a random question
    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q[randomIndex]

    // Update queston and answer choices
    $question.text(randomQuestion.question)
    $a.text(randomQuestion.a)
    $b.text(randomQuestion.b)
    $c.text(randomQuestion.c)
    $d.text(randomQuestion.d)

    // Update players scores
    $p1score.text(singlePlayer.player)

    $("#answer-box button").off()
    $("#answer-box button").on(("click"), () => {
        chooseAnswer(event, randomQuestion)
    })
    }

}

//Ajax pull for questions and answers
const $questions =  "https://cdn.contentful.com//spaces/hhvi6x8yrasq/environments/master/entries?access_token=aXH_Va8_h8i2YQbClCfZ8WXTkExDcfD2LfY6-ljS87Q&content_type=triviaQ"
$.ajax($questions)
.then((data) => {
    questions = data.items.map((q) => q.fields)
    console.log(data)
    console.log(questions)

    setBoard(questions)
})
})
});



//Multi Player start
$("#player-selection").on("click", ".multi", () => {
    $("#player-selection").css("display", "none")
    $("#start").css("display", "block")
$("#start").on("click", "button", () => {
    $("#start").css("display", "none")
    $("#turn").css("display", "block")
    $("#turn h1").text(`Player 1 Starts the game`)
    setTimeout(() => {
    state.which = true;
    $("#turn").css("display", "none")
    $("#question").css("display", "block")
    $("#answer-box").css("display", "flex")
    $(".counter").css("display", "block")
    $(".player1 h3").text(prompt("Enter name for player 1"))
    $(".player2 h3").text(prompt("Enter name for player 2"))
}, 2000)
});

//Function to check answers, add scores, and move questions from questions to questions used
const chooseAnswer = (event, question) => {
    console.log(event)
    if (event.target.innerText === question.answer) {
        if (state.which) {
            $(".correct").css("display", "block")
            setTimeout(() => {
                $(".correct").css("display", "none")
                state.player1++
                state.which = !state.which
                const value = questions.indexOf(question)
                questionsUsed.push(question)
                questions.splice(value, 1)
                setBoard(questions)
            }, 2000)
            
        } else {
            $(".correct").css("display", "block")
            setTimeout(() => {
                $(".correct").css("display", "none")
                state.player2++
                state.which = !state.which
                const value = questions.indexOf(question)
                questionsUsed.push(question)
                questions.splice(value, 1)
                setBoard(questions)
            }, 2000)

        }
    } else { 
        $(".incorrect").css("display", "block")
            setTimeout(() => {
                $(".incorrect").css("display", "none")
                state.which = !state.which
                const value = questions.indexOf(question)
                questionsUsed.push(question)
                questions.splice(value, 1)
                setBoard(questions)
            }, 2000)


    }
}


// Set board, random question, answers, and a winning restart function
const setBoard = (q) => {
    if (state.which) {
        $(".player2").css("border", "2px solid red")
        $(".player1").css("border", "4px solid green")
    } else {
        $(".player1").css("border", "2px solid red")
        $(".player2").css("border", "4px solid green")
    }
    $(".counter h2").text(questions.length)
    const name1 = $(".player1 h3").text().toUpperCase()
    const name2 = $(".player2 h3").text().toUpperCase()

    //Determines winning player and displays win screen with fireworks
    if(state.player1 === 10 || questions == 0 && state.player1 > state.player2) {
        $("#winner h1").text(`THE WINNER IS: ${name1}!!`)
        winnerScreen()

    } else if (state.player2 === 10 || questions == 0 && state.player1 < state.player2) {
        $("#winner h1").text(`THE WINNER IS: ${name2}!!`)
        winnerScreen()

    } else if (state.player1 === state.player2 && questions == 0) { 
        $("#winner h1").text(`IT WAS A TIE!!`)
        winnerScreen()
    } else {


    // Getting a random question
    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q[randomIndex]

    // Update queston and answer choices
    $question.text(randomQuestion.question)
    $a.text(randomQuestion.a)
    $b.text(randomQuestion.b)
    $c.text(randomQuestion.c)
    $d.text(randomQuestion.d)

    // Update players scores
    $p1score.text(state.player1)
    $p2score.text(state.player2)

    $("#answer-box button").off()
    $("#answer-box button").on(("click"), () => {
        chooseAnswer(event, randomQuestion)
    })
    }

}

//Ajax pull for questions and answers
const $questions =  "https://cdn.contentful.com//spaces/hhvi6x8yrasq/environments/master/entries?access_token=aXH_Va8_h8i2YQbClCfZ8WXTkExDcfD2LfY6-ljS87Q&content_type=triviaQ"
$.ajax($questions)
.then((data) => {
    questions = data.items.map((q) => q.fields)
    console.log(data)
    console.log(questions)

    setBoard(questions)
})
})

