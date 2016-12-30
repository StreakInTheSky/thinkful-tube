	var state = {
		results: [],
		searchText: '',
		apiKey: 'AIzaSyAdSi0DTP0Jbdzu5ahkJj5zWHDTAf4I13E'
	}

function main() {

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

	function gotoNextPage() {
		$('.pagination').on('click', '#next-page', function() {
			getResults(null, state.results.nextPageToken)
		})
	}	

	function gotoPrevPage() {
		$('.pagination').on('click', '#prev-page', function() {
			getResults(null, state.results.prevPageToken)
		})
	}

	function renderResultsPageNav() {
		var paginationButtons;

		if (state.results.prevPageToken) {
			paginationButtons = '<button id="prev-page">Prev Page</button><button id="next-page">Next Page</button>';
		} else {
			paginationButtons = '<button id="next-page">Next Page</button>';
		}
		$('.pagination').html(paginationButtons)
	}

	function renderList() {
		var listHTML = state.results.items.map(function(item){
			return '<li><div class="results" id="' + item.id.videoId + '"><img src="' + item.snippet.thumbnails.default.url + '"><p>' + item.snippet.title + '</p>' + 
						 '<p class="channel-link" id="' + item.snippet.channelId + '">Channel: ' + item.snippet.channelTitle + '</p></div></li>';
		})
		$('#result-list').html(listHTML);

		renderResultsPageNav();
		playVideo();
		getMoreFromChannel();
	}

	function getResults(query, pageToken) {
		if (!query) {
			query = '&q=' + state.searchText + '&pageToken=' + pageToken;
		}
		var settings = {
			url: "https://www.googleapis.com/youtube/v3/search?key=" + state.apiKey + "&part=snippet" + query,
			method: "GET",
		};
		$.ajax(settings).done(function(response) {
			state.results = response;
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
	gotoPrevPage();
	gotoNextPage();
}

$(document).ready(main)
