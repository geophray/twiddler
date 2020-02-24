$(document).ready(function () {
    var $feed = $('#feed');
    $feed.html('');
    var stream = streams.home;
    var index = streams.home.length - 1;
    generateTwiddleFeed(stream, index, $feed);
});

function generateTwiddleFeed(stream, index, feed) {
    while (index >= 0) {
        var twiddle = stream[index];
        var $twiddle = $('<div class="twiddle"></div>');
        // Add the profile pic of the twiddler
        var $profileImg = $('<div class="twiddle-image"><img src="images/' + twiddle.user + '.png"></div>');
        $profileImg.appendTo($twiddle);
        // Add the main body of the twiddle
        var $mainBody = $('<div class="twiddle-main"></div>');
        $mainBody.appendTo($twiddle);
        // Create twiddleMain heading area
        var $twiddleHeading = $('<div class="twiddle-head"></div>');
        var $username = $('<span class="user-name">@' + twiddle.user + '</span>');
        $username.appendTo($twiddleHeading);
        var $publishDate = $('<span class="date-published">' + twiddle.created_at.toLocaleString() + '</span>');
        $publishDate.appendTo($twiddleHeading);
        // Create twiddle message
        var $twiddleBody = $('<div class="twiddle-body">' + twiddle.message + '</div>'); 

        // Append heading and body to mainBody
        $twiddleHeading.appendTo($mainBody);
        $twiddleBody.appendTo($mainBody);
        // $twiddle.text('@' + twiddle.user + ': ' + twiddle.message);
        $twiddle.appendTo(feed);
        index -= 1;
    }
}