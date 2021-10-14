//***************** */
//  App state
//***************** */

//Players beginning state
const state = {
    player1: 0,
    player2: 0,
    which: true
}

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
}

// Questions
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


// Starts game when "START" is clicked
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


// Function for answeres 
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
    if(state.player1 === 2 || questions == 0 && state.player1 > state.player2) {
        $("#winner h1").text(`THE WINNER IS: ${name1}!!`)
        winnerScreen()

    } else if (state.player2 === 2 || questions == 0 && state.player1 < state.player2) {
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


// Build question list with API using ajax
const $questions =  "https://cdn.contentful.com//spaces/hhvi6x8yrasq/environments/master/entries?access_token=aXH_Va8_h8i2YQbClCfZ8WXTkExDcfD2LfY6-ljS87Q&content_type=triviaQ"
$.ajax($questions)
.then((data) => {
    questions = data.items.map((q) => q.fields)
    console.log(data)
    console.log(questions)

    setBoard(questions)
})

