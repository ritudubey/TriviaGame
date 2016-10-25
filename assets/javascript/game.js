var questnum = 0;
var time=20;
var correctguesses = 0;
var counter = null;
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





function randomIntFromInterval(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}

$(document).ready(function() {
	// displat the start button only
	computerRandomNumber = randomIntFromInterval(19,120);
	$("#randomNbr").text(computerRandomNumber);

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
		document.getElementById('startId').style.display = "none";
		document.getElementById('gameId').style.display = "block";
		displayquestion();
	}

	function displayImage (msg, cur){
		$('#gameId').html('<img src='+trivia[questnum].image+ ' width="400px">');
	}

	function displayscore() {
		var div = $("#gameId");
		var q = "<div>" + " Game over" + "</div>";
		q += "<br><br>";
		q += "<div>" + " Score : Correctly guessed " + 
		correctguesses + " out of " + trivia.length + "</div>";
		div.html(q);
	}

	function count(){
        //increment time by 1, remember we cant use "this" here
        time--;

        //Get the current time, pass that into the stopwatch.timeConverter function, and save the result in a variable
        var converted = timeConverter(time);
        //Use the variable you just created to show the converted time in the "display" div
        //$("#display").html(converted);
        $('#timerId').html(converted);
    }

	function displayquestion() {

		var div = $("#gameId");
		var stopwatchDiv = "<span id='timerId'>" + "00:00" + "</span>";
		counter = setInterval(function() {
            stopwatch.count();
            console.log("stopwatch started");
        }, 3000);


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

		questnum++;
		
       //if the count is the same as the length of the image array, reset the count to 0
       if(questnum === trivia.length) {
    	//questnum = 0;
    	//display score
    	displayscore();

    } else {

    	if (time <= 0) {
    		clearInterval(counter);
        	console.log("stopwatch cleared");
    		time = 20;
        	$('#timerId').html("00:00");
    		displayquestion();
    	};

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
        var result = false;
        $(this).css({"color":"red"});
        clearInterval(counter);
        if(parseInt($(this).attr('id')[$(this).attr('id').length-1]) === trivia[questnum].correctAns) {
        	result = true;
        }

        setTimeout (function() {
		// check outcome 

		// if correct answer 

		// display "you win" increment wins and the answer for 5 sec then return
 		//Use a setTimeout to run displayImage after 3 second
    	//or
    	// display "you loose" increment losses and the answer for 5 sec then return
 		//Use a setTimeout to run displayImage after 3 second
 		//var cur = $(this).data("value");
 		//console.log($(this).attr('id'));
 		if (result === true) {
 			correctguesses++;
 		}
 		clearInterval(counter);
        console.log("stopwatch cleared");
    	time = 20;
        $('#timerId').html("00:00");
 		displayImage();
 	}, 3000);
        nextquestion();
    });

	//click event for start button
	$("#startId").on("click", function(event) {
        //start the game
        startgame();
    });

});
