// List of quastions 
var quastions = [{
  quastion: 'З якого міста походить The Beatles?',
  answer: 'Ліверпуль'
}, {
  quastion: 'Наступне запитання?',
  answer: 'Віддь'
}];

var quastionCounter = 0; // number of current quastion
var simpleQuiz = $('#simple-quiz'); // container for rendered info
var correctAnswers = 0;
var hints = 0;

// underscore template for quastion page
var questianPageTmpl = _.template('<div class="block-quastion"><h1><%= quastion %></h1></div>\
  <div id="options" class="block-options"><div class="block-letters">\
  <% _.each(answ, function(option, iterator)\
  {%> <div class="card-wrap"><div id="card" class="card-block"><div class="front-side">?</div><div class="back-side"><%= option %></div></div></div> <%})%>\
  </div><div class="form-group wheel-answer"><input type="text" class="form-control check-answer" placeholder="answer"></div>\
  </div><div class="next-button"><a href="#"><span>next</span></a></div>');


// underscore template for final page
var finalnPageTmpl = _.template('<div class="final-info"><span>Ви дали <%= result %> з <%= totalQuastion %> правильних відповідей і скористались <%= usedHints %> підказками</span></div><div class="next-button"><a href="index.html"><span>back to main page</span></a></div>');



// render function for quastion page
function renderQuastionPage(template, arr, index) {
  var info = template({quastion: arr[index].quastion, answ: arr[index].answer.toUpperCase().split("")});
  $('#simple-quiz').html(info);
};




// render function for quastion page
function renderFinalPage(template, arr) {
  var info = template({result: correctAnswers, totalQuastion: arr.length, usedHints: hints});
  $('#simple-quiz').html(info);
};

renderQuastionPage(questianPageTmpl, quastions, quastionCounter);

// event function when click next button
function nextPageEvent() {
  quastionCounter++;
  if (quastionCounter < quastions.length) {
    renderQuastionPage(questianPageTmpl, quastions, quastionCounter);
  } else {
    renderFinalPage(finalnPageTmpl, quastions)
  };

}
// next button event
$( "#simple-quiz").delegate( ".next-button", 'click', nextPageEvent);





function flipCard() {
  hints++;
  $( this ).parent().toggleClass('flipped');
}

function checkAnswer(e) {
      if (e.keyCode == 13) {
          $('.card-block').addClass('flipped');
          checkCorrect();
      }
      $(this).undelegate( 'input.check-answer', 'keyup', checkAnswer );
}

//chech if answer is correct
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









// flip card
$( "#simple-quiz").delegate( '.front-side', 'click', flipCard );
$( "#simple-quiz").delegate( 'input.check-answer', 'keyup', checkAnswer );


// toggle black card when onclick
/*$('.front-side').click(function(){
    $( this ).parent().toggleClass('flipped');
});*/

/*
$('.block-quastion').click(function(){
  $('.card-block').addClass('flipped');
});
*/

// toggle black cards when enter a word in input
/*
$('input.check-answer').keyup(function (e) {
    if (e.keyCode == 13) {
        $('.card-block').addClass('flipped');
        $('input.check-answer').addClass('correct-answer');
    }
})
*/