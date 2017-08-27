var User ={
			id : "",
			username : "",
			password : "",
			gradeLevel : 7,
			equippedTrack : "",
			chosenCareer : "",
			chosenProgram : "",
			email : "",
			grade1 : [
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null]
					 ],
			grade2 : [
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null]
					 ],
			grade3 : [
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null]
					 ],
			grade4 : [
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null]
					 ],
			grade5 : [
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null]
					 ],
			grade6 : [
					  [45,76,76,98,97,88],
					  [99,100,54,66,76,87],
					  [99,74,90,98,76,76],
					  [45,76,76,98,97,98]
					 ],
			grade7 : [
					  [91,79,89,98,78,98,76],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null]
					 ],
			grade8 : [
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null]
					 ],
			grade9 : [
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null]
					 ],
			grade10 : [
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null],
					  [null,null,null,null,null,null]
					 ],
		   };


var resultTracks = ["STEM","ArtsDesign","Sports","HUMSS","ABM","GAS"];

var clickedCareer = "";
var clickedTrack = "";

var gradingPeriod = 1;

var Tracks = {
				ABM : ["Accountant","Economist","Manager","Bachelor of Science in Accountancy","This program is composed of subjects in accounting ( financial, public, managerial), audit, administration, business laws and taxation. Its primary focus is not limited to business subjects, but to other fields as well, such as banking and finance, government, social services, education, and more.","Bachelor of Science in Accounting Technology","This program centers on the basic accounting skills, as well as business and finance skills that will help students pursue careers in bookkeeping, auditing, tax preparation, and business analysis.","Bachelor of Science in Management Accounting","This program provides knowledge and skills in the practice of management. The program includes topics in the systems, procedures and policies used by executive and top management in making company decisions. ","Bachelor of Arts in Economics","A four year degree program designed to equip students with knowledge in economic theories, economic modeling frameworks and economic strategies and policies.","Bachelor of Science in Economics","Economics program provides a strong foundation of knowledge and skills to students in understanding the theories and concepts of economics and economic trends.","Bachelor of Science in Business Economics","This program provides an in-depth knowledge and a wide range of skills to students regarding economic theories, organizational and financing issues with the use of quantitative and analytical approach.","Bachelor of Science in Business Administration Major in Marketing Management","This program is designed to equip students with the knowledge and skills for effective marketing and sales strategies: how a company determines what product or service to sell, how customers and markets are delineated into target demographics, and the methods of reaching them.","Bachelor of Science in Business Administration Major in Financial Management","This program is a four-year college course recommended for people who plan to make a career in Banking and Finance Industry.","Bachelor of Science in Entrepreneurial Management","This program is a four year degree program designed to provide students with an in-depth understanding of the process of developing a business, running a business, and legal and ethical issues of business ownership."],
				HUMSS : ["Psychologist","Anthropologist","Politician","Bachelor of Science in Psychology","This program is designed to help students observe human behavior through the scientific method, allowing them to gain access to the human psyche and fathom its depths.","Bachelor of Arts in Psychology","This program is a four year degree program that helps students understand human behavior and different thinking processes through the use of basic scientific principles and psychological theories.","Bachelor of Science in Clinical Psychology","This is a program designed to prepare students for becoming independent professionals in the practice of clinical psychology.","Bachelor of Arts in Anthropology","This a four-year degree program in the Philippines that will teach you about the origin and evolution of human beings including gradual changes in their genetic makeup, behavior, languages, and social relations.","","","","","Bachelor of Arts in Political Science","This is a four-year degree program which centers on the study of governments, the history and forms of political institutions, political behavior and political policies.","Bachelor of Arts in Philosophy","This is a four year degree program that provides students with the understanding of different philosophical theories regarding human nature, society, civilization, culture and religion.","Bachelor of Science in Mathematics","A four year degree program designed to give students a background in mathematical modeling, scientific computing, and the various modern applications of mathematics."],
				STEM : ["Computer Programmer","Civil Engineer","Mathematician","Bachelor of Science in Information Technology","Prepares students to be IT professionals who are able to perform installation, operation, development, maintenance and administration of computer applications.","Bachelor of Science in Computer Science","Prepares students for proficiency in designing, writing and developing computer programs and computer networks.","Bachelor of Science in Information Systems","A four year degree program that deals with the design and implementation of solutions that integrate information technology with business processes.","Bachelor of Science in Civil Engineering","A five-year program that educates students with basic principles of Science in conjunction with mathematical and computational tools used in engineering.","","","","","Bachelor of Science in Mathematics","A four year degree program designed to give students a background in mathematical modeling, scientific computing, and the various modern applications of mathematics.","Bachelor of Science in Applied Mathematics","Provides students with a strong foundation in different mathematical techniques and its application in data analysis, optimization and modeling.","",""],
				GAS : ["Computer Programmer","Interior Designer","Physical Therapist","Bachelor of Science in Information Technology","Prepares students to be IT professionals who are able to perform installation, operation, development, maintenance and administration of computer applications.","Bachelor of Science in Computer Science","Prepares students for proficiency in designing, writing and developing computer programs and computer networks.","Bachelor of Science in Information Systems","A four year degree program that deals with the design and implementation of solutions that integrate information technology with business processes.","Bachelor of Science in Interior Design","A four year degree program designed to teach students design concepts and methods of building interiors. It covers a wide range of professional practices such as: interior design, furniture and accessories design, visual merchandising, production design, exhibition design, interior landscaping design and lighting design. In addition, students learn skills in photography, fashion and other crafts.","","","","","Bachelor of Science in Physical Therapy", "Teaches students the knowledge and skills in the rehabilitation and treatment of individuals with disabilities resulting from injury, illness and aging. ","Bachelor of Science in Nutrition and Dieterics", "A four year degree program designed to equip students with knowledge and skills in the three key areas of nutrition, namely Hospital Nutrition, Community (Public Health) Nutrition and Food Service.",	 "Bachelor of Science in Respiratory Therapy", "Provides an intensive foundation in evaluating, treating and caring for patients with cardiopulmonary and breathing disorders."],
				ArtsDesign : ["Fine Artist","Interior Designer","Architecture","Bachelor of Fine Arts Major in Painting","A four year degree program designed to help students develop their artistic skills in the key areas of fine arts. The curriculum encourages the student to explore the possibilities of painting in terms of conceptualization, techniques and methodology.","Bachelor of Fine Arts Major in Visual Communication","A four year degree program designed to help students develop their artistic skills in the key areas of fine arts. The student is educated to become a media specialist who gives form to ideas and information.","Bachelor of Fine Arts Major in Industrial Design","A four year degree program designed to help students develop their artistic skills in the key areas of fine arts. The student is trained to tap a wealth of resources including historical styles, traditional and indigenous crafts, as well as the popular trends and the latest technology in the use of materials and processes in order to create well-made objects and systems that will help improve and enhance the quality of life.","Bachelor of Science in Interior Design","A four year degree program designed to teach students design concepts and methods of building interiors. It covers a wide range of professional practices such as: interior design, furniture and accessories design, visual merchandising, production design, exhibition design, interior landscaping design and lighting design. In addition, students learn skills in photography, fashion and other crafts.","","","","","Bachelor of Science in Architecture","A 5-year college degree intended for people who wish to pursue a career in Architecture. Architectural education provides students with knowledge and skills in planning, designing and constructing buildings taking into account the principles of utility, strength and aesthetics.","","","","",],
				Sports: ["Physical Education Instructor", "Physical Therapist", "Coach","Bachelor in Elementary Education - Major in MAPE", "A four year degree program designed to prepare students to become primary school teachers. Concentrates on Filipino music and arts, customary dances and historic traditions.","Bachelor in Secondary Education - Major in MAPEH", "A four year degree program designed to prepare students for becoming high school teachers. Focuses on Filipino culture and traditions including foreign influences; concentrates on Filipino music and arts, customary dances and historic traditions.","Bachelor of Science in Education - Major in Physical Education", "Designed to provide students with a strong foundation on the concepts of Physical Education. The program aims to produce graduates who are able to work as high school physical education teachers.","Bachelor of Science in Physical Therapy", "Teaches students the knowledge and skills in the rehabilitation and treatment of individuals with disabilities resulting from injury, illness and aging. ","Bachelor of Science in Nutrition and Dieterics", "A four year degree program designed to equip students with knowledge and skills in the three key areas of nutrition, namely Hospital Nutrition, Community (Public Health) Nutrition and Food Service.","Bachelor of Science in Respiratory Therapy", "Provides an intensive foundation in evaluating, treating and caring for patients with cardiopulmonary and breathing disorders.","Bachelor of Science in Education - Major in PE", "Designed to provide students with a strong foundation on the concepts of Physical Education. The program aims to produce graduates who are able to work as high school physical education teachers.","Bachelor in Elementary Education - Major in MAPE", "A four year degree program designed to prepare students to become primary school teachers. Concentrates on Filipino music and arts, customary dances and historic traditions.","Bachelor in Secondary Education - Major in MAPEH", "A four year degree program designed to prepare students for becoming high school teachers. Focuses on Filipino culture and traditions including foreign influences; concentrates on Filipino music and arts, customary dances and historic traditions."]
			};
var focusGrades = [["Science","Math"],["Keep up the good work!",""],["You're doing great!",""]];

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
			}	
		},500);
	});
}