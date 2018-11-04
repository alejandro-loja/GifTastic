$(document).ready(function () {
    console.log("ready!");
    var hello = 0;

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

            $('#gifs-appear-here').empty();

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
                    var animate = results[i].images.fixed_height.url
                    var still = results[i].images.fixed_height_still.url;
                    gameImage.attr("src", still);
                    gameImage.attr("data-still", still);
                    gameImage.attr("data-animate", animate);
                    gameImage.addClass('gif');
                    gameImage.attr('data-state', 'still');

                    gameDiv.append(gameImage);
                    gameDiv.append(p);
                    $("#gifs-appear-here").prepend(gameDiv);
                }
                toAnimate();
            }); //.then
        }); //click
    }


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

    function toAnimate() {
        $(".gif").on("click", function () {
            console.log('clicked');
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else if (state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    };

    renderButtons();
    addAjaxToButtons();

}); //the end