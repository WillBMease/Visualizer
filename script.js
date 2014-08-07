
$(window).load(function(){



var context = new (window.AudioContext || window.webkitAudioContext ||  
	window.mozAudioContext || 
    window.oAudioContext || 
    window.msAudioContext)();
	if (context) {
  			console.log("Web Audio is good to go")
  			console.log(context)
		} else {
  			alert('browser not supported') ;
	}
//end


//visualizer

var ans = context.createAnalyser();
var ansT = context.createAnalyser();
ans.smoothingTimeConstant = 0.85;
console.log(ans);
var soundData = new Uint8Array(ans.frequencyBinCount);
var  timeData = new Uint8Array(ansT.frequencyBinCount);



var sampleAudio = function(){




}
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


var draw = function(){
	$("canvas").clearCanvas();
	ans.fftSize = 128;
	ans.getByteFrequencyData(soundData);
	for (var i = 3; i<ans.frequencyBinCount; i++){
		zX = (((i-3) * 7) +3)
		$('#visualizer').drawLine({
		  strokeStyle: "#0008FF",
		  strokeWidth: 7,
		  x1: zX, y1:300,
		  x2: zX, y2:300-soundData[i]*1.17,
		});
	}

	for (var i = 3; i<ans.frequencyBinCount; i++){

			var xX1 = Math.cos((i-2)*5.25)
			var x1 = 150 + 0.1*xX1
			var zZ1 = Math.sin((i-2)*5.25)
			var z1 = 75 + 0.1*zZ1

			var xX2 = Math.cos((i-2)*5.25)
			var x2 = 150 +(0.1+(soundData[i]*0.4))*xX2
			var zZ2 = Math.sin((i-2)*5.25)
			var z2 = 75+ (0.1+(soundData[i]*0.4))*zZ2
		$("#spiral").drawLine({




			strokeStyle: "#FF0000",
			strokeWidth:5,
			x1: x1, y1: z1, x2:x2,y2:z2,



		})



	}

	for (var i = 3; i<ans.frequencyBinCount; i++){

			var xX1 = Math.cos((i-2)/5.25)
			var x1 = 150 + 10*xX1
			var zZ1 = Math.sin((i-2)/5.25)
			var z1 = 75 + 10*zZ1

			var xX2 = Math.cos((i-2)/5.25)
			var x2 = 150 +(10+(soundData[i]*0.2))*xX2
			var zZ2 = Math.sin((i-2)/5.25)
			var z2 = 75+ (10+(soundData[i]*0.2))*zZ2

			var hue = i/ans.frequencyBinCount * 360;
			var hueS = hue.toString();
		$("#cut").drawLine({




			strokeStyle: "#000000",
			strokeWidth:2,
			x1: x1, y1: z1, x2:x2,y2:z2,



		})



	}
	ansT.fftSize = 512;
	ansT.getByteTimeDomainData(timeData);
	for (var i = 0; i< ansT.frequencyBinCount; i++){
		xPos = (i*1.171875);
		yPos = timeData[i]*0.5 + 10;

		$("#freq").drawRect({
			fillStyle:"#FFFFFF",
			x:xPos, y:(yPos),
			width:2,height:2,

		})

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



});

$(document).keyup(function(event){
	if (event.which == 69){
		osc.stop(0);
		osc.disconnect;
	}

})

sampleAudio();

///visualizer








});



