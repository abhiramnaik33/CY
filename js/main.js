/* ============================================
   CYBERSECURITY DEPARTMENT - MAIN JS
   v2.0 — Particle effects, counter animation,
   active nav tracking, typing effect, progress ring
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

    // === PRELOADER ===
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
        }, 800);
    });
    // Fallback if load already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
        }, 800);
    }

    // === HAMBURGER MENU ===
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // === STICKY HEADER SCROLL ===
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // === ACTIVE NAV LINK ON SCROLL ===
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    function updateActiveNav() {
        let current = '';
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();


    // (Hero slider removed — using split-layout with animated shield)

    // === MATRIX RAIN EFFECT ===
    const matrixCanvas = document.getElementById('matrixRain');
    if (matrixCanvas) {
        const mCtx = matrixCanvas.getContext('2d');
        function resizeMatrix() {
            matrixCanvas.width = matrixCanvas.offsetWidth;
            matrixCanvas.height = matrixCanvas.offsetHeight;
        }
        resizeMatrix();
        window.addEventListener('resize', resizeMatrix);

        const chars = 'アカサタナハマヤラワガザダバパ0123456789ABCDEF<>/{}[];';
        const fontSize = 14;
        let columns = Math.floor(matrixCanvas.width / fontSize);
        let drops = Array(columns).fill(1);

        function drawMatrix() {
            mCtx.fillStyle = 'rgba(2, 12, 27, 0.05)';
            mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            mCtx.fillStyle = '#00d4ff';
            mCtx.font = fontSize + 'px JetBrains Mono, monospace';
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            requestAnimationFrame(drawMatrix);
        }
        drawMatrix();
        window.addEventListener('resize', () => {
            columns = Math.floor(matrixCanvas.width / fontSize);
            drops = Array(columns).fill(1);
        });
    }

    // === TERMINAL LINE-BY-LINE REVEAL ===
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        const lines = terminalBody.querySelectorAll('.terminal-line');
        lines.forEach((line, i) => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-10px)';
            line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, 1800 + (i * 350));
        });
    }

    // === HERO TYPING EFFECT ===
    const typingEl = document.getElementById('heroTyping');
    if (typingEl) {
        const phrases = [
            'Building professionals for a safer digital future.',
            'Innovating in Cyber Defense & Digital Forensics.',
            'Empowering students with ethical hacking skills.',
            'Leading research in AI-driven security systems.'
        ];
        let phraseIdx = 0, charIdx = 0, isDeleting = false;
        function typeEffect() {
            const current = phrases[phraseIdx];
            if (isDeleting) {
                typingEl.textContent = current.substring(0, charIdx--);
            } else {
                typingEl.textContent = current.substring(0, charIdx++);
            }
            let speed = isDeleting ? 30 : 50;
            if (!isDeleting && charIdx === current.length + 1) {
                speed = 2500;
                isDeleting = true;
            } else if (isDeleting && charIdx < 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                speed = 400;
            }
            setTimeout(typeEffect, speed);
        }
        typeEffect();
    }

    // === HERO PARTICLES ===
    const particleCanvas = document.getElementById('heroParticles');
    if (particleCanvas) {
        const ctx = particleCanvas.getContext('2d');
        let particles = [];
        function resizeCanvas() {
            particleCanvas.width = particleCanvas.offsetWidth;
            particleCanvas.height = particleCanvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * particleCanvas.width;
                this.y = Math.random() * particleCanvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        const count = Math.min(80, Math.floor(particleCanvas.width * particleCanvas.height / 15000));
        for (let i = 0; i < count; i++) particles.push(new Particle());

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // === GALLERY LIGHTBOX ===
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lbCounter = document.getElementById('lbCounter');
    let lbIndex = 0;
    let galleryArr = Array.from(galleryImages);

    galleryImages.forEach((img, i) => {
        img.addEventListener('click', () => {
            lbIndex = i;
            lightboxImg.src = img.src;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
            updateLbCounter();
        });
    });

    function updateLbCounter() {
        if (lbCounter) lbCounter.textContent = `${lbIndex + 1} / ${galleryArr.length}`;
    }

    window.closeLightbox = function () {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    };
    window.nextLb = function () {
        lbIndex = (lbIndex + 1) % galleryArr.length;
        lightboxImg.src = galleryArr[lbIndex].src;
        updateLbCounter();
    };
    window.prevLb = function () {
        lbIndex = (lbIndex - 1 + galleryArr.length) % galleryArr.length;
        lightboxImg.src = galleryArr[lbIndex].src;
        updateLbCounter();
    };
    if (lightbox) {
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    }
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLb();
        if (e.key === 'ArrowLeft') prevLb();
    });

    // === SCROLL TO TOP + PROGRESS RING ===
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const progressCircle = document.querySelector('.scroll-progress-ring .progress');
    const circumference = progressCircle ? 2 * Math.PI * 24 : 0;
    if (progressCircle) {
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;
    }

    window.addEventListener('scroll', () => {
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        }
        // Update progress ring
        if (progressCircle) {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = window.scrollY / scrollHeight;
            const offset = circumference - (scrollPercent * circumference);
            progressCircle.style.strokeDashoffset = offset;
        }
    });
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === ANIMATED COUNTER (Stats) ===
    const counters = document.querySelectorAll('[data-count]');
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        counters.forEach(counter => {
            const target = counter.getAttribute('data-count');
            const prefix = counter.getAttribute('data-prefix') || '';
            const suffix = counter.getAttribute('data-suffix') || '';
            const isNumeric = /^\d+$/.test(target);
            if (!isNumeric) {
                counter.textContent = prefix + target + suffix;
                return;
            }
            const end = parseInt(target);
            const duration = 2000;
            const steps = 60;
            const increment = end / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= end) {
                    current = end;
                    clearInterval(timer);
                }
                counter.textContent = prefix + Math.floor(current) + suffix;
            }, duration / steps);
        });
        countersAnimated = true;
    }
    // Observe stats section
    const statsSection = document.getElementById('placements');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    }

    // === SCROLL ANIMATIONS with stagger ===
    const faders = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    faders.forEach(el => fadeObserver.observe(el));

    // === FACULTY ROLES TOGGLE ===
    const toggleRolesBtn = document.getElementById('toggleRolesBtn');
    const rolesSection = document.getElementById('facultyRoles');
    if (toggleRolesBtn && rolesSection) {
        toggleRolesBtn.addEventListener('click', () => {
            const isVisible = rolesSection.style.display !== 'none';
            rolesSection.style.display = isVisible ? 'none' : 'block';
            if (isVisible) {
                toggleRolesBtn.innerHTML = '<i class="fas fa-tasks"></i> Show Faculty Roles & Responsibilities';
            } else {
                toggleRolesBtn.innerHTML = '<i class="fas fa-times"></i> Hide Faculty Roles & Responsibilities';
            }
        });
    }

    // === CONTACT FORM ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, var(--neon-green), #00b894)';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 2500);
        });
    }

    // === GALLERY FILTER TABS ===
    const filterTabs = document.querySelectorAll('.gallery-tab');
    const galleryGrid = document.querySelector('.gallery-grid');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.getAttribute('data-filter');
            const images = galleryGrid.querySelectorAll('img');
            images.forEach(img => {
                const category = img.getAttribute('data-category') || 'all';
                if (filter === 'all' || category === filter) {
                    img.style.display = '';
                    img.style.animation = 'zoomIn 0.3s ease-out';
                } else {
                    img.style.display = 'none';
                }
            });
            // Re-index gallery for lightbox
            galleryArr = Array.from(galleryGrid.querySelectorAll('img[style*="display"]:not([style*="none"]), img:not([style*="display"])'));
        });
    });

});
