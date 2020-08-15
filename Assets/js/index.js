var audio = new Audio();

var songName = "";
var loopIsActive = false;
var songList = [];

var currentIcon = 0;
var lastIcon = 0;


let getRealName = (name) => {
	let newName = ""
	newName = name.replace('.mp3', "");
	return newName;
}

const getFilesFromServer = () => {
	
	let template = '';
	let iconID = 0;

	$.ajax({
		type : "POST",
		dataType : "JSON",
		url : "Core/Scripts/GetFiles.php",
		success : function(response) {
			response.forEach(data => {
				songList.push(data.name);
				this.template += 
					`<tr song='${[data.name]}' icon='${iconID}'> 
						<td> ${getRealName(data.name)} | <i id=${iconID} class='fa fa-headphones'></i></td>
						<td style='text-align:center'> 
							<button class='play-song btn btn-sm btn-info text-white rounded-circle'>
								<i class="fa fa-play-circle"></i>
							</button> 
						</td>
					</tr>`;

				iconID++;
			});

			$("#list-song").html(this.template);
		}
	})
}

const playSong = () => {
	$(document).on("click", ".play-song", function() {
		
		lastIcon = currentIcon;	
		$("#" + lastIcon).removeClass("text-success");	

		let html = $(this)[0].parentElement.parentElement;
		let song = $(html).attr("song");
		songName = $(html).attr("song");

		currentIcon = $(html).attr("icon");
		$("#" + currentIcon).addClass("text-success");

		window.document.title = song;

		audio.pause();
		audio = new Audio("Core/Upload/" + song);
		audio.preload;
		audio.play();


		loopAudio();
		mutedSong();
		getSongDetails();
		getCurrentVolume();

		startAudioBar();
		changeBarButton();
		songCountUp();

	});
}

const nextSongEvent = () => {
	$('.next-song').click(function() {
		
		lastIcon = currentIcon;
		currentIcon = parseInt(currentIcon) + 1;

		$("#" + lastIcon).removeClass("text-success");
		$("#" + currentIcon).addClass("text-success");
		
		audio.pause();
		delete audio;

		let songPosition = songList.indexOf(songName) + 1;
		let nextSong = "";
		
		nextSong = songList[songPosition];
		songName = songList[songPosition];	

		window.document.title = nextSong;

		audio = new Audio("Core/Upload/" + nextSong);
		audio.preload;
		audio.play();


		loopAudio();
		mutedSong();
		getSongDetails();
		getCurrentVolume();

		startAudioBar();
		changeBarButton();
		songCountUp();

	})
}

const previousSongEvent = () => {
	$('.previous-song').click(function() {

		lastIcon = currentIcon;
		currentIcon = parseInt(currentIcon) - 1;

		$("#" + lastIcon).removeClass("text-success");
		$("#" + currentIcon).addClass("text-success");		

		audio.pause();
		delete audio;

		let songPosition = songList.indexOf(songName) - 1;
		let previousSong = "";
		
		previousSong = songList[songPosition];
		songName = songList[songPosition];
			

		window.document.title = previousSong;

		audio = new Audio("Core/Upload/" + previousSong);
		audio.preload;
		audio.play();

		loopAudio();
		mutedSong();
		getSongDetails();
		getCurrentVolume();

		startAudioBar();
		changeBarButton();
		songCountUp();

	})
}

const nextSongAutomatically = () => {
	
	lastIcon = currentIcon;
	currentIcon = parseInt(currentIcon) + 1;

	$("#" + lastIcon).removeClass("text-success");
	$("#" + currentIcon).addClass("text-success");

	let nextSongPosition = songList.indexOf(songName) + 1;
	let nextSong = songList[nextSongPosition];
	songName = songList[nextSongPosition];

	window.document.title = nextSong;
	
	audio.pause();
	delete audio;

	audio = new Audio("Core/Upload/" + nextSong);
	audio.preload;
	audio.play();

	loopAudio();
	mutedSong();
	getSongDetails();
	getCurrentVolume();

	startAudioBar();
	changeBarButton();
	songCountUp();

}

const previousSongAutomatically = () => {

		lastIcon = currentIcon;
		currentIcon = parseInt(currentIcon) - 1;

		$("#" + lastIcon).removeClass("text-success");
		$("#" + currentIcon).addClass("text-success");

		audio.pause();
		delete audio;

		let songPosition = songList.indexOf(songName) - 1;
		let previousSong = "";
		
		previousSong = songList[songPosition];
		songName = songList[songPosition];
			

		window.document.title = previousSong;

		audio = new Audio("Core/Upload/" + previousSong);
		audio.preload;
		audio.play();

		loopAudio();
		mutedSong();
		getSongDetails();
		getCurrentVolume();

		startAudioBar();
		changeBarButton();	
		songCountUp();
}

const songCountUp = () => {
	audio.addEventListener("timeupdate", function() {
	    var timeline = document.getElementById('time');
	    var s = parseInt(audio.currentTime % 60);
	    var m = parseInt((audio.currentTime / 60) % 60);
	    if (s < 10) {
	        $(timeline).text(m + ':0' + s);
	    }
	    else {
	        $(timeline).text(m + ':' + s);
	    }
	}, false);
}

const whenTheSongEnd = () => {
	audio.onended = function() {
		nextSongAutomatically();
	}
}

const playSongBarBtn = () => {
	$(".play-song-bar").click(function() {
		$('.play-song-bar').addClass('d-none');
		$('.stop-song-bar').removeClass('d-none');
		audio.play();
	})
}

const stopSongBarBtn = () => {
	$(".stop-song-bar").click(function() {
		$(".stop-song-bar").addClass('d-none');
		$(".play-song-bar").removeClass("d-none");
		audio.pause();
	})
}

const playAndStopWithKey = (option) => {
	if (option % 2 === 0) {
		$('.play-song-bar').addClass('d-none');
		$('.stop-song-bar').removeClass('d-none');
		audio.play();		
	} else {
		$(".stop-song-bar").addClass('d-none');
		$(".play-song-bar").removeClass("d-none");
		audio.pause();		
	}
}

const setLoop = () => {
	
	let loopOption = 0;

	$(".loop-song").click(function() {
		if(loopOption % 2 === 0) {
			audio.loop = true;
			$('.loop-song').addClass('bg-success');
			loopIsActive = true;
		} else {
			audio.loop = false;
			$('.loop-song').removeClass('bg-success');
			loopIsActive = false;
		}

		loopOption++;

	});
}

const loopAudio = () => {
	if (loopIsActive) { 
		audio.loop = true;
	} else {
		audio.loop = false;
		whenTheSongEnd();
	}	
}

const mutedSong = () => {
	let muteOption = 0;

	$(".mute-song").click(function() {
		if(muteOption % 2 === 0 ) {
			audio.volume = 0.0;
			$(".mute-song").addClass("bg-danger");
		} else {
			audio.volume = localStorage.getItem('volume');
			$(".mute-song").removeClass("bg-danger");
		}

		muteOption++;

	});
}

const muteSongWithKey = (muteOption) => {

	if(muteOption % 2 === 0 ) {
		audio.volume = 0.0;
		$(".mute-song").addClass("bg-danger");
	} else {
		audio.volume = localStorage.getItem('volume');
		$(".mute-song").removeClass("bg-danger");
	}

	muteOption++;	
}

const changeBarButton = () => {
	$('.play-song-bar').addClass('d-none');
	$(".stop-song-bar").removeClass("d-none");	
}

const controlVolumeSong = () => {
	let slider = document.getElementById("slider"); 
	slider.oninput = function() {
		localStorage.setItem('volume', this.value / 100);
		audio.volume = localStorage.getItem('volume');
	}		
}

const getSongDetails = () => {
	audio.onloadedmetadata = function() {
		let minutes = Math.floor(audio.duration / 60);
		let seconds = (Math.floor(audio.duration) - minutes * 60).toFixed(0)
		$("#song-details").html(getRealName(songName) + " | ");
	}

}

const getCurrentTimeOnProgressbar = () => {
	$("#progress-bar-container").mousemove(function(e) {
		bar = document.getElementById("audio-bar");
	    var percent = e.offsetX / this.offsetWidth;
	    let tempTime = (percent * audio.duration);

	    let minute = Math.floor(tempTime / 60);
	    let seconds = (Math.floor(tempTime) - minute * 60).toFixed(0);
	    
	    let currentTime = minute + ":" + ((seconds.length === 1) ? '0' + seconds : seconds);

	    $('[data-toggle="tooltip"]').attr('data-original-title', currentTime).tooltip("show");
	    
	   	
	});
}

const intercalateIntoTheSong = () => {
	$("#progress-bar-container").click(function(e) {
		bar = document.getElementById("audio-bar");
	    var percent = e.offsetX / this.offsetWidth;
	    audio.currentTime = percent * audio.duration;
	    bar.value = percent / 100;
	})
}

const getCurrentVolume = () => {
	audio.volume = localStorage.getItem('volume');
}

const startAudioBar = () => {
	let bar = document.getElementById('audio-bar');
	audio.ontimeupdate = function() {
		bar.style.width = (audio.currentTime / audio.duration) * 100 + "%";	
	}
}

const getLastPositionOfSlider = () => {
	$("#slider").attr("value", getCurrentVolume());
}

const stopScrolling = () => {
	$(".player-container").scroll(function(e){ 
		e.preventDefault()
		return; 
	});	
}

const songShortcut = () => {

	let muteOption = 0;
	let playOption = 1;

	$(document).on('keydown', function(e) {

		switch(e.which) {
			case 39:
				nextSongAutomatically();
				break;
			case 37:
				previousSongAutomatically();
				break;
			case 38:
				stopScrolling();
				advanceSong();				
				break;
			case 40:
				stopScrolling();
				backwardSong();
				break;
			case 82:
				repeatSong();
				break;
			case 77:
				muteSongWithKey(muteOption);
				muteOption++;
				break;
			case 80:
				playAndStopWithKey(playOption);
				playOption++;
				break;
			default:
				break;
		}
	})
}

const advanceSong = () => {

	audio.paused;
	audio.currentTime = audio.currentTime + 0.5;
	audio.play;
		
	if(audio.currentTime > audio.duration) {
		nextSongAutomatically(); 
		return;
	}

}

const backwardSong = () => {
	audio.paused;
	audio.currentTime = audio.currentTime - 0.5;
	audio.play;
		
	if(audio.currentTime < 0) {
		previousSongAutomatically(); 
		return;
	}	
}

const repeatSong = () => {
	audio.paused;
	audio.currentTime = 0;
	audio.play;
}

const showHelp = () => {
	$(".ask-btn").click(function() {
		var help = new Anno([
			{
				target : ".next-song",
				position : "top",
				content : "Proxima cancion | Atajo: Flecha derecha"
			},
			{
				target : ".previous-song",
				position : "top",				
				content : "Cancion anterior | Atajo: Flecha izquierda"
			},
			{
				target : ".mute-song",
				position : "top",				
				content : "Silenciar cancion | Atajo: 'M'"
			},
			{
				target : ".loop-song",
				position : "top",				
				content : "Repite la misma cancion 'x' veces"
			},
			{
				target : ".play-song-bar",
				position : "top",
				content : "Inicia - pausa - reanuda | Atajo 'P'"
			},
			{
				target : "#audio-bar",
				position : "top",				
				content : "Progreso de la cancion | Adelantar cancion (Flecha para arriba) o retroceder cancion (Flecha para abajo)"
			}, 
			{
				target : "#slider",
				position : "top",				
				content : "Subir - bajar volumen"
			},

		])

		help.show();	

		delete help;
	})
} 


const initTooltip = () => {
	$(document).ready(function () {
	  $('[data-toggle="tooltip"]').tooltip();
	});
}


const changeCursor = () => {
	$("#progress-bar-container").mousemove(function() {
		$(this).css("cursor","pointer");
	})
}

const ready = () => {
	getFilesFromServer();

	initTooltip();
	changeCursor();

	playSong();
	controlVolumeSong();
	playSongBarBtn();
	stopSongBarBtn();
	setLoop();
	nextSongEvent();
	previousSongEvent();
	getLastPositionOfSlider();

	songShortcut();
	showHelp();

	intercalateIntoTheSong();
	getCurrentTimeOnProgressbar();

}

$(document).ready(ready);