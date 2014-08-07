
$(window).load(function(){



var context = new (window.AudioContext || window.webkitAudioContext ||  
	window.mozAudioContext || 
    window.oAudioContext || 
    window.msAudioContext)();
	if (context) {
  			console.log("Web Audio is good to go")
  			console.log(context)
		} 
		else {
  			alert('browser not supported') ;
	}
//end


//visualizer

var ans = context.createAnalyser();
var ansT = context.createAnalyser();
ans.smoothingTimeConstant = 0.9;
console.log(ans);
var soundData = new Uint8Array(ans.frequencyBinCount);
var  timeData = new Uint8Array(ansT.frequencyBinCount);




var frameSkip = 4;







var frameSwitch = function() {
	if (frameSkip % 2 === 0){
		draw();
		
		frameSkip ++;
	}

	else {
		
		frameSkip ++;
	}

	requestAnimationFrame(frameSwitch);

}
var colorGrid = [];



var draw = function(){
	$("canvas").clearCanvas();
	ans.fftSize = 32;
	ans.getByteFrequencyData(soundData);
	var binCount = ans.frequencyBinCount;
	var WIDTH = $("canvas").width();
	var HEIGHT = $("canvas").width();
	var perWid = binCount/WIDTH;
	var perHig = 15/HEIGHT;
	var barWidth = (WIDTH * perWid);
	var barHeight = HEIGHT * perHig - 8;
	var color = "#FFFFFF"
	
	

	for (var i = 0; i<ans.frequencyBinCount; i++){


		for (var b = 0; b<15; b++){
			posX = i*20 + barWidth/2 + 2;
			posY = b*10 +barHeight/2 +2;
			var colorGrid = ["#00FF01","#F5FF00","#FF0000","#656565"]
			var light = Math.round(soundData[i]/17) -2
				if (b <= light && light != 0){
					
					if (b >=0){
						color = colorGrid[0]

					}
					if (b >=6){
						color = colorGrid[1]
					}
					if (b >=12){
						color = colorGrid[2]
					}

				}else color = colorGrid[3]


			$('canvas').drawRect({
			  fillStyle: color,
			  x: posX, y: 150 - posY,
			  width: barWidth,
			  height: barHeight,
				});
			}

		




		
	}



}
frameSwitch();



var osc = {};



$(document).keydown(function(event){
	if (event.which == 81){
	var audio = new Audio();
audio.src = "testSounds/test.mp3"
audio.type = "audio/mpeg"
$("body").append(audio);

	console.log(audio.readyState)
	playing = context.createMediaElementSource(audio);
	playing.connect(ans);
	playing.connect(ansT);
	playing.connect(context.destination);
	

	audio.play(0);
}

	if (event.which == 87){
	var audio = new Audio();
audio.src = "testSounds/test2.mp3"
audio.type = "audio/mpeg"
$("body").append(audio);

	console.log(audio.readyState)
	playing = context.createMediaElementSource(audio);
	playing.connect(ans);
	playing.connect(ansT)
	playing.connect(context.destination);
	

	audio.play(0);
}

	if (event.which == 69){
		osc = context.createOscillator();
		osc.connect(ans);
		osc.connect(ansT);
		osc.connect(context.destination)
		osc.frequency.value = 440.0;
		osc.start(0);
	}
	console.log($("canvas").width()/16)
	console.log(Math.round(soundData[5]/17))


});

$(document).keyup(function(event){
	if (event.which == 69){
		osc.stop(0);
		osc.disconnect;
	}

})



///visualizer








});



