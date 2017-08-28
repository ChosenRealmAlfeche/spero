var questions = [   ["I like to work on cars","R"],
					["I like to build things","R"],
					["I like to take care of animals","R"],
					["I like putting things together or assembling things","R"],
					["I like to cook","R"],
					["I am a practical person","R"],
					["I like working outdoors","R"],
					["I like to do puzzles","I"],
					["I like to do experiments","I"],
					["I enjoy science","I"],
					["I enjoy trying to figure out how things work","I"],
					["I like to analyze things (problems/situations)","I"],
					["I like working with numbers or charts","I"],
					["I am good at math","I"],
					["I am good at working independently","A"],
					["I like to read about art and music","A"],
					["I enjoy creative writing","A"],
					["I am a creative person","A"],
					["I like to play instruments or sing","A"],
					["I like acting in plays","A"],
					["I like to draw","A"],
					["I like to work in teams","S"],
					["I like to teach or train people","S"],
					["I like trying to help people solve their problems","S"],
					["I am interested in healing people","S"],
					["I enjoy learning about other cultures","S"],
					["I like to get into discussions about issues","S"],
					["I like helping people","S"],
					["I am an ambitious person. I set goals for myself","E"],
					["I like to try to influence or persuade people","E"],
					["I like selling things","E"],
					["I am quick to take on new responsibilities","E"],
					["I would like to start my own business","E"],
					["I like to lead","E"],
					["I like to give speeches","E"],
					["I like to organize things (files, desks/offices)","C"],
					["I like to have clear instructions to follow","C"],
					["I wouldn’t mind working 8 hours per day in an office","C"],
					["I pay attention to details","C"],
					["I like to do filing or typing","C"],
					["I am good at keeping records of my work","C"],
					["I would like to work in an office","C"]
				  ];
var Letter = "C";
var Score = { R : 0 , I : 0 , A : 0 , S : 0 , E : 0 , C : 0 };
var result = { resultTracks : ["STEM","ArtsDesign","Sports","HUMSS","ABM","GAS"] };

function loadQuestion(state){
	Score[Letter] += parseInt(state);
	if(questions.length >= 1){
		var index = Math.floor(Math.random()*questions.length);
		var question = questions[index];
		questions.splice(index, 1);
		$(".talktext").find("b").text(question[0]);
		Letter = question[1];
		
	}else{
		// var array=[];
		// for(a in Score){
		//  array.push([a,Score[a]]);
		// }
		// array.sort(function(a,b){return a[1] - b[1]});
		// array.reverse();
		storeDataLocal();
		window.location = "home.html";
		// alert("RIASEC Score: \n"+array[0][0]+" "+array[0][1]+
		// 		"\n "+array[1][0]+" "+array[1][1]+
		// 		"\n "+array[2][0]+" "+array[2][1]+
		// 		"\n "+array[3][0]+" "+array[3][1]+
		// 		"\n "+array[4][0]+" "+array[4][1]+
		// 		"\n "+array[5][0]+" "+array[5][1]);
	}
}

function getQuestions(){
	$(".buttons").html('<div class="col-xs-12 col-sm-4"><button class="btn" onclick="loadQuestion(5)">Yes</button><button class="btn" onclick="loadQuestion(1)">No</button></div><div class="col-xs-12 col-sm-4"><button class="btn" onclick="loadQuestion(3)">I Don\'t Know</button></div><div class="col-xs-12 col-sm-4"><button class="btn" onclick="loadQuestion(4)">Probably</button><button class="btn" onclick="loadQuestion(2)">Probably Not</button></div>');
	loadQuestion(0);
}

// function getData(){
// 	var dataHold = {};

// 	if (typeof(Storage) !== "undefined") {
// 		dataHold = JSON.parse(localStorage.getItem("SPEROresultTracks"));
// 		Score = dataHold["riasecScore"];
// 	} else {
// 	    // Sorry! No Web Storage support..
// 	}
// }

function storeDataLocal(){
	var dataHold = {};

	if (typeof(Storage) !== "undefined") {
		dataHold = {"riasecScore" : Score}
		localStorage.setItem("SPEROriasecScore",JSON.stringify(dataHold));
		$.ajax({
			type: "POST",
			url: "/insertRiasec",
			data: JSON.stringify(Score),
			contentType:"application/json",
			success: function(data){
				if(data != null && data["success"]){
					alert("Succesful indert of riasec!");
				}
			}
		});
	} else {
	    // Sorry! No Web Storage support..
	}
}