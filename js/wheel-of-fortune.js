$.when(
  $.getJSON(quizData), // get json with quastions
  $.get("templ/wheel-of-fortune-quastions.html"), // get template with quastions page
  $.get("templ/wheel-of-fortune-final.html") // get template with final page
  )
  .then(renderPage)
  .fail(function(){console.log("Error");
});


function renderPage(DataRequest, qTmplRequest, finTmplRequest) {

  var quastions = DataRequest[0][0]; // data from parsed JSON
  var analytics = DataRequest[0][1]; // analytics from parsed JSON
  var qTmpl = qTmplRequest[0];  // template with quastions page
  var finTmpl = finTmplRequest[0];  // template with final page

  var simpleQuiz = $('#simple-quiz'); // container for rendered info
  var quastionCounter = 0; // number of current quastion
  var correctAnswers = 0; // number of current aswers
  var hints = 0; // total number of letter hints
  var currentHints = 0; // number of letter hints on current word

  var quastionPageTmpl = _.template(qTmpl); // underscore template for quastion page
  var finalnPageTmpl = _.template(finTmpl); // underscore template for final page

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
                         usedHints: hints,
                         percent: Math.round(correctAnswers / quastions.length * 100),
                         summary: getSummary()
                       });
    $('#simple-quiz').html(info);
  };

  function getSummary() {
    var percentage = Math.round(correctAnswers / quastions.length * 100);
    switch (true) {
      case (percentage < 25):
        return analytics[0]
        break
      case (percentage < 50):
        return analytics[1]
        break
      case (percentage < 75):
        return analytics[2]
        break
      default:
        return analytics[3]
    }

  }

  function renderBar() {
    console.log(5);
    var percent = Math.round(correctAnswers / quastions.length * 100);
    console.log(percent)
    $(".prog-result").width(percent + "%");
    $(".percent").css("margin-top", 0 + "px");
  }

  // event function when click next button
  function nextPageEvent() {
    quastionCounter++;
    if (quastionCounter < quastions.length) {
      renderQuastionPage(quastionPageTmpl, quastions, quastionCounter);
    } else {
      renderFinalPage(finalnPageTmpl, quastions);
      renderBar();
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
}