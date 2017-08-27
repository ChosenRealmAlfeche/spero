function loadQuestion(state){
	Score[Letter] += parseInt(state);
	if(questions.length >= 1){
		var index = Math.floor(Math.random()*questions.length);
		var question = questions[index];
		questions.splice(index, 1);
		$(".talktext").find("b").text(question[0]);
		Letter = question[1];
		
	}else{
		var array=[];
		for(a in Score){
		 array.push([a,Score[a]]);
		}
		array.sort(function(a,b){return a[1] - b[1]});
		array.reverse();
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