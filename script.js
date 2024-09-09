const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'music/years.mp3',
        displayName: '7 years',
        cover: 'Images/years.jpg',
        artist: 'LUKAS GRAHAM',
    },
    {
        path: 'music/lmly.mp3',
        displayName: 'Let Me Love You',
        cover: 'images/lmly.jpg',
        artist: 'JUSTIN BIEBER ft DJ SNAKE',
    },
    {
        path: 'music/luciddreams.mp3',
        displayName: 'Lucid Dream',
        cover: 'images/luciddreams.jpg',
        artist: 'JUICE WORLD',
    },
    {
        path: 'music/hope.mp3',
        displayName: 'Hope',
        cover: 'images/Hope.jpg',
        artist: 'XXXTENTACION',
    },
    {
        path: 'music/skyami.mp3',
        displayName: 'Skyami',
        cover: 'images/skyami.jpg',
        artist: 'OFFSET',
    },
    {
        path: 'music/body.mp3',
        displayName: 'Body',
        cover: 'images/body.jpg',
        artist: 'TION WAYNE',
    },
    {
        path: 'music/sprinter.mp3',
        displayName: 'Sprinter',
        cover: 'images/sprinter.jpg',
        artist: 'CENTRAL CEE',
    },
    {
        path: 'music/rapgod.mp3',
        displayName: 'Rap God',
        cover: 'images/rapgod.jpg',
        artist: 'EMINEM',
    },
    {
        path: 'music/thebox.mp3',
        displayName: 'The Box',
        cover: 'images/thebox.jpg',
        artist: 'RODDY RICH',
    },
    {
        path: 'music/edoncast.mp3',
        displayName: 'E Don Cast',
        cover: 'images/edoncast.jpg',
        artist: 'SHALIPOPI',
    },
    {
        path: 'music/thenight.mp3',
        displayName: 'The Night',
        cover: 'images/thenight.jpg',
        artist: 'Avicil',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
    pauseMusic();
}else{
    playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).
    padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime/ 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
