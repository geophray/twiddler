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

    // Load feed of an individual user when their username is clicked
    $("#feed").on('click', '.user-name', function () {
        var user = event.target.textContent;
        var username = user.slice(1, user.length);
        loadUserFeed(username, $feed);
    });
    
    // Load feed of an individual user when their profile image is clicked
    $("#feed").on('click', '.twiddle-image', function () {
        var username = event.target.title;
        loadUserFeed(username, $feed);
    });

    // Load following feed when the home link is clicked
    $("#following").click(function () {
        loadFollowing($feed);
    });
});



// Function for passing stream/index/feed parameters to generate unique feeds
function generateTwiddleFeed(stream, index, feed) {
    while (index >= 0) {
        // Create variables for generating a twiddle
        var twiddle = stream[index];
        var $twiddle = $('<div class="twiddle"></div>');
        var $profileImg = $('<div class="twiddle-image"><img src="images/' + twiddle.user + '.png" title="' + twiddle.user + '"></div>');
        var $mainBody = $('<div class="twiddle-main"></div>');
        var $twiddleHeading = $('<div class="twiddle-head"></div>');
        var $username = $('<span class="user-name">@' + twiddle.user + '</span>');
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

// Function for generating list of followed users
function generateFollowedUsers(stream, $feed) {
    for ( user in stream) {
        var currentFeed = stream[user];
        var twiddle = currentFeed[currentFeed.length-1];
        var $twiddle = $('<div class="twiddle"></div>');
        var $profileImg = $('<div class="twiddle-image"><img src="images/' + user + '.png" title="' + user + '"></div>');
        var $mainBody = $('<div class="twiddle-main"></div>');
        var $twiddleHeading = $('<div class="twiddle-head"></div>');
        var $username = $('<span class="user-name">@' + user + '</span>');
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
        $twiddle.appendTo($feed);
    }
}

// Load the home feed
function loadHomeFeed($feed) {
    $feed.html('');
    $("#home").addClass("active").siblings().removeClass("active");
    $("h1").text("Home");
    stream = streams.home;
    index = stream.length - 1;
    generateTwiddleFeed(stream, index, $feed);
}

// Load the individual users feed
function loadUserFeed(username, $feed) {
    $feed.html('');
    $("ul").children().removeClass("active");
    $("h1").text("@" + username);
    stream = streams.users[username];
    index = stream.length - 1;
    generateTwiddleFeed(stream, index, $feed);
}

function loadFollowing($feed) {
    $feed.html('');
    $("#following").addClass("active").siblings().removeClass("active");
    $("h1").text("People You Follow");
    stream = streams.users;
    generateFollowedUsers(stream, $feed);
}

