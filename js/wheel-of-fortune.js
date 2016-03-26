// List of quastions 
var quastions = [{
  quastion: 'Основний літературний твір ірландського письменника Джеймса Джойса',
  answer: 'Улісс'
}, {
  quastion: 'Яке прізвище автора казки "Маленький принц"?',
  answer: 'Екзюпері'
}, {
  quastion: 'Країна, у якій народився відомий письменник та поет Хорхе Луїс Борхес?',
  answer: 'Аргентина'
}, {
  quastion: 'Як звати хлопця від імені якого ведеться розповідь у романі "Мобі Дік" Германа Мелвілла?',
  answer: 'Ізмаїл'
}, {
  quastion: 'За чиїм романом було знято фільм "Втеча з Шоушенку"?',
  answer: 'Кінг'
}];

var simpleQuiz = $('#simple-quiz'); // container for rendered info
var quastionCounter = 0; // number of current quastion
var correctAnswers = 0; // number of current aswers
var hints = 0; // total number of letter hints
var currentHints = 0; // number of letter hints on current word


// underscore template for quastion page
var quastionPageTmpl = _.template('<div class="block-quastion"><h1><%= quastion %></h1></div>\
  <div id="options" class="block-options"><div class="block-letters">\
  <% _.each(answ, function(option, iterator)\
  {%> <div class="card-wrap"><div id="card" class="card-block"><div class="front-side">?</div><div class="back-side"><%= option %></div></div></div> <%})%>\
  </div><div class="form-group wheel-answer"><input type="text" class="form-control check-answer" placeholder="answer"></div>\
  </div><div class="next-button"><a href="#"><span>next</span></a></div>');

// underscore template for final page
var finalnPageTmpl = _.template('<div class="final-info"><span>Ви дали <%= result %> з <%= totalQuastion %> правильних відповідей і скористались <%= usedHints %> підказками</span></div><div class="next-button"><a href="index.html"><span>back to main page</span></a></div>');


// render function for quastion page
function renderQuastionPage(template, arr, index) {
  var info = template({
                       quastion: arr[index].quastion,
                       answ: arr[index].answer.toUpperCase().split("")
                     });
  $('#simple-quiz').html(info);
};

// render function for final page
function renderFinalPage(template, arr) {
  var info = template({
                       result: correctAnswers,
                       totalQuastion: arr.length,
                       usedHints: hints
                     });
  $('#simple-quiz').html(info);
};

// event function when click next button
function nextPageEvent() {
  quastionCounter++;
  if (quastionCounter < quastions.length) {
    renderQuastionPage(quastionPageTmpl, quastions, quastionCounter);
  } else {
    renderFinalPage(finalnPageTmpl, quastions)
  };
  currentHints = 0;
}

// rotate the card with hide letter
function flipCardEvent() {
  hints++;
  currentHints++;
  if (currentHints == quastions[quastionCounter].answer.split("").length) {
    $("input.check-answer").prop('disabled', true);
  };
  $( this ).parent().toggleClass('flipped');
}

// check answer
function checkAnswerEvent(e) {
      if (e.keyCode == 13) {
          $('.card-block').addClass('flipped');
          checkCorrect();
      }
      $(this).undelegate( 'input.check-answer', 'keyup', checkAnswerEvent );
}

//check if answer is correct
function checkCorrect() {
  var userAnsw = $('input.check-answer').val().toUpperCase();
  var correctAnsw = quastions[quastionCounter].answer.toUpperCase();
  $("input.check-answer").prop('disabled', true);
  if (userAnsw === correctAnsw) {
    correctAnswers++;
    $('input.check-answer').addClass('correct-answer');
  } else {
    $('input.check-answer').addClass('wrong-answer');
  };
}


// next button event
$( "#simple-quiz").delegate( ".next-button", 'click', nextPageEvent);

// flip card event
$( "#simple-quiz").delegate( '.front-side', 'click', flipCardEvent );

// check if the aswer is corect event
$( "#simple-quiz").delegate( 'input.check-answer', 'keyup', checkAnswerEvent );

// render page
renderQuastionPage(quastionPageTmpl, quastions, quastionCounter);