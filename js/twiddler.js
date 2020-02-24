// Load initial tweets from the Home stream
$(document).ready(function () {
    var $feed = $('#feed');
    $feed.html('');
    var stream = streams.home;
    var index = streams.home.length - 1;
    generateTwiddleFeed(stream, index, $feed);

    // Load home feed when the home link or twiddler is clicked
    $("#home, #twiddler-logo").click(function () {
        loadHomeFeed($feed);
    });

    // Load following feed when the home link is clicked
    $("#following").click(function () {
        $("#following").addClass("active").siblings().removeClass("active");
        $feed.html('');
        stream = streams.users;
        index = streams.users.length - 1;
        generateTwiddleFeed(stream, index, $feed);
    });
});

// Function for passing stream/index/feed parameters to generate unique feeds
function generateTwiddleFeed(stream, index, feed) {
    while (index >= 0) {
        // Create variables for generating a twiddle
        var twiddle = stream[index];
        var $twiddle = $('<div class="twiddle"></div>');
        var $profileImg = $('<div class="twiddle-image"><img src="images/' + twiddle.user + '.png"></div>');
        var $mainBody = $('<div class="twiddle-main"></div>');
        var $twiddleHeading = $('<div class="twiddle-head"></div>');
        var $username = $('<span class="user-name">@<span class="user">' + twiddle.user + '</span></span>');
        var locale = "en-US";
        var options = {};
        var $publishDate = $('<span class="date-published">' + twiddle.created_at.toLocaleString(locale, options) + '</span>');
        var $twiddleBody = $('<div class="twiddle-body">' + twiddle.message + '</div>'); 

        // Add the profile pic of the twiddler
        $profileImg.appendTo($twiddle);

        // Add the main body of the twiddle
        $mainBody.appendTo($twiddle);

        // Create twiddleMain heading area
        $username.appendTo($twiddleHeading);
        $publishDate.appendTo($twiddleHeading);

        // Append heading and body to mainBody
        $twiddleHeading.appendTo($mainBody);
        $twiddleBody.appendTo($mainBody);

        // Append new twiddle to bottom of feed
        $twiddle.appendTo(feed);

        // Decrement the index
        index -= 1;
    }
}

// Load the home feed
function loadHomeFeed($feed) {
    $("#home").addClass("active").siblings().removeClass("active");
    $("h1").text("Home");
    $feed.html('');
    stream = streams.home;
    index = streams.home.length - 1;
    generateTwiddleFeed(stream, index, $feed);
}


