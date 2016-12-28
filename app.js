function main() {
	var state = {
		results: [],
		searchText: '',
		apiKey: 'AIzaSyAdSi0DTP0Jbdzu5ahkJj5zWHDTAf4I13E'
	}

	function getResults() {
		var settings = {
			url: "https://www.googleapis.com/youtube/v3/search?key=" + state.apiKey + "&part=snippet&q=" + state.searchText + "",
			method: "GET",
			dataType: 'json',
		};
		$.ajax(settings).done(function(response) {
			state.results = response.items;
			renderList();
		})
	}

	function renderList() {
		var listHTML = state.results.map(function(item){
			return '<li> <img src="' + item.snippet.thumbnails.default.url + '"><p>' + item.snippet.title + '</p></li>';
		})
		$('#result-list').html(listHTML);
	}

	function handleSubmit() {
		$('.search-bar').submit(function(event){
			event.preventDefault();
			state.searchText = $('.search-input').val();
			console.log(state);
			getResults();
		})
	}

	handleSubmit();
}

$(document).ready(main)
