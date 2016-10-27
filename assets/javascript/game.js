var answered = false;
var questnum = 0;
var time=20;
var correctguesses = 0;
var counter = null;
var successaudio = new Audio('assets/images/TaDa-SoundBible.com-1884170640.mp3');
var failureaudio = new Audio('assets/images/Smashing-Yuri_Santana-1233262689.mp3');
var trivia = [
{ "question":"Who said 'You must not fight too long with one enemy, or you will teach him all your art of war.'",
"answers" : ["Napoleon",
"Alexander the Great",
"Sun Tzu",
"Genghis Khan"],
"correctAns": 0,
"image" : "assets/images/Napoleon.jpg"
},
{"question":"Who said : 'Be the change you wish to see in the world', 'An eye for an eye only ends up making the whole world blind'",
"answers" : ["Mahatma Gandhi",
"Dalai Lama",
"Nelson Mandela",
"Martin Luther King"],
"correctAns": 0,
"image" : "assets/images/Gandhi.jpg"
},
{ "question":"Who said 'The only thing worse than being talked about is not being talked about', 'Be yourself; everyone else is already taken'",
"answers" : ["Marilyn Monroe",
"Mae West",
"Oscar Wilde",
"Noel Coward"],
"correctAns": 1,
"image" : "assets/images/maewest.jpeg"
},
{ "question":"Who said 'you think, so shall you become', 'I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times'",
"answers" : ["David Beckham",
"Bruce Lee",
"Confucius",
"Malcolm Gladwell"],
"correctAns": 2,
"image" : "assets/images/confucius.jpg"
}]


$(document).ready(function() {
	// display the start button only
	document.getElementById('gameId').style.display = "none";


	function checkOutcome() {
		if(parseInt($("#userScore").text()) === parseInt($("#randomNbr").text())) {
			//The player wins if their total score matches the random number from the beginning of the game.		
			wins++;
			$("#numWinsId").text(wins);
			$("#message").text("You win!!");
			refresh();

		}else if(parseInt($("#userScore").text()) > parseInt($("#randomNbr").text())) {
			//The player loses if their score goes above the random number.
			losses++;
			$("#numLossesId").text(losses);
			$("#message").text("You lose!!");
			refresh();
		}
	}

	function startgame() {
		// hide the start button
		questnum = 0;
		correctguesses = 0;
		document.getElementById('startId').style.display = "none";
		document.getElementById('gameId').style.display = "block";
		displayquestion();
	}

	function displayImage (correctResponse){
		if (correctResponse === true) {
			var div=$('<div>');
			var p = $('<div>');
			p.html("You guessed correct!! ");
			var img = $('<img>');
			img.attr('src', trivia[questnum].image);
			img.attr('height', 200);
			img.attr('width', 200);
			div.append(p);
			div.append(img);
			div.append("<div>"+trivia[questnum].answers[trivia[questnum].correctAns]+"</div>");
			$('#gameId').html(div);
			answered = true;
		}
		else {
			var div=$('<div>');
			var p = $('<div>');
			p.html("Incorrect !! ");
			var img = $('<img>');
			img.attr('src', trivia[questnum].image);
			img.attr('height', 200);
			img.attr('width', 200);
			div.append(p);
			div.append(img);
			div.append("<div>"+trivia[questnum].answers[trivia[questnum].correctAns]+"</div>");
			$('#gameId').html(div);
			answered =true;
		}
		setTimeout (function() {
			
			if(answered === true) {
				nextquestion();
			}
		}, 3000);
		
	}

	function displayscore() {
		var div = $("#gameId");
		var q = "<div>" + " Game over" + "</div>";
		q += "<br><br>";
		q += "<div>" + " Score : Correctly guessed " + 
		correctguesses + " out of " + trivia.length + "</div>";
		var b = $('<button>');
		b.attr('class', 'startbutton');
		b.text('Start Over');
		//q.append(b);
		div.html(q);
		div.append(b);
		if(correctguesses === trivia.length) {
			successaudio.play();
		}else {
			failureaudio.play();
		}

	}

	function timer() {
		time--;

		var converted = timeConverter(time);

		$('#timerId').html(converted);

        //check if time is up
        if (time <= 0) {
        	clearInterval(counter);
        	console.log("stopwatch cleared");
        	displayImage(false);
        };
    }

    function starttimer(){
    	console.log("timer started");
    	time = 20;
    	$('#timerId').html("00:00");
    	counter = setInterval(function() {
    		timer();
    	}, 1000);
    }

    function displayquestion() {

    	var div = $("#gameId");
    	var stopwatchDiv = "<span id='timerId'>" + "00:00" + "</span>";
    	starttimer();
    	var q = "<div>" + "Time Remaining :" + stopwatchDiv + "</div>" ;
    	q += "<div>" +trivia[questnum].question + "</div>";
    	q += "<br><br>";
    	var qId = "question" +  questnum;
    	q += "<ul id='" + qId + "'>";
    	for(var i=0; i < trivia[questnum].answers.length; i++) {
    		var answerId = "answer" + questnum + i;
    		q += "<li id='" + answerId + "'>" + trivia[questnum].answers[i] + "</li>";
    	}
    	q += "</ul>";
    	div.html(q);
    }

    function nextquestion() {
    	answered = false;
    	questnum++;
    	if(questnum === trivia.length) {
    		displayscore();

    	} else {
    		displayquestion();
    	}
    }

    function timeConverter(t){
        //This function is done. You do not need to touch it. 
        //It takes the current time in seconds and converts 
        //it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t/60);
        var seconds = t - (minutes * 60);
        if (seconds < 10){
        	seconds = "0" + seconds;
        }
        if (minutes === 0){
        	minutes = "00";
        } else if (minutes < 10){
        	minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }

	//click event for each answer
	$("body").on("click", 'li', function(event) {
        //start a timer
        // $(this).nextAll().css({"color":"red"});
        answered = true;
        var result = false;
        $(this).css({"color":"red"});
        
        clearInterval(counter);
        console.log("stopwatch cleared");

        if(parseInt($(this).attr('id')[$(this).attr('id').length-1]) === trivia[questnum].correctAns) {
        	result = true;
        }

        if (result === true) {
        	correctguesses++;
        	displayImage(true);
        }else {
        	displayImage(false);
        }
    });

	//click event for start button
	$("body").on("click", '.startbutton', function(event) {
		startgame();
	});

});
