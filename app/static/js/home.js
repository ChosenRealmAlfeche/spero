$(document).ready(function(){
	if(resultTracks.length == 0){
		window.location = "grades.html";
	}
	$(".otherTracks").hide();
	$( "#careersrow" ).hide();
	$( "#coursesrow" ).hide();
	$( "#careerscourses" ).hide();
	$( "#delayrow" ).hide();
	$("#dontLikeCourse").hide();
	$("#dontLikeCareer").hide();
	setFocus();
	

	checkColor();
	var iterator = 0;
	$( ".panelTrack" ).click(function() {
		// Colors
		clickedTrack = $(this).find("h4").html();
		classHold = clickedTrack.toLowerCase()+"Class";
		$('.panelCareers').each(function(){
	        var panelHeading = $(this).find(".panel-heading");
	        panelHeading.removeClass();
	        panelHeading.addClass("panel-heading text-center "+classHold);
	        // panelHeading.css("opacity","0.9");
	    });
		$('.panelCourses').each(function(){
	        var panelHeading = $(this).find(".panel-heading");
	        panelHeading.removeClass();
	        panelHeading.addClass("panel-heading text-center "+classHold);
	        // panelHeading.css("opacity","0.8");
	    });

		// Set Text
		iterator = 0;
		$('.panelCareers').each(function(){
	        $(this).find("h5").text(Tracks[clickedTrack][iterator]);
	        if(Tracks[clickedTrack][iterator++] == User["chosenCareer"]){
	        	$(this).find(".panel-heading").addClass("glow");	
	        }
	    });

		// Animations
		$( "#careerscourses" ).slideToggle( "slow", function() {
			$( "#careersrow" ).slideToggle( "slow", function() {
				$( ".panelCareers" ).slideDown( "slow", function() {});
				$( "#delayrow" ).slideUp( "slow", function() {
					$( "#coursesrow" ).slideUp( "slow", function() {});
				});
			});
		});
		$('.panelTrack').not(this).each(function(){
	        $(this).slideToggle();
	    });
	    
	    if($(".panelCareers").is(":visible") ){
	    	//show I dont like button
	    	$("#dontLike").html("Tracks");
	    }else{
	    	//show I dont like button
	    	$("#dontLike").html("Careers");
	    }
	});

	$( ".panelCareers" ).click(function() {
		//setText
		clickedCareer = $(this).find("h5").html();
		iterator = 3 + (6 * $(".panelCareers").index(this));
		$('.panelCourses').each(function(){
	        $(this).find("h6").text(Tracks[clickedTrack][iterator]);
	        if(Tracks[clickedTrack][iterator++] == User["chosenProgram"]){
	        	$(this).find(".panel-heading").addClass("glow");	
	        }
	        $(this).find("span").text(Tracks[clickedTrack][iterator++]);
	    });

		// Animations
		$( "#delayrow" ).slideToggle( "slow", function() {
			$( "#coursesrow" ).slideToggle( "slow", function() {});
		});
		$(".panelCareers").not(this).each(function(){
	        $(this).slideToggle();
	    });
	    if($(".panelCourses").is(":visible") ){
	    	$("#dontLike").html("Careers");
	    }else{
	    	$("#dontLike").html("Courses");
	    }
	});

	$(".panelCourses").click(function(){
		$("#setCourse").html($(this).find("h6").html());
		$("#setTrack").html(clickedTrack);
		$("#setCareer").html(clickedCareer);
		$('#myModal').modal('show');
	});

});

function checkColor(){
	var iterator = 0;
	$('.panelTrack').each(function(){
        $(this).find(".panel-heading").addClass(resultTracks[iterator].toLowerCase()+"Class");
        if(resultTracks[iterator] == User["equippedTrack"]){
	        $(this).find(".panel-heading").addClass("glow");	
	    }
        $(this).find("h4").html(resultTracks[iterator++]);
    });
}

function setFocusModal(){
	User["equippedTrack"] = $("#setTrack").html();
	User["chosenCareer"] = $("#setCareer").html();
	User["chosenProgram"] = $("#setCourse").html();
	setFocus();

	//setGrades
	var index = Math.floor(Math.random()*focusGrades.length);
	var iterator = 0;
	$(".gradesFocus").each(function (){
		$(this).html(focusGrades[index][iterator++]);
	});

	$(".glow").removeClass("glow");

	$('.panelTrack').each(function(){
        if($(this).find("h4").text() == User["equippedTrack"]){
        	$(this).find(".panel-heading").addClass("glow");	
        }
    });
	// Animations
	$( "#careerscourses" ).slideUp( "slow", function() {
		$( "#careersrow" ).slideUp( "slow", function() {
			$( ".panelCareers" ).slideUp( "slow", function() {});
			$( "#delayrow" ).slideUp( "slow", function() {
				$( "#coursesrow" ).slideUp( "slow", function() {});
			});
		});
	});
	$('.panelTrack').not(this).each(function(){
        $(this).slideDown();
    });
    $("#dontLike").html("Tracks");

	checkColor();
}

function setFocus(){
	$(".focusTrack").html(User["equippedTrack"]);
	$("#focusCareer").html(User["chosenCareer"]);
	$("#focusCourse").html(User["chosenProgram"]);
	var focus = $("#panelFocus").find(".panel-heading");
	focus.removeClass();
	focus.addClass("panel-heading text-center "+User["equippedTrack"].toLowerCase()+"Class");
	$(".otherTracks").hide();
}

function showOtherTracks(){
	

		// Animations
	$( "#careerscourses" ).slideUp( "slow", function() {
		$( "#careersrow" ).slideUp( "slow", function() {
			$( ".panelCareers" ).slideDown( "slow", function() {});
			$( "#delayrow" ).slideUp( "slow", function() {
				$( "#coursesrow" ).slideUp( "slow", function() {});
			});
			$(".otherTracks").slideDown();
		});
	});
		$('.panelTrack').each(function(){
	        $(this).slideDown();
	    });
	//show I dont like button
	$("#dontLike").html("Tracks");
}