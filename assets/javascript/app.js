$(document).ready(function () {
    console.log("ready!");

    var topics = ["Nintendo", "PlayStation", "Pong", "GameCube", "Television"];


    function renderButtons() {
        $('.topics').empty();

        topics.forEach(function (topic) {
            console.log(topic);
            var newButton = $('<button>');
            newButton.attr('data-game', topic);
            newButton.text(topic);
            $('.topics').append(newButton);

        });
    };

    function addAjaxToButtons() {
        $("button").on("click", function () {

            var game = $(this).attr("data-game");
            var apiKey = "&api_key=qJWbGgKs7abYfvr3kMg2GDV1FX7b9wvx"; //my key
            var limit = "&limit=10";

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                game + apiKey + limit;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(queryURL);

                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var rating = results[i].rating;
                    var rating = rating.toUpperCase();
                    var gameDiv = $("<div>");
                    gameDiv.addClass("gif-plus-img");

                    var p = $("<p>").text("Rating: " + rating);
                    p.addClass("rating");

                    var gameImage = $("<img>");
                    gameImage.attr("src", results[i].images.fixed_height.url);

                    gameDiv.append(gameImage);
                    gameDiv.append(p);
                    $("#gifs-appear-here").prepend(gameDiv);
                }
            }); //.then
        }); //click
    }
    renderButtons();
    addAjaxToButtons();

    $("#add-button").on("click", function (event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();

        if (topics.indexOf(topic) < 0) {
            console.log(topic);
            topics.push(topic);

            renderButtons();
            addAjaxToButtons();
        };
    });

}); //the end