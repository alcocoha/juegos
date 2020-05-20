var pos = [];

var click = { "startPos": "", "endPos": "" };

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
			   "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var words = [
			{ "word": "APEGO", "description": "APEGO", "direction": "SE", "start": 50 },
			{ "word": "DISLIPIDEMIA", "description": "DISLIPIDEMIA", "direction":"E", "start": 1 },
			{ "word": "EFICACIA", "description": "EFICACIA","direction": "S", "start": 46 },
			{ "word": "CIPROFIBRATO", "description": "CIPROFIBRATO","direction": "E", "start": 214 },
			{ "word": "DIURÉTICO", "description": "DIURÉTICO","direction": "S", "start": 34 },
			{ "word": "FUROSEMIDA", "description": "FUROSEMIDA", "direction": "E", "start": 186 },
			{ "word": "HIPERTENSIÓN", "description": "HIPERTENSIÓN", "direction": "E", "start": 166 },
			{ "word": "MIXTA", "description": "MIXTA","direction": "S", "start": 77 },
			{ "word": "OROXADIN", "description": "OROXADIN","direction": "S", "start": 26 },
			{ "word": "LASIX", "description": "LASIX","direction": "S", "start": 14 },
			{ "word": "NEFRÓTICO", "description": "NEFRÓTICO","direction": "S", "start": 58 },
			{ "word": "TRIGLICÉRIDOS", "description": "TRIGLICÉRIDOS","direction": "E", "start": 198 },
			];

var SIZE = 225;

var totalColums = 15;

var winSize;
var idCanvasA;
var idCanvasB;
var letterPosition;
var fullArc;
var middleArc;
var r;

if( window.outerWidth < 768 && winSize != "xs"){
	winSize = "xs";
	r = 10;

	idCanvasA = "a";
	idCanvasB = "b";

	fullArc = 20;
	middleArc = 10;

	letterPosition = {
		10: 1,
		30: 2,
		50: 3,
		70: 4,
		90: 5,
		110: 6,
		130: 7,
		150: 8,
		170: 9,
		190: 10,
		210: 11,
		230: 12,
		250: 13,
		270: 14,
		290: 15
	};
	// console.log('[RESIZE] --- < XS')
}
if( window.outerWidth >= 768 && window.outerWidth < 1200 && winSize != "sm"){
	winSize = "sm";
	r = 18;

	idCanvasA = "c";
	idCanvasB = "d";

	fullArc = 40;
	middleArc = 20;

	letterPosition = {
		20: 1,
		60: 2,
		100: 3,
		140: 4,
		180: 5,
		220: 6,
		260: 7,
		300: 8,
		340: 9,
		380: 10,
		420: 11,
		460: 12,
		500: 13,
		540: 14,
		580: 15
	};
	// console.log('[RESIZE] --- < SM')
}
// if( window.outerWidth > 992 && window.outerWidth < 1200 && winSize != "md"){
// 	winSize = "md";

// 	console.log('[RESIZE] --- < MD');
// }
if( window.outerWidth > 1200 && winSize != "lg"){
	winSize = "lg";
	r = 20;

	idCanvasA = "e";
	idCanvasB = "f";

	fullArc = 50;
	middleArc = 25;

	letterPosition = {
		25: 1,
		75: 2,
		125: 3,
		175: 4,
		225: 5,
		275: 6,
		325: 7,
		375: 8,
		425: 9,
		475: 10,
		525: 11,
		575: 12,
		625: 13,
		675: 14,
		725: 15
	};
	// console.log('[RESIZE] --- < LG')
}

// Prepare the wordsearch with random letters and word layout
$(document).ready(function() {
	// grab the size of the grid.  I used this method in case I need to
	// scale this word search in the future

	$( window ).resize(function() {
		var size = window.outerWidth;
		if( size < 768 && winSize != "xs"){
			winSize = "xs";
			// console.log('[RESIZE] --- < XS')
			location.reload()
		}
		if(size >= 768 && size < 1200 && winSize != "sm"){
			winSize = "sm";
			// console.log('[RESIZE] --- < SM')
			location.reload()
		}
		// if(size > 992 && size < 1200 && winSize != "md"){
		// 	winSize = "md";
		// 	console.log('[RESIZE] --- < MD')
		// 	location.reload()
		// }
		if(size > 1200 && winSize != "lg"){
			winSize = "lg";
			// console.log('[RESIZE] --- < LG')
			location.reload()
		}
	});

	// put random letters on the board
	for (var i = 0; i < SIZE; i++) {
		$(".letters").append("<span class='" + (i + 1) + "'>" +
							getRandomLetter() + "</span>");
	}

	// insert the words onto the board
	for (var i = 0; i < words.length; i++) {
		words[i].end = words[i].start;
		displayWord(words[i]);
		// save the start and end of each word for word checking later
		pos[i] = { "start": words[i].start, "end": words[i].end };
		// $(".words").append("<div><span class='number'>"+ (i + 1) +"</span> </div> <span class='" + i + "'>" +
		// 					words[i].description + "</span>");

		$(".words").append(`
			<div class="list-item">
				<div class="list-item-number">
					<span class="number"> ${ i + 1 } </span>
				</div>
				<div class="list-item-description">
					<span class="${ i }"> ${ words[i].description }</span>
				</div>
			</div>
		`);
	}

	$("#menu").on("mouseup", function() {
		$(this).css( {"display": "none"})
		$("#main").slideDown("slow", function() {
		})
	});
})

function getRandomLetter() {
	return letters[Math.floor(Math.random() * letters.length)];
}

function displayWord(w) {
	// console.log('[WORD]-->w', w)
	for (var j = 0; j < w.word.length; j++){
		// console.log('[WORD]-->: ', w.word, w.start, w.end);
		if (w.direction == "N") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end -= totalColums;
		}
		if (w.direction == "NE") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end -= totalColums - 1;
		}
		if (w.direction == "E") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end += 1;
		}
		if (w.direction == "SE") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end += totalColums + 1;
		}
		if (w.direction == "S") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end += totalColums;
		}
		if (w.direction == "SW") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end += totalColums - 1;
		}
		if (w.direction == "W") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end -= 1;
		}
		if (w.direction == "NW") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end -= totalColums + 1;
		}
	}
}


// start of x & y, end of x & y.
var sX, sY, eX, eY, canvas, ctx, height, width, diff;
var n = Math.sqrt((r * r) / 2);
var strokeColor = "#DFDF0B";
var isMouseDown = false;
var mouseMoved = false;

function isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
}

$(document).ready(function() {

	function handleDraw( e ) {

	// }
	// $("#c").on("mousedown mouseup mousemove mouseleave touchstart touchmove touchend touchleave", function(e) {
		e.preventDefault();

		// console.log(e);
		if (e.type == "mousedown" || e.type == "touchstart") {
			setCanvas(idCanvasA);
			isMouseDown = true;

	  // Used for Firefox
			if( isMobile() ){
				sX = e.touches[0].pageX - $(e.target).offset().left;
				sY = e.touches[0].pageY - $(e.target).offset().top;
			} else {
				sX = e.offsetX || e.clientX - $(e.target).offset().left;
				sY = e.offsetY || e.clientY - $(e.target).offset().top;
			}

			// adjust the center of the arc
			sX -= (sX % middleArc);
			sY -= (sY % middleArc);
			if (!(sX % fullArc)) sX += middleArc;
			if (!(sY % fullArc)) sY += middleArc;

			setPos(sX, sY, "start");
			draw(e.type);
		}
		else if (e.type == "mousemove" || e.type == "touchmove") {
			if (isMouseDown) {
				mouseMoved = true;

				if( isMobile() ){
					eX = e.touches[0].pageX - $(e.target).offset().left;
					eY = e.touches[0].pageY - $(e.target).offset().top;
				} else {
					eX = e.offsetX || e.clientX - $(e.target).offset().left;
					eY = e.offsetY || e.clientY - $(e.target).offset().top;
				}


				draw(e.type);
			}
		}
		else if (e.type == "mouseup" || e.type == "touchend") {
			isMouseDown = false;
			ctx.clearRect(0, 0, width, height);
			if (mouseMoved) {
				mouseMoved = false;

				eX -= eX % middleArc;
				eY -= eY % middleArc;
				if (!(eX % fullArc)) eX += middleArc;
				if (!(eY % fullArc)) eY += middleArc;

				// draw the last line and clear the canvas to check and see if its the
				// correct word
				draw(e.type);
				ctx.clearRect(0, 0, width, height);
				// if a correct word has been highlighted change the canvas to
				// the permanent one and redraw the arcs and lines.  Then scratch the
				// word on the right.
				if (checkWord()) {
					setCanvas(idCanvasB);
					draw(e.type);
					scratchWord();
					// Check if the game is over
					if(isEndOfGame()) {
						// alert("Good job!");
						if( window.innerWidth < 768 ){
							document.getElementById("final-bottom").style.display = "block";
						} else {
							document.getElementById("final").style.display = "block";
						}
					}
				}

			}
		}
		else if (e.type == "mouseleave" || e.type == "touchleave") {
			isMouseDown = false;
			draw(e.type);
		}

	}
	// );

	var el = document.getElementById(idCanvasA)
		el.addEventListener("mousedown", handleDraw, false);
		el.addEventListener("mouseup", handleDraw, false);
		el.addEventListener("mousemove", handleDraw, false);
		el.addEventListener("mouseleave", handleDraw, false);
		el.addEventListener("touchstart", handleDraw, false);
		el.addEventListener("touchmove", handleDraw, false);
		el.addEventListener("touchend", handleDraw, false);
		el.addEventListener("touchleave", handleDraw, false);
})

// This function is called when lines need to be drawn on the game
function draw(f) {
	// used to draw an arc.  takes in two numbers that represent the beginning
	// and end of the arc
	function drawArc(xArc, yArc, num1, num2) {
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(xArc, yArc, r, num1 * Math.PI, num2 * Math.PI);
		ctx.strokeStyle = strokeColor;
		ctx.stroke();
	}

	// used to draw the two lines around letters
	function drawLines(mX1, mY1, lX1, lY1, mX2, mY2, lX2, lY2) {
		ctx.beginPath();
		ctx.moveTo(mX1, mY1);
		ctx.lineTo(lX1, lY1);
		ctx.moveTo(mX2, mY2);
		ctx.lineTo(lX2, lY2);
		ctx.stroke();
	}
	// Check and see what event occured and create the action that belongs to that
	// event.
	if (f == "mousedown" || f == "touchstart"){
		ctx.clearRect(0, 0, width, height);
		drawArc(sX, sY, 0, 2);
	}
	else if ( f == "mousemove" || f == "mouseup" || f == "touchmove" || f == "touchend" ) {
		/*
		This is to show the rise over run I used to get the limits for
		all eight directions.  This tells the conditionals when to activiate
		the lines and in which direction.
		rise = (sY - eY) * Math.sqrt(6);
		run = sX - eX;
		 */
		limit = ((sY - eY) * Math.sqrt(6)) / (sX - eX);
		// UP
		if ((limit > 6 || limit < -6) && eY < sY) {
			// clear the canvas
			if (f == "mousemove" || f == "touchmove" ) ctx.clearRect(0, 0, width, height);
			drawArc(sX, sY, 0, 1); // draw bottom arc
			drawArc(sX, eY, 1, 2); // draw top arc

			// draw the two lines that connect the bottom and the top arcs
			drawLines(sX + r, sY, sX + r, eY, sX - r, sY, sX -r, eY);

			// if the player is selecting this as the last letter set its position
			// for wordcheck
			if (f == "mouseup" || f == "touchend" ) setPos(sX, eY, "end");
		}
		// DOWN
		if ((limit < -6 || limit > 6) && eY > sY) {
			// clear the canvas
			if (f == "mousemove" || f == "touchmove") ctx.clearRect(0, 0, width, height);
			drawArc(sX, sY, 1, 2);
			drawArc(sX, eY, 0, 1);
			drawLines(sX + r, sY, sX + r, eY, sX - r, sY, sX -r, eY);
			if (f == "mouseup" || f == "touchend") setPos(sX, eY, "end");
		}
		// LEFT
		if ((limit < 1 && limit > -1) && eX < sX) {
			if (f == "mousemove" || f == "touchmove") ctx.clearRect(0, 0, width, height);
			drawArc(sX, sY, 1.5, 0.5);
			drawArc(eX, sY, 0.5, 1.5);
			drawLines(sX, sY - r, eX, sY -r, sX, sY + r, eX, sY + r);
			if (f == "mouseup" || f == "touchend") setPos(eX, sY, "end");
		}
		// RIGHT
		if ((limit < 1 && limit > -1) && eX > sX) {
			if (f == "mousemove" || f == "touchmove") ctx.clearRect(0, 0, width, height);
			drawArc(sX, sY, 0.5, 1.5);
			drawArc(eX, sY, 1.5, 0.5);
			drawLines(sX, sY - r, eX, sY -r, sX, sY + r, eX, sY + r);
			if (f == "mouseup" || f == "touchend") setPos(eX, sY, "end");
		}
		/*
		This is for the NW diagonal lines it requires a special number
		n that is the adjacent lengths of a 45-45-90 triangle needed to draw these
		lines.  It also creates a diff for the difference between the
		start and the end of the arcs
		*/
		// NW
		if ((limit > 1 && limit < 6) && (eX < sX && eY < sY)) {
			if (f == "mousemove" || f == "touchmove") ctx.clearRect(0, 0, width, height);
			diff = sX - eX;
			drawArc(sX, sY, 1.75, 0.75);
			drawArc(sX - diff, sY - diff, 0.75, 1.75);
			drawLines(sX + n, sY - n, sX + n - diff, sY - n - diff,
					  sX - n, sY + n, sX - n - diff, sY + n - diff);
			if (f == "mouseup" || f == "touchend") setPos(sX - diff, sY - diff, "end");
		}

		// NE
		if ((limit < -1 && limit > -6) && (eX > sX && eY < sY)) {
			if (f == "mousemove" || f == "touchmove") ctx.clearRect(0, 0, width, height);
			diff = sX - eX;
			drawArc(sX, sY, 0.25, 1.25);
			drawArc(sX - diff, sY + diff, 1.25, 0.25);
			drawLines(sX + n, sY + n, sX + n - diff, sY + n + diff,
					  sX - n, sY - n, sX - n - diff, sY - n + diff);
			if (f == "mouseup" || f == "touchend") setPos(sX - diff, sY + diff, "end");
		}
		// SW
		if ((limit < -1 && limit > -6) && (eX < sX && eY > sY)) {
			if (f == "mousemove" || f == "touchmove") ctx.clearRect(0, 0, width, height);
			diff = sX - eX;
			drawArc(sX, sY, 1.25, 0.25);
			drawArc(sX - diff, sY + diff, 0.25, 1.25);
			drawLines(sX + n, sY + n, sX + n - diff, sY + n + diff,
					  sX - n, sY - n, sX - n - diff, sY - n + diff);
			if (f == "mouseup" || f == "touchend") setPos(sX - diff, sY + diff, "end");
		}
		// SE
		if ((limit > 1 && limit < 6) && (eX > sX && eY > sY)) {
			if (f == "mousemove" || f == "touchmove") ctx.clearRect(0, 0, width, height);
			diff = sX - eX;
			drawArc(sX, sY, 0.75, 1.75);
			drawArc(sX - diff, sY - diff, 1.75, 0.75);
			drawLines(sX + n, sY - n, sX + n - diff, sY - n - diff,
					  sX - n, sY + n, sX - n - diff, sY + n - diff);
			if (f == "mouseup" || f == "touchend") setPos(sX - diff, sY - diff, "end");
		}
	}

	else if (f == "mouseleave" || f == "touchleave") {
		setCanvas(idCanvasA);
		ctx.clearRect(0,0,width,height);
	}
}


// change the canvas between the bottom and top layer
function setCanvas(id) {
	canvas = document.getElementById(id);
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
}

// set the offsets to numbers that match the class names of each letter
function setPos(x, y, loc) {
	tX = letterPosition[x];
	tY = letterPosition[y];
	if (loc == "start") click.startPos = (tY - 1) * totalColums + tX;
	else click.endPos = (tY - 1) * totalColums + tX;
}


// verify if the word chosen is the correct one. If a player decides
// to highlight a word starting from last letter to first this function
// will also support that ability
function checkWord() {
	// clears the pos array so that a player cannot highlight the same word twice
	function clearPos(p) {
		p.start = p.end = 0;
		return true;
	}
	// user highlights from first letter to last
	if (pos.some(function(o) {
		return o.start === click.startPos && o.end === click.endPos && clearPos(o);
	})) {
		return true;
	}
	// if user highlights from last letter to first
	else if (pos.some(function(o) {
		return o.start === click.endPos && o.end === click.startPos && clearPos(o);
	})) {
		return true;
	}
	else return false;
}

// scratch the word on the right out when the word is found on the left
function scratchWord() {
	for (var i = 0; i < words.length; i++) {
		if ((click.startPos === words[i].start && click.endPos === words[i].end) ||
			(click.startPos === words[i].end && click.endPos === words[i].start)) {
			// little hack here
			$(".words").find("." + i).addClass("strike");
		}
	}
	// check if the game is over

}

function isEndOfGame(){
	return pos.every(function(o) { return o.start === 0 && o.end === 0; });
}
