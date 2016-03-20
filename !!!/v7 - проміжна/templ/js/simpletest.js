// List of quastions 
var quastions = [{
  quastion: 'What is the result of "2 + 2"?',
  option: ['Correct answer is: 1', 
           'Correct answer is: 4', 
           'Correct answer is: 8', 
           'Correct answer is: 12'],
  correct: 1
}, {
  quastion: 'What is the result of "3 + 4"?',
  option: ['Correct answer is: 3', 
           'Correct answer is: 5', 
           'Correct answer is: 7', 
           'Correct answer is: 12'],
  correct: 2
}, {
  quastion: 'What is the result of "20 + 11"?',
  option: ['Correct answer is: 31', 
           'Correct answer is: 58', 
           'Correct answer is: 60', 
           'Correct answer is: 71'],
  correct: 0
}];

console.log(123);


var h1 = _.template('<div class="block-quastion"><h1><%= name %></h1></div>\
<div id="options" class="block-options"><ul>\
<% _.each(quastions[0].option, function(option, iterator){%> <li id=<%= iterator %>> <span class="glyphicon glyphicon-unchecked"></span> <%= option %></li> <%})%>\
</ul></div>\
<div class="next-button"><a href="#"<span>next</span></a></div>');
var info = h1({name: quastions[0].quastion});
$('#simple-quiz').append(info)





/*
var h1 = _.template('<div class="block-quastion"><h1><%= name %></h1></div>');
var info = h1({name: quastions[0].quastion});
$('#simple-quiz').append(info)



for (var i = 0; i < quastions[0].option.length; i++) {
  var li = _.template('<div class="block-quastion"><h1><%= name %></h1></div>');
  var info = li({name: quastions[0].option[i]});
  $('#simple-quiz').append(info)
};


var h1 = _.template('<div class="block-quastion"><h1><%= name %></h1></div> <% _.each(quastions[0].option, alert)%>');
var info = h1({name: quastions[0].quastion});
$('#simple-quiz').append(info)











*/