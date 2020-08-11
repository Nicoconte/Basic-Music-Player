var audio = new Audio();
var songName = "";
var intervalID = '';
var loopIsActive = false;
var songList = [];

let getRealName = (name) => {
	let newName = ""
	newName = name.replace('.mp3', "");
	return newName;
}

const getFilesFromServer = () => {
	
	let template = '';

	$.ajax({
		type : "POST",
		dataType : "JSON",
		url : "Core/Scripts/GetFiles.php",
		success : function(response) {
			response.forEach(data => {
				songList.push(data.name);
				this.template += 
					`<tr song='${[data.name]}'> 
						<td> ${getRealName(data.name)} </td>
						<td> 
							<button class='play-song btn btn-sm btn-info text-white rounded-circle'>
								<i class="fa fa-play-circle"></i>
							</button> 
						</td>
					</tr>`;
			});

			$("#list-song").html(this.template);
		}
	})
}

const playSong = () => {
	$(document).on("click", ".play-song", function() {
		
		let html = $(this)[0].parentElement.parentElement;
		let song = $(html).attr("song");
		songName = $(html).attr("song");

		window.document.title = song;

		clearInterval(intervalID);

		audio.pause();
		audio = new Audio("Core/Upload/" + song);
		audio.preload;
		audio.play();


		loopAudio();
		getSongDetails();
		getCurrentVolume();

		startAudioBar();
		changeBarButton();
		
	});
}

const nextSongEvent = () => {
	$('.next-song').click(function() {
		
		audio.pause();
		delete audio;

		clearInterval(intervalID);

		let songPosition = songList.indexOf(songName) + 1;
		let nextSong = "";
		
		nextSong = songList[songPosition];
		songName = songList[songPosition];	

		window.document.title = nextSong;

		audio = new Audio("Core/Upload/" + nextSong);
		audio.preload;
		audio.play();


		loopAudio();
		getSongDetails();
		getCurrentVolume();

		startAudioBar();
		changeBarButton();

	})
}

const previousSongEvent = () => {
	$('.previous-song').click(function() {
		
		audio.pause();
		delete audio;

		clearInterval(intervalID);

		let songPosition = songList.indexOf(songName) - 1;
		let previousSong = "";
		
		previousSong = songList[songPosition];
		songName = songList[songPosition];
			

		window.document.title = previousSong;

		audio = new Audio("Core/Upload/" + previousSong);
		audio.preload;
		audio.play();

		loopAudio();
		getSongDetails();
		getCurrentVolume();

		startAudioBar();
		changeBarButton();

	})
}

const nextSongAutomatically = () => {
	
	let nextSongPosition = songList.indexOf(songName) + 1;
	let nextSong = songList[nextSongPosition];
	songName = songList[nextSongPosition];

	window.document.title = nextSong;
	
	audio.pause();
	delete audio;

	clearInterval(intervalID);

	audio = new Audio("Core/Upload/" + nextSong);
	audio.preload;
	audio.play();

	loopAudio();
	getSongDetails();
	getCurrentVolume();

	startAudioBar();
	changeBarButton();

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
		$("#song-details").html(getRealName(songName) + " | " + minutes + ":" + ((seconds.length === 1) ? '0' + seconds : seconds));
	}

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

const ready = () => {
	getFilesFromServer();
	playSong();
	controlVolumeSong();
	playSongBarBtn();
	stopSongBarBtn();
	setLoop();
	nextSongEvent();
	previousSongEvent(); 
}

$(document).ready(ready);