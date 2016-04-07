// underscore template for 1st question page
var correctAnsw = 0;
var wrongAnsw = 0;


var questianPageTmpl1 = _.template('<div class="block-quastion"><h1>Розташуйте порядок планет від Сонця: </h1></div>\<div id="options" class="container-fluid  block-options"><div id="correct-answer"><p><b>ПРАВИЛЬНО</b></p></div><div id="wrong-answer"><p><b>НЕПРАВИЛЬНО</b></p></div><div class="target">\<div class="div1"><img src="./img/planet items/sun.png" width="80px" height="80px" ></div>\<div class="div1" id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"><span>1</span></div>\<div class="div1" id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"><span>2</span></div>\<div class="div1" id="div3" ondrop="drop(event)" ondragover="allowDrop(event)"><span>3</span></div>\<div class="div1" id="div4" ondrop="drop(event)" ondragover="allowDrop(event)"><span>4</span></div><div class="div1" id="div5" ondrop="drop(event)" ondragover="allowDrop(event)"><span>5</span></div><div class="div1" id="div6" ondrop="drop(event)" ondragover="allowDrop(event)"><span>6</span></div></div><div class="items"><div><span>Земля</span><br><span class="cor-answ">3</span><br><img id="drag1" src="img/planet items/earth.png" draggable="true" ondragstart="drag(event)" width="60px" height="60px" ></div>\<div><span>Меркурiй</span><br><span class="cor-answ">1</span><br><img id="drag2" src="img/planet items/Mercury.png" draggable="true" ondragstart="drag(event)" width="60px" height="60px" ></div>\<div><span>Марс</span><br><span class="cor-answ">4</span><br><img id="drag3" src="img/planet items/mars.jpg" draggable="true" ondragstart="drag(event)" width="60px" height="60px"></div>\<div><span>Венера</span><br><span class="cor-answ">2</span><br><img id="drag4" src="img/planet items/venus.png" draggable="true" ondragstart="drag(event)" width="60px" height="60px"></div><div><span>Юпiтер</span><br><span class="cor-answ">5</span><br><img id="drag5" src="img/planet items/jupiter.jpg" draggable="true" ondragstart="drag(event)" width="60px" height="60px"></div><div><span>Уран</span><br><span class="cor-answ">6</span><br><img id="drag6" src="img/planet items/uranus.png" draggable="true" ondragstart="drag(event)" width="60px" height="60px"></div><div><span>Плутон</span><br><span class="cor-answ">-/-</span><br><img id="drag7" src="img/planet items/Pluto.png" draggable="true" ondragstart="drag(event)" width="60px" height="60px"></div><div><span>Нептун</span><br><span class="cor-answ"> -/-</span><br><img id="drag8" src="img/planet items/neptuneink.png" draggable="true" ondragstart="drag(event)" width="60px" height="60px"></div><div><span>Мiсяць</span><br><span class="cor-answ"> -/-</span><br><img id="drag9" src="img/planet items/moon.jpg" draggable="true" ondragstart="drag(event)" width="60px" height="60px"></div></div>\</div><div class="button-set"><div class="next-button check"><a href="#" id="check1"><span>check</span></a></div><div class="next-button"><a href="#" id="next"><span>next</span></a></div></div>');
var resultHtml1 = questianPageTmpl1();
$('#simple-quiz').html(resultHtml1);

$('.cor-answ').hide();
$('#wrong-answer').hide();
$("#correct-answer").hide();




function fail(){
	$('#pic-map').hide();
	$('#pic-map2').show();
	$("#wrong-answer").show();
}


function success(){
	$("#correct-answer").show();
}


function allowDrop(ev) {				
		    ev.preventDefault();
		}

		function drag(ev) {
		    ev.dataTransfer.setData("text", ev.target.id);
		}

		function drop(ev) {
		    ev.preventDefault();
		    var data = ev.dataTransfer.getData("text");
		    ev.target.appendChild(document.getElementById(data));   
		}


		
//cheking of the answer to 1st question
		
$(".next-button #check1 span").click(function(){ 				//перевырка, чи елементи розсташовані в правильному порядку
    if ( ($("#drag2").parents("#div1").length == 1) && ($("#drag4").parents("#div2").length == 1) && ($("#drag1").parents("#div3").length == 1 ) && ($("#drag3").parents("#div4").length == 1) && ($("#drag5").parents("#div5").length == 1) && ($("#drag6").parents("#div6").length == 1)) { 

		$("#correct-answer").show();
		correctAnsw ++;

		} else {
			$('#wrong-answer').show();
			$('.cor-answ').show();
			wrongAnsw ++;
					  
		}
	});




var questianPageTmpl2; // underscore template for 2nd question page


$("#next").click(function(){ 
	
questianPageTmpl2 = _.template('<div class="block-quastion"><h1>Введіть назву планети згідно з описом:</h1></div>\<div id="options" class="block-options"> <div id="correct-answer"><p><b>ПРАВИЛЬНО</b></p></div><div id="wrong-answer"><p><b>НЕПРАВИЛЬНО</b></p></div><ul><li>Шоста за віддаленістю від Сонця та друга за розмірами планета Сонячної системи. </li>\<li>На відміну від Юпітера, смуги на Планеті доходять до дуже високих широт — 78 градусів.</li>\<li>Планета має помітну систему кілець, що складаються здебільшого з частинок криги, меншої кількості важких елементів і пилу. </li></ul>\</p>\<form role="form">\<div class="form-group">\<label for="comment">Відповідь:</label>\<textarea class="form-control" rows="3" id="comment"></textarea>\</div>\</form>\</div><div class="next-button"><a href="#" id="check2"><span>check</span></a></div><div class="next-button"><a href="#" id="next2"><span>next</span></a></div></div>');
var resultHtml2 = questianPageTmpl2();
$('#simple-quiz').html(resultHtml2);

$('#wrong-answer').hide();
$("#correct-answer").hide();


$(".next-button #check2 span").click(function(){ //Checking of answer to  2nd question

			var player_answer = $("textarea#comment").val();
		
			if(player_answer === 'Сатурн'){
				 
				$("#correct-answer").show();
				correctAnsw ++;

			}
			else{
				$('#wrong-answer').show();
				wrongAnsw ++;
				
				$("textarea#comment").val(' Правильна відповідь: Сатурн');
				$("textarea#comment").css('color','red');
			}
		
	});







	$("#next2").click(function(){

		// underscore template for 3rd question page

		var questianPageTmpl3 = _.template('<div class="block-quastion"><h1>Виберіть планету Юпітер</h1></div><div id="options" class="block-options"><div id="correct-answer"><p><b>ПРАВИЛЬНО</b></p></div><div id="wrong-answer"><p><b>НЕПРАВИЛЬНО</b></p></div><div id="pic-map2"><img src="img/planet items/planet-map-right-answer.jpg"   alt="Planets" ></div><div id="pic-map"><img src="img/planet items/planet-maps3.jpg"   alt="Planets" usemap="#planetmap"></div><map name="planetmap"><area shape="circle" coords="168,155,65" alt="merciry" onclick="fail()" ><area shape="circle" coords="419,142,80" alt="jupiter" onclick="success()"><area shape="circle" coords="235,249,50" alt="neptun" onclick="fail()"><area shape="circle" coords="373,252,50" alt="merciry" onclick="fail()" ></map><div class="next-button"><a href="#" id="next3"><span>next</span></a></div>');
		var resultHtml3 = questianPageTmpl3();
		$('#simple-quiz').html(resultHtml3);

		$("#pic-map2").hide();
		$("#correct-answer").hide();
		$("#wrong-answer").hide();


		

		$("#next3").click(function(){ // underscore template for 4th question page


				var questianPageTmpl4 = _.template('<div class="block-quastion"><h1>Відгадайте, хто з поданих космонавтів зображений як гравець в футбол: </h1></div><div id="options" class="block-options"><div id="correct-answer"><p><b>ПРАВИЛЬНО</b></p></div><div id="wrong-answer"><p><b>НЕПРАВИЛЬНО</b></p></div><div id="football-giff"><img src="./img/planet items/football.gif" alt="football" /></div>\<div class="cosmonauts"><ul>\<li id="akijama"><p>Тоехиро Акіяма</p><img src="./img/planet items/Akijama.jpg" alt="akijama" width="230px" height="150px" /></li>\<li id="armstrong"><p>Ніл Армстронг</p><img src="./img/planet items/armstrong.jpg" alt="armstrong"  width="230px" height="150px"/></li>\<li id="haharin"><p>Юрій Гагарін</p><img src="./img/planet items/haharin.jpg" alt="haharin"  width="230px" height="150px"/></li>\</ul></div></div><div class="next-button"><a href="#" id="next4"><span>next</span></a></div>');
				var resultHtml4 = questianPageTmpl4();
				$('#simple-quiz').html(resultHtml4);


				$("#correct-answer").hide();
				$("#wrong-answer").hide();


				//cheking answer #4
			
				$("#akijama").click(function(){

					$("#wrong-answer").show();
					$("#armstrong").css('background-color','#F78181')
					 wrongAnsw ++;
				});

				$("#armstrong").click(function(){
					
					$("#correct-answer").show();
					correctAnsw ++;
				});

				$("#haharin").click(function(){

					$("#wrong-answer").show();
					$("#armstrong").css('background-color','green')
				 	wrongAnsw ++;
				});





					$("#next4").click(function(){    // underscore template for 5th question page

						var questianPageTmpl5 = _.template('<div class="block-quastion"><h1>Розфарбуйте планети базовими кольорами:</h1></div><div id="options" class="block-options"><div id="correct-answer"><p><b>ПРАВИЛЬНО</b></p></div><div id="wrong-answer"><p><b>НЕПРАВИЛЬНО</b></p></div><div class="planet-shapes"><div id="uran"><p>Уран</p></div><div id="sunus"><p>Сонце</p></div><div id="earth"><p>Земля</p></div><div id="moon"><p>Місяць</p></div><div id="jupiterus"><p>Юпітер</p></div></div><div class="color-scheme"><div id="blue"></div><div id="red"></div><div id="brown"></div><div id="green"></div><div id="yellow"></div><div id="grey"></div></div></div><div class="next-button"><a href="#" id="check5"><span>check</span></a></div><div class="next-button"><a href="#" id="finish"><span>Finish</span></a></div>');
						var resultHtml5 = questianPageTmpl5();
						$('#simple-quiz').html(resultHtml5);

						$("#correct-answer").hide();
						$("#wrong-answer").hide();


						var flag=0;

						$("#blue").click(function(){
							
							flag=1;

						});

						$("#red").click(function(){
							flag = 2;

						});

						$("#brown").click(function(){
							flag=3;

						});

						$("#green").click(function(){
							flag=4;

						});

						$("#yellow").click(function(){
							flag=5;

						});

						$("#grey").click(function(){
							flag=6;

						});



						$(".planet-shapes div").click(function(){
							
							
							switch (flag) {
							  case 1:
							  	
							    $(this).css("background-color", "#00BFFF");
							    break;
							  case 2:

							    $(this).css("background-color", "#DF0101");
							     break;
							  case 3:

								$(this).css("background-color", "brown");
								 break;
							  case 4:

							    $(this).css("background-color", "green");
							     break;
							  case 5:

							  	$(this).css("background-color", "#FFBF00");
					 			break;

					 			case 6:
					 			$(this).css("background-color", "grey");
					 			break;

							  default:

							    alert('Ви не вибрали колір')
							     break;

							}

						});


						//cheking;

						$(".next-button #check5 span").click(function(){

							 var color1 = $('#uran').css( "background-color" );
							 var color2 = $('#sunus').css( "background-color" );
							 var color3 = $('#earth').css( "background-color" );
							 var color4 = $('#moon').css( "background-color" );
							 var color5 = $('#jupiterus').css( "background-color" );

							 if((color1 == '#00BFFF') && (color2 == '#FFBF00') && (color3 == 'green') && (color4 == 'grey') && (color5 == '#DF0101')){
							 	
							 	$("#correct-answer").show();
							 	correctAnsw ++;
							 }
							 else{
							 	
							 	$("#wrong-answer").show();
							 	 wrongAnsw ++;
							 }


							 
 
						});	

						$(".next-button #finish span").click(function(){
							 	var questianPageTmpl6 = _.template('<div id="options" class="block-options" ><h1>Кiнець</h1></div>');
								var resultHtml6 = questianPageTmpl6();
								$('#simple-quiz').html(resultHtml6);


							 });

				});
	
			});
	
	});

});



