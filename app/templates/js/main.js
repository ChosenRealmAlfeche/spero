$(document).ready(function(){
	w3.includeHTML();
});

function fadeOut(x){
	$(".fullscreen").fadeIn(500,function(){
		window.setTimeout(function(){
			switch(x){
				case 1: window.location = "grades.html";break;
				case 2: window.location = "register.html";break;
				case 3: window.location = "index.html";break;
				case 4: window.location = "home.html";break;
			}	
		},500);
	});
}

function checkLogin(){
	var dataHold = JSON.parse(localStorage.getItem("SPEROUser"));
	if(dataHold != null && dataHold != "" && dataHold["User"] != null 
		&& dataHold["User"]["username"] != null && dataHold["User"]["username"] != "" 
		&& dataHold["User"]["password"] != null && dataHold["User"]["password"] != ""){

	}
}