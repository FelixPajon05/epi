
// ─── CURSOR ───
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

function lerpRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(lerpRing);
}
lerpRing();

document.querySelectorAll('a, button, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(2)';
        ring.style.width = '56px'; ring.style.height = '56px';
        ring.style.borderColor = 'var(--yellow)';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.width = '36px'; ring.style.height = '36px';
        ring.style.borderColor = 'var(--green)';
    });
});

// ─── MATRIX CANVAS ───
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
const chars = 'EPI∑∫∇∂∞λπφθΩαβγδεζηFxdydz01{}[]<>=+-*/&|!0101';

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const cols = Math.floor(window.innerWidth / 16);
const drops = Array(cols).fill(0);

function drawMatrix() {
    ctx.fillStyle = 'rgba(8,11,16,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#2979ff';
    ctx.font = '13px Space Mono, monospace';

    drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        else drops[i]++;
    });
}
setInterval(drawMatrix, 55);

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ─── NEWSLETTER ───
function handleSubscribe(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = 'COMMIT! ✓';
    btn.style.background = 'var(--green)';
    btn.style.color = 'var(--bg)';
    e.target.querySelector('input').value = '';
    setTimeout(() => {
        btn.textContent = 'PUSH →';
        btn.style.background = '';
        btn.style.color = '';
    }, 3000);
}

// ─── NAV SCROLL ───
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.style.background = window.scrollY > 50
        ? 'rgba(8,11,16,0.95)'
        : 'rgba(8,11,16,0.75)';
});