const questions=[
    {
        question: "what is your biggest dream?",
        answers:[{text: "Doctor", correct:"false"},{text:"Teacher",correct:"false"},{text:"Baap ki dukan sambhalna",correct:"false"},{text:"Andha Paisa",correct:"true"}]
    },
    {
        question: "what is your biggest lie?",
        answers:[{text: "maine nhi kiya", correct:"false"},{text:"mai nhi gaya tha",correct:"false"},{text:"kl se padhenge",correct:"true"},{text:"kl se healthy khana",correct:"false"}]
    },
    {
        question: "which is the smallest continent in the world?",
        answers:[{text: "Asia", correct:"false"},{text:"Australia",correct:"true"},{text:"Arctic",correct:"false"},{text:"Africa",correct:"false"}]
    }
];
const questionElement =document.getElementById("question");
const answerButtons =document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");
let currentQuestionIndex=0;
let score=0;
function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQestion=questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQestion.question;
    currentQestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML =answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}
function selectAnswer(e)
{
const selectedBtn=e.target;
const isCorrect =selectedBtn.dataset.correct==="true";
if(isCorrect)
{
    selectedBtn.classList.add("correct");
    score++;
}
else{
    selectedBtn.classList.add("incorrect");
}
Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.correct==="true")
    {
        button.classList.add("correct");
    }
    button.disabled=true;
});
nextButton.style.display="Block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length)
    {
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();