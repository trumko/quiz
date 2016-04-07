//wrap XMLHttpRequest in Promise
function getData (url){
	return new Promise(function(recall, reject){
		var request = new XMLHttpRequest();
		request.open('GET', url);
		if (url.match(/\.json$/igm)) request.responseType = 'json';
		request.onreadystatechange = function(){
			if (request.readyState != 4) return;
			if (request.status != 200){
				reject(new Error('Couldn\'t load at: ' + url + ' : ' +  request.statusText));
			}
		};
		request.onload = function(){
			var response =  (url.match(/\.json$/igm)) ? request.response : request.responseText;
			recall(response);
		};
		request.send();
	});
}

//Object for storing data
var key = {
		count:0,//index for question
		score:0,//correct answers
		try:1,//tries controller
};

//function for generating the pae
function generator (array, counter){

//render of the received template and json file
	key.allObjects = array;//store received array of responses in object key for further using
	var allObjects = key.allObjects[0];//asign to allObjects the second call - *.json fle 
	var tmpl = key.tmpl = _.template(array[1]);//store template in object key 
	var instance = allObjects[counter]; //receive bjects from json go further with each next button push
	if (!instance){//if there are no objects to generate question variants - then built finish template
		tmpl = _.template(key.allObjects[2]);
	}

	$('.question').html(tmpl({instance: instance}));

//pick a correct/incorrect answer
	$('.variants').children().each(function(){
		$(this).click(function(){
			if(key.try){//firstly try when key.try is not used
				if($(this).index() == instance.correct){//comparing chsen variant with correct indicator in the .json nstance 
					$(this).addClass('correct');//green color for correct variant
					key.score++;//increasing poits for correct anwer nd storing in the key.score
					if(key.try > 0) key.try--;//reset key.try - choice is made
					$('.score').text('вірно: ' + key.score);
				}else{
					$(this).addClass('incorrect');//red color for incorrect
					if(key.try > 0) key.try--;//reset try - choice is made
				}
			}
		});
	});

//next button
	$('.next').click(function(){
		key.count += 1;//increase counter
		generator(key.allObjects, key.count);//rebuild the page
		$('.variants').children().each(function(){
			$(this).removeClass('');//change back the backgrounds
		});
		if(key.try<1) key.try++;
	});

}

Promise.all([//collect all data with ajax 
	getData('api/guessPicture.json'),
	getData('templ/guessPicture.html'),
	getData('templ/guessPicture-finish.html')

]).then(function(arrayOfResponses){
	generator(arrayOfResponses, key.count);//then run buidler

}).catch(function(err){
	console.log(err);//notify if error
});





