//***************** */
//  App state
//***************** */
const state = {
    player1: 0,
    player2: 0,
    which: true
}
const restart = () => {
    state.player1 = 0;
    state.player2 = 0;
}

let questions = [];

//****************** */H
//  Main Dom Element
//****************** */13. In the Impel Down Arc, how many prisoners escape with Luffy?
//112 157 217 241

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

$("#start").on("click", ($startBtn) => {
    state.which = true
    $("#start").css("display", "none")
    $("#question").css("display", "block")
    $("#answer-box").css("display", "flex")
    $(".player1 h3").text(prompt("Enter name for player 1"))
    $(".player2 h3").text(prompt("Enter name for player 2"))
})


const chooseAnswer = (event, question) => {
    console.log(event)
    if (event.target.innerText === question.answer) {
        if (state.which) {
            state.player1++
            state.which = !state.which
        } else {
            state.player2++
            state.which = !state.which
        }
        setBoard(questions)
    } else { 
        setBoard(questions)
        state.which = !state.which
    }
}

const setBoard = (q) => {
const name1 = $(".player1 h3").text().toUpperCase()
const name2 = $(".player2 h3").text().toUpperCase()
    if(state.player1 === 10) {
        $("#container").fireworks({
            //   sound:true,// sound effect
            });
        state.player1++
        $("#question").css("display", "none")
        $("#answer-box").css("display", "none")
        $("#winner").css("display", "block")
        $("#winner h1").text(`THE WINNER IS: ${name1}!!`)
        restart()
        $("#winner").on("click", ($playAgain) => {
            state.which = true
            $("#winner").css("display", "none")
            $("#question").css("display", "block")
            $("#answer-box").css("display", "flex")
            $("canvas").remove()
        })
        setBoard()
    } else if (state.player2 === 10) {
        $("#container").fireworks({
            //   sound:true,// sound effect
            });
        state.player2++
        $("#question").css("display", "none")
        $("#answer-box").css("display", "none")
        $("#winner").css("display", "block")
        $("#winner h1").text(`THE WINNER IS: ${name2}!!`)
        restart()
        $("#winner").on("click", ($playAgain) => {
            state.which = true
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
    $p1score.text(state.player1)
    $p2score.text(state.player2)

    $("button").off()
    $("button").on(("click"), () => {
        chooseAnswer(event, randomQuestion)
    })
    }

}



const $questions =  "https://cdn.contentful.com//spaces/hhvi6x8yrasq/environments/master/entries?access_token=aXH_Va8_h8i2YQbClCfZ8WXTkExDcfD2LfY6-ljS87Q&content_type=triviaQ"
$.ajax($questions)
.then((data) => {
    questions = data.items.map((q) => q.fields)
    console.log(data)
    console.log(questions)

    setBoard(questions)
})

