var queryURL = '';
var search='';
var debugVar = null;
var debugVarBool = null;
var lastDebugVar = null;

var topics = ["cats", "cars", "money", "video games"];
// when this button is clicked, 
// check if topic is in the array, if not
// call buttonBuilder 
// when topics are clicked





var colorArr = ["#DA70D6", "#DAA520", "#DB7093", "#DCDCDC", "#DDA0DD", "#DEB887", "#E0FFFF", "#E6E6FA", "#E9967A", "#EE82EE", "#EEE8AA", "#F08080", "darkgray", "cornsilk", "burlywood", "azure", "beige", "aliceblue", "cadetblue", "mistyrose", "palevioletred"];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function buttonBuilder() {
    // clear button div
    $("#search-terms").empty();

    // repopulate with buttons based on topics length
    for (var i=0; i<topics.length; i++) {
        var thisButton = $("<button>").text(topics[i]);
        
        var myInt = getRandomInt(colorArr.length - 1);
        var myColor = colorArr[myInt];

        thisButton.css({
            "background-color": myColor
        });
        
        thisButton.attr("class", "topics");
        thisButton.attr("data-topic", topics[i]);

        thisButton.appendTo("#search-terms");
    }

    // these listeners need to be here everytime buttons are re-rendered
    // pull and display data from giphy
    $(".topics").on("click", function(event2) { 
        $("#gif-display").empty();

        event2.preventDefault();
        console.log("me too!");

        var topic = $(this).attr("data-topic");
        console.log("this topic is: " + topic);

        // fill page with 10 stills 
        //data[""0""].images.original_still.url

        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=te9EQFqo1Vln8joH3KMgLBMHgYjzOYLk&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            debugVar = response;

            for(var i=0; i<Object.keys(response.data).length; i++) {
                console.log(i);

                // pack in both still and gif links into the gif
                var stillURL = response.data[i].images.fixed_height_still.url;
                var activeURL = response.data[i].images.fixed_height.url;
                var rating = response.data[i].rating;

                // var dataArr = [stillURL, activeURL];
                
                // var anim = false;

                var newDiv = $("<div>");
                newDiv.addClass("gif-div");

                var newImage = $("<img>");
                newImage.addClass("gifs");

                newImage.attr("data-still", stillURL);
                newImage.attr("data-active", activeURL);
                newImage.attr("data-rating", rating);
                newImage.attr("data-animated", 0);

                newImage.attr("src", stillURL);
                
                newImage.appendTo(newDiv);

                $("<p>").text("Rating: " + rating).appendTo(newDiv);
                $("#gif-display").append(newDiv);
            }
            

            $(".gifs").off().on("click", function(event) {
                event.preventDefault();
                
                var chosen = $(this);
                //var anim = false;

                console.log(this);

                lastDebugVar = this;
                
                console.log(this.dataset.animated === false);

                if(this.dataset.animated == 0) {
                    // make it animated
                    chosen.attr("src", this.dataset.active);
                    console.log("this image status is: " + this.dataset.active);
                    chosen.attr("data-animated", 1);
                    
                    chosen.css({
                        "opacity": "1"
                    });
                }
                else { // if is already animated
                    // make it still
                    chosen.attr("src", this.dataset.still);
                    chosen.attr("data-animated", 0);

                    chosen.css({
                        "opacity": "0.65"
                    });
                    // this.dataset.animated = false;
                }

                
                // debugVarBool = anim;
                // alert("click!");
            });
        });
    });
}

$(document).ready(function() {
// run this function initially and then everytime a new term is added
buttonBuilder();

    $("#add-term").on("click", function(event) {
        // add new search term
        console.log("i'm working");
        
        event.preventDefault();

        var topic = $("#search-input").val();
        
        if (topics.indexOf(topic) === -1 && (topic != '')) {
            topics.push(topic);
            buttonBuilder();
        }
        else if(topics.indexOf(topic) > -1){
            alert("This topic is already listed! Please try again.");
        }
        else {
            alert("That is not a valid topic");
        }

    });
}); //end of document ready