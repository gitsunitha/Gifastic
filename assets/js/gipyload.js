var categories = [
    "petit-fours",
    "croissants",
    "scones",
    "sandwiches",
    "muffins",
    "pastries",
    "coffee",
    "tea",
    "milk",
    "cold-brew",
];
var globalTotalGifs = 0;

function renderButtons(categoryList) {
    // TBD
    //check if argument provided and if not create a message
    //if present but empty resume with the rest of the code

    // Deleting the earlier buttons prior to adding new  buttons

    $("#buttons-view").empty();

    // Create a button for each category
    for (var i = 0; i < categoryList.length; i++) {
        var a = $("<button>");
        a.addClass("category-btn");
        a.addClass("btn btn-large btn-success");
        a.attr("data-name", categoryList[i]);
        a.text(categoryList[i]);
        $("#buttons-view").append(a);
    }
}

function renderGifs(gifUrl, gifTitle, gifStill, gifAnimate, gifRating) {
    var gifDiv = $("<div>");

    gifDiv.addClass("data-number-" + globalTotalGifs);
    if (gifUrl) {
        // Creating an image tag
        var categoryGifImg = $("<img>");
        categoryGifImg.addClass("gifImageClass");
        categoryGifImg.attr("src", gifUrl);
        categoryGifImg.attr("data-state", "still");
        categoryGifImg.attr("data-number", globalTotalGifs + 1);
        if (gifStill) {
            categoryGifImg.attr("data-animate", gifStill);
        }
        if (gifAnimate) {
            categoryGifImg.attr("data-still", gifAnimate);
        }
        gifDiv.append(categoryGifImg);

        if (gifTitle) {
            var pt = $("<p>").html("<h4>Title: " + gifTitle + "</h4>");
            // Appending the paragraph and img to the "gifDiv" div we created
            gifDiv.append(pt);
        }
        if (gifRating) {
            var pr = $("<p>").html("<h5>Rating: " + gifRating + "</h5>");
            // Appending the paragraph and img to the "gifDiv" div we created
            gifDiv.append(pr);
        }

        //debugger;

        $(".display-gifs").append(gifDiv);
    }
}

function callAPI(apicategory, offset) {
    debugger;

    // placeholderqueryURL for Giphy API
    //need a try catch block for errors
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL =
        "https://api.giphy.com/v1/gifs/search?api_key=RjElQAEGGagMFuUUSfuBOxiT4nxQmOOD&q=" +
        apicategory +
        "&limit=5&offset=" +
        offset +
        "&rating=G&lang=en";

    console.log(queryURL);
    // var queryURL =
    //     "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";

    $.ajax({
        url: queryURL,
        method: "GET",
        async: false,
        error: function(err) {
            console.log(err);
            alert("GIFs requested could not be returned");
        },
    }).then(function(response) {
        //return the response
        // return response.data;
        debugger;
        console.log(response);
        console.log(response.data);
        requiredArray = response.data;
        console.log(requiredArray.length);
        for (var i = 0; i < requiredArray.length; i++) {
            renderGifs(
                requiredArray[i].images.fixed_width_small_still.url,
                requiredArray[i].title,
                requiredArray[i].images.fixed_width_small.url,
                requiredArray[i].images.fixed_width_small_still.url,
                requiredArray[i].rating
            );
            globalTotalGifs = globalTotalGifs + 1;

            // var gifDiv = $("<div>");

            // var rating = requiredArray[i].rating;

            // var p = $("<p>").text("Rating: " + rating);

            // // Creating an image tag
            // var categoryGifImg = $("<img>");

            // categoryGifImg.attr("src", requiredArray[i].images.fixed_height.url);

            // // Appending the paragraph and personImage we created to the "gifDiv" div we created
            // gifDiv.append(p);
            // gifDiv.append(categoryGifImg);

            // //debugger;

            // // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            // $(".display-gifs").append(gifDiv);
        }

        // Onces some gis are displayed
        //add more or less buttons
        if (globalTotalGifs > 0) {
            $(".category-more").attr("data-name", apicategory);
            $(".category-more").show();
            $(".category-less").attr("data-name", apicategory);
            $(".category-less").show();
        }
    });
    // //return an array with appropriate error response
    // var emptyResponse = [];

    // return emptyResponse;
}

// function displayGiphs(displaycategory) {
//     //calls the api
//     var gifresponse = [];
//     var gifresponse = callAPI(displaycategory);
//     //displays the giphs
//     console.log(gifresponse);

//     // Looping over every result item
//     for (var i = 0; i < gifresponse.length(); i++) {
//         var gifDiv = $("<div>");

//         var rating = gifresponse[i].rating;

//         var p = $("<p>").text("Rating: " + rating);

//         // Creating an image tag
//         var categoryGifImg = $("<img>");

//         categoryGifImg.attr("src", gifresponse[i].images.fixed_height.url);

//         // Appending the paragraph and personImage we created to the "gifDiv" div we created
//         gifDiv.append(p);
//         gifDiv.append(categoryGifImg);

//         // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
//         $("#display-gifs").prepend(gifDiv);
//     }
// }

$(document).ready(function() {
    //$(".display-moreless-section".hide());
    $(".category-more").hide();
    $(".category-less").hide();
    renderButtons(categories);
    $("#select-category").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var newCategory = $("#category-input").val().trim();
        // The movie from the textbox is then added to our array
        categories.push(newCategory);

        debugger;
        // calling renderButtons which handles the processing of our movie array
        renderButtons(categories);
    });
    // $(".category-btn").on("click", function(event) {
    //     debugger;
    //     $(".display-gifs").empty();
    //     console.log("display-gif-section");
    //     var categoryName = $(this).attr("data-name");
    //     callAPI(categoryName, 0);
    //     if (globalTotalGifs > 0) {
    //         $(".category-more").attr("data-name", categoryName);
    //         $(".category-more").show();
    //         $(".category-less").attr("data-name", categoryName);
    //         $(".category-less").show();
    //     }
    // });
});

$(document).on("click", ".category-btn", function() {
    debugger;
    //reset divs and the global variables
    $(".display-gifs").empty();
    globalTotalGifs = 0;
    console.log("display-gif-section");
    callAPI($(this).attr("data-name"), 0);
    // Onces some gis are displayed
    //add more or less buttons
    if (globalTotalGifs > 0) {
        $(".category-more").attr("data-name", categoryName);
        $(".category-more").show();
        $(".category-less").attr("data-name", categoryName);
        $(".category-less").show();
    }
});

$(document).on("click", ".add-to-favorites", function() {
    debugger;
    var favobj = {
        category: categoryName,
        //        giphyurl:
    };
    localStorage.setItem("favs", JSON.stringify(favobj));
});

$(document).on("click", ".display-favorites", function() {
    debugger;
    localStorage.getItem("favs", JSON.stringify(favobj));
    var favList = JSON.parse(localStorage.getItem("favs"));
    $(".display-gifs").empty();

    for (var i = 0; i < favList.length; i++) {
        renderGifs(
            favList[i].giphyUrl,
            favList[i].title,
            favList[i].animUrl,
            favList[i].stillURL
        );

        // var gifDiv = $("<div>");

        // // Creating an image tag
        // var categoryGifImg = $("<img>");
        // categoryGifImg.addClass("gifImageClass");
        // categoryGifImg.attr("src", favList[i].giphyUrl);
        // categoryGifImg.attr("title", favList[i].giphyUrl);
        // categoryGifImg.attr("data-animate", favList[i].giphyUrl);
        // categoryGifImg.attr("data-still", favList[i].giphyUrl);

        // // Appending the paragraph and img to the "gifDiv" div we created
        // gifDiv.append(p);
        // gifDiv.append(categoryGifImg);

        // //debugger;

        // $(".display-gifs").append(gifDiv);
    }
});

$(document).on("click", ".gifImageClass", function() {
    //check if animated; if annimated show still image
    //else show animation
    debugger;
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".category-more", function() {
    //more button: should display the next 5

    //check global variable for the number displayed
    //call API with that number as the offset

    console.log("display-gif-section");
    callAPI($(this).attr("data-name"), globalTotalGifs);
});

$(document).on("click", ".category-less", function() {
    //less button: should remove the last 5

    //check global variable for the number displayed
    //remove last 10 gifs
    debugger;
    console.log("display-gif-section");

    var numberToRemove = globalTotalGifs >= 5 ? 5 : globalTotalGifs;

    for (
        let index = globalTotalGifs - 1; index > globalTotalGifs - numberToRemove - 1; index--
    ) {
        var removeDiv = ".data-number-" + index;
        $(removeDiv).remove();
    }

    globalTotalGifs = globalTotalGifs - numberToRemove;
    if (globalTotalGifs === 0) {
        $(".category-less").hide();
    }
});