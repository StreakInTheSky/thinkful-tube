function main() {
	var state = {
		results: [],
		searchText: '',
		apiKey: 'AIzaSyAdSi0DTP0Jbdzu5ahkJj5zWHDTAf4I13E'
	}

	function playVideo() {
		$('.results').on('click', 'img', function() {
			$('.video-frame').html(
				'<iframe width="560" height="315" src="https://www.youtube.com/embed/' + $(this).parent().attr('id') + '" frameborder="0" allowfullscreen></iframe>'
				)
		})
	}

	function getMoreFromChannel() {
		$('.channel-link').click(function(){
			getResults('&channelId=' + $(this).attr('id'));
		})
	}

	function renderList() {
		var listHTML = state.results.map(function(item){
			return '<li><div class="results" id="' + item.id.videoId + '"><img src="' + item.snippet.thumbnails.default.url + '"><p>' + item.snippet.title + '</p>' + 
						 '<p class="channel-link" id="' + item.snippet.channelId + '">Channel: ' + item.snippet.channelTitle + '</p></div></li>';
		})
		$('#result-list').html(listHTML);
		playVideo();
		getMoreFromChannel();
	}

	function getResults(query) {
		var settings = {
			url: "https://www.googleapis.com/youtube/v3/search?key=" + state.apiKey + "&part=snippet" + query + "",
			method: "GET",
		};
		$.ajax(settings).done(function(response) {
			state.results = response.items;
			renderList();
		})
	}

	function searchOnKeyup() {
		$('.search-bar').keyup(function(event) {
			state.searchText = $('.search-input').val();
			getResults('&q=' + state.searchText);
		})
	}

	function stopSubmit() {
		$('.search-bar').submit(function(event){
			event.preventDefault();
		})
	}

	searchOnKeyup();
	stopSubmit();
}

$(document).ready(main)
