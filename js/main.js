// Initialize Lenis for smooth scrolling
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initNav();
});

function initAnimations() {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Entrance Animation
    const tl = gsap.timeline();
    
    tl.from('.hero-headline', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    })
    .from('.hero-subline', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-actions .btn', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-portrait', {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
    }, '-=1');

    // 2. Stat Counters Animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 90%',
            },
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power1.inOut'
        });
    });

    // 3. Service Cards Hover/Entrance
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // 4. Selected Work Horizontal Scroll
    const workContainer = document.querySelector('.work-horizontal-container');
    if (workContainer) {
        gsap.to(workContainer, {
            x: () => -(workContainer.scrollWidth - document.querySelector('.work').clientWidth + 40),
            ease: "none",
            scrollTrigger: {
                trigger: ".work",
                start: "top top",
                end: () => "+=" + workContainer.scrollWidth,
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
            }
        });
    }
}

function initNav() {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}
