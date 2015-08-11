// add scripts

$(document).on('ready', function() {

  // hide search again form on start
  $('#search-again').hide();

  // handler for search form submission
  $('#tag-search').on('submit', function(event){

    event.preventDefault();

    // container for img urls
    var imageURLs = [];
    var searchString = $('#tag_query').val();
    var searchUrl = 'https://api.instagram.com/v1/tags/' + searchString + "/media/recent";

    // ajax request
    $.ajax({
      url: searchUrl,
      type: 'GET',
      data: {client_id: '7d34415dd5f84098bd0840422bcc181c'},
      dataType: 'jsonp',
      success:function(data){
        // assign returned data to output var
        var output = data.data;
        // clear image container
        $('#image-container').html('');
        // iterate through the returned data, appending images to DOM
        for (var i = 0; i < output.length; i++) {
          imageURLs[i] = output[i].images.low_resolution.url;
          $('#image-container').append('<img src="' + imageURLs[i] + '"/>');
        }
        // clear form input
        $('#tag_query').val('');
        // hide the search form
        $('#search').hide();
        // add search term to DOM
        $('#search-term').html(searchString);
        // show the search again form
        $('#search-again').show();
      },
      error:function(data){
        console.log(data);
        alert("Sorry we're experiencing technical difficulties. Please try again later.");
      }
    });
  });
});
