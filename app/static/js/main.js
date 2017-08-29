$(document).ready(function(){
	w3.includeHTML();
	$("#logout a").click(function(){
		logout();
	});
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

function logout(){
	alert("kasulod");
	var dataHold = {};
	var User = {};
	if (typeof(Storage) !== "undefined") {
		dataHold = JSON.parse(localStorage.getItem("SPEROUser"));
		User = dataHold["User"];

		$.ajax({
			type: "POST",
			url: "/updateUser",
			data: {User},
			contentType:"application/json",
			success: function(data){
				$.ajax({
					type: "POST",
					url: "/logout",
					success: function(data){
						alert("Successful update USER");
						window.location = "index.html";
					}
				});
			}
		});
	} else {
	    // Sorry! No Web Storage support..
	}
}