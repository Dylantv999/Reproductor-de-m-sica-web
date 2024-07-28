document.addEventListener('DOMContentLoaded', function() {
    const playlist = document.getElementById('playlist');
    const audioPlayer = document.getElementById('audio-player');
    const currentTrack = document.getElementById('current-track');
    const playPauseButton = document.getElementById('play-pause');
    const stopButton = document.getElementById('stop');
    const volumeControl = document.getElementById('volume');

    let isPlaying = false;
    let currentSongIndex = -1;
    let canciones = [];

    fetch('/api/canciones')
        .then(response => response.json())
        .then(data => {
            canciones = data;
            canciones.forEach((cancion, index) => {
                const li = document.createElement('li');
                li.textContent = cancion;
                li.addEventListener('click', () => {
                    if (currentSongIndex !== index) {
                        currentSongIndex = index;
                        audioPlayer.src = `canciones/${cancion}`;
                        audioPlayer.play().then(() => {
                            currentTrack.textContent = cancion;
                            playPauseButton.textContent = 'Pause';
                            isPlaying = true;
                            updateActiveTrack();
                        }).catch(error => console.error('Error al reproducir la canción:', error));
                    }
                });
                playlist.appendChild(li);
            });
        })
        .catch(error => console.error('Error al obtener las canciones:', error));

    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseButton.textContent = 'Play';
        } else {
            audioPlayer.play().then(() => {
                playPauseButton.textContent = 'Pause';
            }).catch(error => console.error('Error al reproducir la canción:', error));
        }
        isPlaying = !isPlaying;
    });

    stopButton.addEventListener('click', () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        playPauseButton.textContent = 'Play';
        isPlaying = false;
        updateActiveTrack();
    });

    volumeControl.addEventListener('input', () => {
        audioPlayer.volume = volumeControl.value;
    });

    audioPlayer.addEventListener('play', () => {
        isPlaying = true;
        playPauseButton.textContent = 'Pause';
    });

    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        playPauseButton.textContent = 'Play';
    });

    function updateActiveTrack() {
        const trackItems = playlist.getElementsByTagName('li');
        Array.from(trackItems).forEach((item, index) => {
            if (index === currentSongIndex && isPlaying) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
});
