<div class="player-container">
	<div class="player-song-list bg-dark">
		<table class='table table-dark table-striped'>
			<thead class='bg-info'>
				<tr>
					<td>
						<input type="text" class='song-filter form-control' placeholder="Buscar cancion">
					</td>
					<td style="text-align: center">
						<button class='ask-btn btn btn-sm btn-warning text-white mt-1'>
							Necesitas ayuda? <i class='fa fa-question-circle-o'></i>
						</button>
					</td>
				</tr>
			</thead>
			<tbody id='list-song'></tbody>
		</table>
	</div>
	<div class="player-song-options bg-dark text-white" id="player-song-options">
		<div class="player-details h-100 d-flex flex-row justify-content-center align-items-center">
			<span class='w-100 d-flex flex-row justify-content-center align-items-center'>
				<button class='previous-song btn btn-sm btn-info text-white mr-5'><i class='fa fa-step-backward'></i></button>
				
				<button class='stop-song-bar btn btn-sm btn-danger text-white rounded-circle d-none'><i class="fa fa-pause"></i></button>
				<button class='play-song-bar btn btn-sm btn-success text-white rounded-circle'><i class="fa fa-play-circle"></i></button>
				<button class='loop-song btn btn-sm btn-info text-white rounded-circle ml-2'><i class='fa fa-repeat'></i></button>
				<button class='mute-song btn btn-sm btn-warning text-white rounded-circle ml-2'><i class='fa fa-ban'></i></button>

				<button class='next-song btn btn-sm btn-info text-white ml-5'><i class="fa fa-step-forward"></i></button>
			</span>			 
		</div>
		<div class="player-options h-100 d-flex flex-row justify-content-center align-items-center">
			
			<blockquote style='width:100%'>
				<span class="ml-2 mt-1" id='song-details'>No ha elegido ninguna cancion!</span> <span id='time'></span>
				<div class='progress mt-2 w-100' id='progress-bar-container' data-toggle="tooltip" data-placement="right" title="">
					<progress value="0" min="0" max="100" class='progress-bar text-dark bg-primary' id='audio-bar' style='width:0%; height:100%;'></progress>
				</div>
			</blockquote>
		</div>
		<div class="player-volume h-100 d-flex flex-row justify-content-center align-items-center">
			<input type="range" name='slider' min="1" max="100" value='100' id='slider'>
		</div>
	</div>
</div>