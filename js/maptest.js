$.when(
  $.getJSON(quizData), // get json with quastions
  $.get("templ/map-test-quastions.html"), // get template with quastions page
  $.ajax("templ/map-test-final.html") // get template with final page
  )
  .then(renderPage)
  .fail(function(){console.log("Error");
});


function renderPage(DataRequest, qTmplRequest, finTmplRequest) {

  var quastions = DataRequest[0]; // data from parsed JSON
  var qTmpl = qTmplRequest[0];  // template with quastions page
  var finTmpl = finTmplRequest[0];  // template with final page

  var simpleQuiz = $('#simple-quiz'); // container for rendered info
  var quastionCounter = 0; // number of current quastion
  var correctAnswers = 0; //counter of the correct answers
  var totalKmFault = 0;
  var choiceCounter = 0;

  var quastionPageTmpl = _.template(qTmpl);  // underscore template for quastion page
  var finalnPageTmpl = _.template(finTmpl);  // underscore template for final page

  // render function for quastion page
  function renderQuastionPage(template, arr, index) {
    var info = template({
                        quastion: arr[index].quastion,
                        map: arr[index].map
                       });
    $('#simple-quiz').html(info);
  }

  // render function for final page
  function renderFinalPage(template, arr) {
    var info = template({ 
                        result: correctAnswers,
                        totalQuastion: arr.length,
                        percent: Math.round(correctAnswers / quastions.length * 100),
                        avarageKm: calcAvarageKm()
                       });
    $('#simple-quiz').html(info);
  }

  function calcAvarageKm() {
    if (totalKmFault === 0) {
      return 0;
    };
    return Math.round(totalKmFault / choiceCounter)
  }


  function getClickPosition(event) {
    var x = event.offsetX/ $(this).width() * 100;
    var y = event.offsetY/ $(this).height() * 100;
    checkResult(x, y);
    $( "#simple-quiz").undelegate( '#map', 'click', getClickPosition);
  }

  function checkResult(userX, userY) {
    var correctX = quastions[quastionCounter].correct[0];
    var correctY = quastions[quastionCounter].correct[1];
    choiceCounter++;
    var acceptedX = userX < correctX + 2.6 && userX > correctX - 2.6;
    var acceptedY = userY < correctY + 2.6 && userY > correctY - 2.6;

    $('#map').append('<div class="location"></div>' );
    $('.location').css({"left": correctX+"%", "top": correctY+"%"});

    if (acceptedX && acceptedY) {
      $('#map').append('<div class="info info-true">Правильна відповідь</div>')
      correctAnswers++;
    } else {
      var distancePerc = Math.sqrt((userX - correctX) * (userX - correctX) + (userY - correctY) * (userY - correctY));
      var distanceKm = Math.round(distancePerc * quastions[quastionCounter].scale);
      $('#map').append('<div class="info info-false"> Ви помилились на ' + distanceKm + ' км</div>' );
      totalKmFault += distanceKm;
    };
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
  $( "#simple-quiz").undelegate( '#map', 'click', getClickPosition);
    quastionCounter++;
    if (quastionCounter < quastions.length) {
      renderQuastionPage(quastionPageTmpl, quastions, quastionCounter);
    } else {
      renderFinalPage(finalnPageTmpl, quastions);
      renderBar()
    }
    $( "#simple-quiz").delegate( '#map', 'click', getClickPosition);
  }

  // map click event
  $( "#simple-quiz").delegate( '#map', 'click', getClickPosition);
  // next button event
  $( "#simple-quiz").delegate( ".next-button", 'click', nextPageEvent);

  renderQuastionPage(quastionPageTmpl, quastions, quastionCounter);
}