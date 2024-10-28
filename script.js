// Predefined video data
const videoData = [
    {
        "name": "Example Video 1",
        "url": "https://youtu.be/1ukSR1GRtMU?si=klul6fPKITArGKk4",
        "embedUrl": "https://youtu.be/1ukSR1GRtMU?si=klul6fPKITArGKk4"
    },
    {
        "name": "Example Video 2",
        "url": "https://youtu.be/3fumBcKC6RE",
        "embedUrl": "https://youtu.be/bKueYVtV0eA?si=q9xhLuuVxUB6UVGA"
    },
    {
        "name": "Example Video 3",
        "url": "https://youtu.be/oHg5SJYRHA0",
        "embedUrl": "https://youtu.be/LtlsX_lCfK4?si=0vwnhpw8tfZ6V4sq"
    }
];

// Store the YouTube players
let players = [];

// Create YouTube players for each video
function onYouTubeIframeAPIReady() {
    videoData.forEach((video, index) => {
        const player = new YT.Player(`player${index}`, {
            height: '315',
            width: '100%',
            videoId: video.embedUrl.split('/').pop(), // Extract video ID
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
        players.push(player);
    });
}

// Handle player state changes
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        // Pause all other players
        players.forEach((player) => {
            if (player !== event.target) {
                player.pauseVideo();
            }
        });
    }
}

// Automatically load the predefined videos
document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.getElementById('videoContainer');

    // Create a div for each video and display the video names
    videoData.forEach((video, index) => {
        // Create a div for the video player
        const videoDiv = document.createElement('div');
        videoDiv.id = `player${index}`; // Unique ID for each player
        videoContainer.appendChild(videoDiv);

        // Create a span for the video name
        const videoName = document.createElement('span');
        videoName.textContent = video.name;

        // Append the video name below the player
        videoContainer.appendChild(videoName);
    });

    // Populate the predefined video list
    const videoListContainer = document.getElementById('video-list');
    videoData.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        
        // Create a link to the video
        const videoLink = document.createElement('a');
        videoLink.href = video.url;
        videoLink.target = '_blank';
        videoLink.textContent = video.name;

        // Append the link to the video item
        videoItem.appendChild(videoLink);
        
        // Append the video item to the video list container
        videoListContainer.appendChild(videoItem);
    });
});
