


document.addEventListener("DOMContentLoaded", function() {
    // Get elements
    const playlistItems = document.querySelectorAll('.playlist-item');
    const audioPlayer = document.createElement('audio');
    const playButtonIcons = document.querySelectorAll('.play-button i');
    const songTitle = document.querySelector('.active-song-description .song-desc div:first-child');
    const artistName = document.querySelector('.active-song-description .song-desc div:last-child');
    const slider = document.querySelector('#myRange');
    const volumeSlider = document.querySelectorAll('.extras input[type="range"]')[1];

    let currentSongIndex = -1;
    let isPlaying = false;

    // Playlist array - add your song details here
    const playlist = [
        { 
            title: "Burj Khalifa",
            artist: "Nikhita Gandhi",
            audioSrc: "https://a10.gaanacdn.com/gn_img/song/ZaP374RWDy/P37N87ZxKD/size_xxl_1602940505.webp",
        },
        {
            title: "WTF Do I Know",
            artist: "Rosie Lowe",
            audioSrc: "https://example.com/audio2.mp3",
        },
        // Add more songs as needed
    ];

    // Function to play a song
    function playSong(index) {
        if (index === currentSongIndex && isPlaying) {
            audioPlayer.pause();
            isPlaying = false;
            playButtonIcons.forEach(icon => icon.classList.remove('fa-pause'));
            playButtonIcons.forEach(icon => icon.classList.add('fa-play'));
        } else {
            if (currentSongIndex !== index) {
                audioPlayer.src = playlist[index].audioSrc;
                currentSongIndex = index;
            }
            audioPlayer.play();
            isPlaying = true;
            playButtonIcons.forEach(icon => icon.classList.remove('fa-play'));
            playButtonIcons.forEach(icon => icon.classList.add('fa-pause'));
            songTitle.textContent = playlist[index].title;
            artistName.textContent = playlist[index].artist;
        }
    }

    // Event listener for play buttons
    playlistItems.forEach((item, index) => {
        const playButton = item.querySelector('.play-button');
        playButton.addEventListener('click', () => {
            playSong(index);
        });
    });

    // Event listener for volume slider
    volumeSlider.addEventListener('input', function() {
        audioPlayer.volume = volumeSlider.value / 100;
    });

    // Event listener for search functionality (assuming you have a search input)
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', () => {
        const searchText = searchInput.value.toLowerCase();
        playlist.forEach((song, index) => {
            if (song.title.toLowerCase().includes(searchText) || song.artist.toLowerCase().includes(searchText)) {
                playSong(index);
                return;
            }
        });
    });

    // Event listener for slider
    slider.addEventListener('input', function() {
        audioPlayer.currentTime = (audioPlayer.duration / 100) * slider.value;
    });

    // Update slider as song plays
    audioPlayer.addEventListener('timeupdate', function() {
        slider.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    });

    // Handle end of song
    audioPlayer.addEventListener('ended', function() {
        playButtonIcons.forEach(icon => icon.classList.remove('fa-pause'));
        playButtonIcons.forEach(icon => icon.classList.add('fa-play'));
        isPlaying = false;
    });
});
