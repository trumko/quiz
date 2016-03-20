
// List of quastions 
var quastions = [{
  quastion: "What is the result of 2 + 2?",
  option: [1, 4, 8, 12],
  correct: 1
}, {
  quastion: "3 + 4",
  option: [3, 5, 7, 12],
  correct: 2
}, {
  quastion: "20 + 11",
  option: [25, 28, 30, 31],
  correct: 3
}]

/*
// container for quiz
var simpleQuiz = $('#simple-quiz');



function createOption(index) {
  return quastions[0].option[index];
}

var temp = createOption(0);
console.log(temp)



//   simpleQuiz.html(quastions[1].answers[2])

function renderAnswers() {
  simpleQuiz.append(
    '<input type="radio" name="gender" value="male"> ' + temp + '<br>' +
    '<input type="radio" name="gender" value="male"> ' + quastions[0].option[1] + '<br>' +
    '<input type="radio" name="gender" value="male"> ' + quastions[0].option[2] + '<br>' +
    '<input type="radio" name="gender" value="male"> ' + quastions[0].option[3] + '<br>'
    );
}

function renderQuastion() {
  simpleQuiz.append(
    '<h1>' + quastions[0].quastion + '</h1>'
    );
}

renderAnswers();
renderQuastion();
*/

$( "#options li" ).click(function() {
  var optionId = ( ($(this).attr('id')) );
  console.log(optionId);
  console.log(optionId == quastions[0].correct )
});