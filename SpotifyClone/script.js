document.addEventListener('DOMContentLoaded', () => {
    let folder1 = null;
    let audio = null;
    let state = 0;
    let indexi = 0;
    let currentVolume = parseFloat(localStorage.getItem('audioVolume')) || 1; // Default volume is 1
    let songs = [];

    async function getsongs() {
        let a = await fetch(`Assets/Audio/${folder1}`);
        let response = await a.text();
        console.log(response);
        let div = document.createElement('div');
        div.innerHTML = response;
        let as = div.getElementsByTagName('a');
        console.log(as);
        let songli = [];
        let songs = [];
        for (const b of as) {
            if (b.innerHTML !== '../') {
                console.log(b.innerHTML);
                songli.push(b.innerHTML);
            }
        }
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith('mp3')) {
                songs.push(element.href);
            }
        }
        return [songs, songli];
    }

    async function main() {
        songs = await getsongs();  // Fetch songs and store globally
        console.log(songs);

        let songul = document.querySelector('.songlist ul');
        songul.innerHTML = '';
        for (const song1 of songs[1]) {
            songul.innerHTML += `
                <li>
                    <img class="musicimg" src="Assets/Images/music.svg" alt="music">
                    <div class="songinfo">
                        <div>${song1}</div>
                        <div>Song Artist</div>
                    </div>
                    <div class="playnow">
                        <img class='player' src="Assets/Images/play1.svg" alt="">
                        <p>Play Now</p>
                    </div>
                </li>`;
        }

        addPlayListeners();
    }

    function addPlayListeners() {
        let x = document.querySelectorAll('.songlist li');
        x.forEach((iterator, index) => {
            let y = iterator.querySelector('.player');
            y.addEventListener('click', () => {
                indexi = index; // Update indexi correctly on click
                if (index !== -1 && index < songs[0].length) {
                    clearAudio(); // Clear existing audio before playing new one
                    audio = new Audio(songs[0][index]);
                    let name = songs[1][index];
                    let setter = document.querySelector('.sname');
                    setter.textContent = name;
                    setupAudioEvents(audio);
                    audio.play().catch(error => {
                        console.error('Error playing audio:', error);
                    });
                    state = 1;
                    let play = document.getElementById('playbtn');
                    play.src = 'Assets/Images/pause.svg';
                } else {
                    console.error('Song index out of range or not found');
                }
            });
        });
    }

    function setupAudioEvents(audio) {
        audio.volume = currentVolume; // Set initial volume

        audio.addEventListener('loadedmetadata', () => {
            let totalDuration = document.getElementById('totalDuration');
            totalDuration.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
            let currentTime = document.getElementById('currentTime');
            currentTime.textContent = formatTime(audio.currentTime);
            let circle = document.querySelector('.circle');
            if (circle && audio.duration > 0) {
                circle.style.left = ((audio.currentTime / audio.duration) * 100) + '%';
            }
        });

        audio.addEventListener('ended', () => {
            playNext(); // Automatically play the next song when current song ends
        });

        document.querySelector('.seekbar').addEventListener('click', e => {
            let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            document.querySelector('.circle').style.left = percent + '%';
            audio.currentTime = ((audio.duration) * percent) / 100;
        });
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function clearAudio() {
        if (audio) {
            audio.pause();
            audio.src = '';
            audio.load(); // Reset the audio element
            audio = null;
        }
    }

    function playNext() {
        if (indexi + 1 !== -1 && indexi + 1 < songs[0].length) {
            clearAudio(); // Clear existing audio before playing new one
            audio = new Audio(songs[0][indexi + 1]);
            let name = songs[1][indexi + 1];
            let setter = document.querySelector('.sname');
            setter.textContent = name;
            setupAudioEvents(audio);
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            indexi++;
            state = 1;
            let play = document.getElementById('playbtn');
            play.src = 'Assets/Images/pause.svg';
        } else {
            console.error('Song index out of range or not found');
        }
    }

    function playPrevious() {
        if (indexi - 1 !== -1 && indexi - 1 < songs[0].length) {
            clearAudio(); // Clear existing audio before playing new one
            audio = new Audio(songs[0][indexi - 1]);
            let name = songs[1][indexi - 1];
            let setter = document.querySelector('.sname');
            setter.textContent = name;
            setupAudioEvents(audio);
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            indexi--;
            state = 1;
            let play = document.getElementById('playbtn');
            play.src = 'Assets/Images/pause.svg';
        } else {
            console.error('Song index out of range or not found');
        }
    }

    document.getElementById('playbtn').addEventListener('click', () => {
        if (state === 1 && audio) {
            audio.pause();
            state = 0;
            let pause = document.getElementById('playbtn');
            pause.src = 'Assets/Images/play1.svg';
        } else if (audio) {
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            state = 1;
            let play = document.getElementById('playbtn');
            play.src = 'Assets/Images/pause.svg';
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        playNext(); // Play the next song on button click
    });

    document.getElementById('prev').addEventListener('click', () => {
        playPrevious(); // Play the previous song on button click
    });

    document.querySelector('.circle1').style.left = (currentVolume * 100) + '%';
    document.querySelector('.volbar').addEventListener('click', e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector('.circle1').style.left = percent + '%';
        currentVolume = percent / 100;
        localStorage.setItem('audioVolume', currentVolume); // Save the volume to local storage
        if (audio != null) {
            audio.volume = currentVolume;
        }
    });

    Array.from(document.getElementsByClassName('card')).forEach(e => {
        e.addEventListener('click', async item => {
            folder1 = item.currentTarget.dataset.folder;
            console.log(folder1);
            main();
        });
    });

    main();
});
