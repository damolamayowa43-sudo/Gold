function enterSite() {
    const overlay = document.getElementById('welcome-overlay');
    const content = document.getElementById('main-content');
    const audio = document.getElementById('bg-music');

    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    content.style.opacity = '1';

    audio.play().catch(e => console.log("Audio playback blocked:", e));

    launchFireworks();
}

function switchTab(evt, tabId) {
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    contents.forEach(content => {
        content.classList.remove('active');
    });

    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function toggleAccordion(element) {
    element.classList.toggle('open');
}

function toggleFlame() {
    const flame = document.getElementById('flame');
    flame.classList.toggle('off');
}

function loadPhoto(event) {
    const frame = document.getElementById('photo-display');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            frame.innerHTML = `
                <img
                    src="${e.target.result}"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                        border-radius:10px;
                    ">
            `;
        };

        reader.readAsDataURL(file);
    }
}

function toggleAudio() {
    const audio = document.getElementById('bg-music');

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
