var User = {};
var Grades = {};
var gradingPeriod = 1;

$(document).ready(function(){	
	getData();
	loadGradeLevels();
	greyOut();

	//click on hs/e
	$(".gradeLevels").click(function(){
		$(this).slideToggle();
		$(".gradeLevels").not(this).each(function(){
	        $(this).slideToggle();
	    });
	    $(".gradeLevel").slideToggle();

	    $(".gradeLevel").each(function(){
	        $(this).find(".panel-heading").removeClass("panel-heading-color");
	    });

	    if($(this).attr("id") == "eLevel"){
	    	if(User["gradeLevel"] >= 7){
	    		$("#grade7").find(".panel-heading").addClass("panel-heading-color");
	    		loadGreyd("grade7");
	    		greyOut();
	    	}
	    }else{
	    	if(User["gradeLevel"] >=1){
	    		$("#grade1").find(".panel-heading").addClass("panel-heading-color");
	    		loadGreyd("grade1");
	    		greyOut();
	    	}
	    }
	});
	
	//click on a grade
	$(".gradeLevel").not(".gradeUp").click(function(){
		$(".gradeLevel").not(this).each(function(){
	        $(this).find(".panel-heading").removeClass("panel-heading-color");
	    });
	    $(this).find(".panel-heading").addClass("panel-heading-color");

	    var loadGrade = $(this).find(".panel").attr("id");
	    loadGreyd(loadGrade);
	    greyOut();
	    //insert grade changing function
	});

	//click on grade up
	$(".gradeUp").click(function(){
		confirmGradeUp();
	});
	var gradeid ="";
	var gradearray ="";
	var gradeActive = "";
	$("input").change(function(){
		gradeid = $(this).attr("id");
		gradearray = gradeid.split("");
		Grades[$( ".panel-heading-color" ).parent(".panel").attr("id")][parseInt(gradearray[0])][parseInt(gradearray[1])] = $(this).val();
	});
});

function confirmGreyOut(){
	if(confirm("Are you sure you want to input grades for next grading?")){
		if(gradingPeriod < 4){
			gradingPeriod = 1+(gradingPeriod % 4);
			greyOut();
		}else{
			confirmGradeUp();
		}
	}
}

function greyOut(){
	$("input").prop('disabled', true);	
	$( "#tblBody td:nth-child("+(gradingPeriod)+")").find("input").prop('disabled', false);
	
}

function loadGreyd(gradelvl){
	var y = 0;
	var x = 0;
	$( "#tblBody tr").each(function(){
		x = 0;
		$(this).find("input").each(function(){
			$(this).val(Grades[gradelvl][x++][y]);
		});
		y++;
	});
}

function loadGradeLevels(){
	var grade = User["gradeLevel"];
	var n = 1;
	while(n <= 10){
		$("#grade"+n).show();
		n++;
	}

	//get rid of actives
	$(".gradeLevel").not(this).each(function(){
        $(this).find(".panel-heading").removeClass("panel-heading-color");
    });

	//set active
	$("#grade"+grade).find(".panel-heading").addClass("panel-heading-color");
	loadGreyd("grade"+grade);

	//set gradeup button
	$("#eGradeUp").hide();
	if(grade > 6){
		$(".eGrade").hide();
		$("#eLevel").hide();
	} else if(grade <= 6){
		$(".hsGrade").hide();
		$("#hsLevel").hide();
	}
	if(grade < 6){
		$("#eGradeUp").show();
		$("#hsGradeUp").hide();
	}
	if(grade >=10){
		$("#hsGradeUp").hide();
	}

	//hide other grades
	grade++; 
	while(grade <= 10){
		$("#grade"+grade).hide();
		grade++;
	}
}

function confirmGradeUp(){
	if(confirm("Are you sure you want to grade up?")){
		++User["gradeLevel"];
		loadGradeLevels();
		greyOut();
	}
}

function getData(){
	var dataHold = {};

	if (typeof(Storage) !== "undefined") {
		dataHold = JSON.parse(localStorage.getItem("SPEROUser"));
		User = dataHold["User"];
		dataHold = JSON.parse(localStorage.getItem("SPEROGrades"));
		Grades = dataHold["Grades"];
	} else {
	    // Sorry! No Web Storage support..
	}
}

function storeDataLocal(){
	var dataHold = {};

	if (typeof(Storage) !== "undefined") {
		dataHold = {"User" : User};
		localStorage.setItem("SPEROUser",JSON.stringify(dataHold));
		dataHold = {"Grades" : Grades};
		localStorage.setItem("SPEROGrades",JSON.stringify(dataHold));
	} else {
	    // Sorry! No Web Storage support..
	}	
	window.location = "questions.html";
}