const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const particles = [];
const fireworks = [];

const colors = [
    '#FFD700',
    '#FF1493',
    '#00FFFF',
    '#FF4500',
    '#9400D3',
    '#FFFFFF'
];

for (let i = 0; i < 90; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
    });
}

function triggerCelebration() {
    launchFireworks();
}

function launchFireworks() {

    for (let f = 0; f < 6; f++) {

        setTimeout(() => {

            const cx = Math.random() * (width - 200) + 100;
            const cy = Math.random() * (height / 2) + 100;

            for (let i = 0; i < 35; i++) {

                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 6 + 2;

                fireworks.push({
                    x: cx,
                    y: cy,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: 1
                });

            }

        }, f * 250);

    }

}

function renderFX() {

    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {

        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;

        ctx.moveTo(
            p.x + p.tilt + p.r / 2,
            p.y
        );

        ctx.lineTo(
            p.x + p.tilt,
            p.y + p.tilt + p.r / 2
        );

        ctx.stroke();

    });

    fireworks.forEach((fw, index) => {

        fw.x += fw.vx;
        fw.y += fw.vy;
        fw.alpha -= 0.015;

        ctx.save();

        ctx.globalAlpha = Math.max(fw.alpha, 0);

        ctx.fillStyle = fw.color;

        ctx.beginPath();
        ctx.arc(
            fw.x,
            fw.y,
            3,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

        if (fw.alpha <= 0) {
            fireworks.splice(index, 1);
        }

    });

    requestAnimationFrame(renderFX);

}

renderFX();
