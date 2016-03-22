// List of quastions 
var quastions = [{
  quastion: 'З якого міста походить The Beatles?',
  option: ['Манчестер', 
           'Ліверпуль', 
           'Лондон', 
           'Оксфорд'],
  correct: 1
}, {
  quastion: 'Як називався дебютний студійний альбом "ліверпульської четвірки"?',
  option: ['Please Please Me', 
           'A Hard Day’s Night', 
           'Rubber Soul', 
           'Sgt. Pepper’s Lonely Hearts Club Band'],
  correct: 0
}, {
  quastion: 'У якому році було створено гурт The Beatles',
  option: ['1950', 
           '1954', 
           '1960', 
           '1971'],
  correct: 2
}, {
  quastion: 'Хто приєднався до The Beatles тільки у 1962р?',
  option: ['Джон Леннон', 
           'Пол Маккартні', 
           'Джордж Гаррісон', 
           'Рінго Стар'],
  correct: 3
}, {
  quastion: 'Як називався перший фільм за участю The Beatles?',
  option: ['Британське вторгнення', 
           'Ліверпульська історія', 
           'Вечір важкого дня', 
           'Револьвер'],
  correct: 2
}, {
  quastion: 'Хто написав більшість пісень із репертуару гурту?',
  option: ['Джон Леннон і Пол Маккартні', 
           'Пол Маккартні і Джордж Гаррісон', 
           'Рінго Стар і Джордж Гаррісон', 
           'Рінго Стар і Джон Леннон'],
  correct: 0
}, {
  quastion: 'Якою була робоча назва пісні "Yesterday" авторства Пола Маккартні?',
  option: ['Завтра', 
           'Яєчня', 
           'Початок', 
           'Гідрант'],
  correct: 1
}];


var quastionCounter = 0; // number of current quastion
var simpleQuiz = $('#simple-quiz'); // container for rendered info
var correctAnswers = 0; //counter of the correct answers

// underscore template for quastion page
var questianPageTmpl = _.template('<div class="block-quastion"><h1><%= quastion %></h1></div>\
<div id="options" class="block-options"><ul>\
<% _.each(options, function(option, iterator)\
{%> <li id=<%= iterator %>> <span class="glyphicon glyphicon-unchecked"></span> <%= option %></li> <%})%>\
</ul></div><div class="next-button"><a href="#"><span>next</span></a></div>');

// underscore template for final page
var finalnPageTmpl = _.template('<div class="final-info"><span>Ви дали <%= result %> з <%= totalQuastion %> правильних відповідей</span></div><div class="next-button"><a href="index.html"><span>back to main page</span></a></div>');





// render function for quastion page
function renderQuastionPage(template, arr, index) {
  var info = template({quastion: arr[index].quastion, options: arr[index].option});
  $('#simple-quiz').html(info);
};


// render function for quastion page
function renderFinalPage(template, arr) {
  var info = template({result: correctAnswers, totalQuastion: arr.length});
  $('#simple-quiz').html(info);
};




// event function when click option
function optionChooseEvent() {

  var optionId = ( ($(this).attr('id')) ); // ID that is clicked on

 if (optionId == quastions[quastionCounter].correct) {
    $(this).addClass('option-correct'); //make it green
    $(this).children().removeClass('glyphicon-unchecked').addClass('glyphicon-ok') //change icon;
    $(this).siblings().addClass('option-not-active'); //make other options not active
    correctAnswers++;
    console.log(correctAnswers);
  } else {
    $(this).addClass('option-wrong');
    $(this).siblings().addClass('option-not-active'); //make other options not active
    $(this).children().removeClass('glyphicon-unchecked').addClass('glyphicon-remove')
    $("#" + quastions[quastionCounter].correct).removeClass('option-not-active').addClass('option-correct'); //make it green
    $("#" + quastions[quastionCounter].correct).children().removeClass('glyphicon-unchecked').addClass('glyphicon-ok');
  }

  $( "#simple-quiz").undelegate( '#options li', 'click', optionChooseEvent); //undelegate event
}


// event function when click next button
function nextPageEvent() {
  quastionCounter++;
  if (quastionCounter < quastions.length) {
    // delegate click event each time new page is loaded
    $( "#simple-quiz").delegate( '#options li', 'click', optionChooseEvent);
    //simpleQuiz.html(''); // if add this one we receive empty table at the end 
    renderQuastionPage(questianPageTmpl, quastions, quastionCounter);
  } else {
    renderFinalPage(finalnPageTmpl, quastions)
  };

}




// choose option event
$( "#simple-quiz").delegate( '#options li', 'click', optionChooseEvent);
// next button event
$( "#simple-quiz").delegate( ".next-button", 'click', nextPageEvent);








renderQuastionPage(questianPageTmpl, quastions, quastionCounter)


/*
var currentQuastion = 0;
var correctAnswers = 0;

// container for quiz
var simpleQuiz = $('#simple-quiz');



// creating quastion
function createQuastion(arr, index) {
  var quastion = ('<div class="block-quastion"><h1>' +
                  arr[index].quastion   +
                  '</h1></div>');
  simpleQuiz.append(quastion);
}


// creating options to quastion
function createOptions(arr, index) {
  var optBlock = $('<div>', {id: 'options', class: 'block-options'});
  var optList = $('<ul>');

  for (var i = 0; i < arr[index].option.length; i++) {
    //console.log(arr[index].option[i]);
    var item = $('<li>', {id: i}); //each li has an id of current element in arr
    var info = '<span class="glyphicon glyphicon-unchecked"></span>' + arr[index].option[i];
    item.append(info);
    optList.append(item);
    optBlock.append(optList);
    simpleQuiz.append(optBlock);
  };
}

// creating button
function createButton() {
  var button = $('<div>', {class: 'next-button'});
  var info = '<a href="#"><span>next</span></a>';
  button.append(info)
  simpleQuiz.append(button);
}

// creating button
function createFinal() {
  var optBlock = $('<div>', {class: 'final-info'});
  var statistic = $('<div>', {class: 'statistic'});
  var stInfo = '<span>You gave ' + correctAnswers + ' from ' + quastions.length + ' correct answers</span>'
  var button = $('<div>', {class: 'next-button'});
  var info = '<a href="#"><span>back to main page</span></a>';
  button.append(info)
  statistic.append(stInfo);
  optBlock.append(stInfo);
  simpleQuiz.append(optBlock);
  simpleQuiz.append(button);
}



function renderPage(arr) {
  if (currentQuastion < quastions.length) {
    createQuastion(quastions, currentQuastion);
    createOptions(quastions, currentQuastion);
    createButton();
    currentQuastion++;
  } else {
    createFinal();
  };

}

renderPage(quastions);







$( "#simple-quiz").delegate( ".next-button", 'click', function() {
  simpleQuiz.html('');
  renderPage(currentQuastion);
});




$( "#simple-quiz").delegate( '#options li', 'click', function() {

  var optionId = ( ($(this).attr('id')) ); // clicked Id

 if (optionId == quastions[currentQuastion-1].correct) {
    $(this).css("background-color", "#71E08B");
    $(this).children().removeClass('glyphicon-unchecked').addClass('glyphicon-ok');
    $('#3').off('hover');
    correctAnswers++;
  } else {
    $(this).children().removeClass('glyphicon-unchecked').addClass('glyphicon-remove')
    $(this).css("background-color", "#E07171");
    $("#" + quastions[currentQuastion-1].correct).css("background-color", "#71E08B");
    $("#" + quastions[currentQuastion-1].correct).children().removeClass('glyphicon-unchecked').addClass('glyphicon-ok');
  }
});














/*




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



