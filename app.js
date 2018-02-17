const YOUTUBE_API_ENDPOINT = "https://www.googleapis.com/youtube/v3/search";

function getDataFromAPI (userSearchValue, callback) {
	const params = {
		part: 'snippet',
		key: 'AIzaSyDh_xGPxAMR6QUO2UmQ9dN-hVTuh_uoXqc',
		q: userSearchValue,
		maxResults: 6,
    type: 'video'
	};
	$.getJSON(YOUTUBE_API_ENDPOINT, params, callback).fail(showError);
  console.log($.getJSON(YOUTUBE_API_ENDPOINT, params, callback));
}

function renderResult (item) {
	const videoIDprecursor = "https://www.youtube.com/watch?v=";
	const videoID = item.id.videoId;
  const videoURL = videoIDprecursor + videoID;
	return `
		<div class='video-result'>
			<a href="${videoURL}"><img class="video-result-thumbnail" src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title + 'thumbnail'}"></a>
			<a href="${videoURL}"><h2>${item.snippet.title}</h2></a>
			<span>by</span>
			<a href="#"><h3>${item.snippet.channelTitle}</h3></a>
		</div>`
}

function displayResults (data) {
	const results = data.items.map(function(item) {
		return renderResult(item);
	});
	$('.search-results').html(results);
}

function listenForUserSearch () {
	$('#youtube-search-form').submit(function(event) {
		event.preventDefault();
		const userSearch = $(this).find('#search-bar');
		const userSearchValue = $(this).find('#search-bar').val();
		userSearch.val('');
		getDataFromAPI(userSearchValue, displayResults);
	});
}

function showError () {
  $('.search-results').html(`<p>Sorry. There were no videos that match that search.</p>`);
}

$(listenForUserSearch);