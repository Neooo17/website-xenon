document.addEventListener('DOMContentLoaded', () => {
    gsap.to('h1', { duration: 1, opacity: 1, y: 0, delay: 0.5 });
    gsap.to('h2', { duration: 1, opacity: 1, y: 0, delay: 1 });
    gsap.to('h3', { duration: 1, opacity: 1, y: 0, delay: 1.5 });
});





document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-item');
    const prev = document.getElementById('carousel-prev');
    const next = document.getElementById('carousel-next');
    const indicatorsContainer = document.getElementById('carousel-indicators');

    let currentIndex = 0;
    let autoPlayInterval;

    // Create indicator buttons
    slides.forEach((_, index) => {
      const button = document.createElement('button');
      button.className = 'w-3 h-3 bg-gray-400 rounded-full transition-all duration-300 ease-in-out focus:outline-none';
      button.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(button);
    });

    const indicators = indicatorsContainer.children;

    function updateCarousel() {
      slides.forEach((slide, index) => {
        if (index === currentIndex) {
          slide.classList.remove('opacity-0');
          slide.classList.add('opacity-100');
        } else {
          slide.classList.add('opacity-0');
          slide.classList.remove('opacity-100');
        }
      });

      Array.from(indicators).forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('bg-blue-500', 'w-4', 'h-4');
          dot.classList.remove('bg-gray-400', 'w-3', 'h-3');
        } else {
          dot.classList.remove('bg-blue-500', 'w-4', 'h-4');
          dot.classList.add('bg-gray-400', 'w-3', 'h-3');
        }
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    next.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    prev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    // Initialize carousel
    updateCarousel();

    // Auto-play functionality
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }, 6000); // Change slide every 8 seconds
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    // Start auto-play
    startAutoPlay();

    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  });










  document.addEventListener('DOMContentLoaded', () => {
    // Initial animations for Slide 1
    gsap.to('#slide1 .text-lg', { duration: 1, opacity: 1, y: 0, delay: 0.5, ease: "power2.out" })
    gsap.to('#slide1 h1', { duration: 1.2, opacity: 1, y: 0, delay: 1, ease: "power2.out" })
    gsap.to('#slide1 h2', { duration: 1.4, opacity: 1, y:0, delay:1.5, ease: "power2.out" })
    gsap.to('#slide1 h3', { duration: 1.6, opacity: 1, y:0, delay: 2, ease: "power2.out" })

    // ScrollTrigger to start transitioning Slide 1 out and Slide 2 in on scroll
    ScrollTrigger.create({
        trigger: '#slide1',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
            const progress = self.progress
            gsap.to('#slide1', { opacity: 1 - progress, y: -100 * progress, ease: "none" })
            gsap.to('.bubble', { y: -1000 * progress, ease: "none" }) // Increase bubble speed
        },
        onLeave: () => {
            gsap.to('#slide2', { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
        },
        onLeaveBack: () => {
            gsap.to('#slide1', { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
            gsap.set('#slide2', { opacity: 0, y: 50 })
        }
    })

    ScrollTrigger.create({
        trigger: '#slide2',
        start: 'top center',
        onEnter: () => {
            // First animate the section into view
            gsap.to('#slide2', { 
                opacity: 1, 
                duration: 0.5,
                ease: "power2.out"
            });

            // Sequential text animation like section 1
            gsap.to('.text-reveal', {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: "power3.out",
                onComplete: () => {
                    // After text animation completes, animate the grid
                    gsap.to('.grid', {
                    opacity: 1,
                    y: 0, // Reset the upward motion
                    duration: 0.8,
                    ease: "power2.out",
                    clearProps: "transform" // Clear transform property after animation
                });
                }
            });
        }
    });

    // Add hover effect handling
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // ScrollTrigger for other slides
    const sections = gsap.utils.toArray('.slide-content:not(#slide2)')
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 90%',
            end: 'bottom top',
            onEnter: () => gsap.to(section, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }),
            onLeave: () => gsap.to(section, { opacity: 0, y: -50, duration: 1, ease: "power2.out" }),
            onEnterBack: () => gsap.to(section, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }),
            onLeaveBack: () => gsap.to(section, { opacity: 0, y: 50, duration: 1, ease: "power2.out" })
        })
    })

    const bubbleContainer = document.querySelector('.bubble-container')
    const maxBubbles = 30

    function createBubble() {
        const bubble = document.createElement('div')
        bubble.classList.add('bubble')
        const size = Math.random() * 100 + 50
        bubble.style.width = `${size}px`
        bubble.style.height = `${size}px`
        bubble.style.left = `${Math.random() * 100}vw`
        bubble.style.top = `${Math.random() * 100}vh`
        bubble.dataset.baseY = parseFloat(bubble.style.top)
        bubbleContainer.appendChild(bubble)
        return bubble
    }

    // Initial creation of bubbles
    const bubbles = []
    for (let i = 0; i < maxBubbles; i++) {
        const bubble = createBubble()
        bubbles.push(bubble)
        // Initial smooth appearance with random delay
        gsap.fromTo(bubble, { opacity: 0, scale: 0.5 }, { opacity: 0.8, scale: 1, duration: 1, delay: Math.random() * 2, ease: "power2.out" })
    }

    // Animate bubbles independently with varying speeds
    const bubbleAnimations = bubbles.map((bubble) => {
        return gsap.to(bubble, {
            x: () => `${Math.random() * 100 - 50}vw`,
            rotation: () => `${Math.random() * 360}`,
            duration: () => Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        })
    })

    let lastScrollY = window.scrollY;
    let ticking = false;
    let animationFrame;

    function updateBubblePositions() {
        const currentScrollY = window.scrollY;
        const deltaY = (currentScrollY - lastScrollY) * 0.5; // Reduce scroll sensitivity
        lastScrollY = currentScrollY;

        bubbles.forEach((bubble) => {
            const baseY = parseFloat(bubble.dataset.baseY);
            let newY = baseY - currentScrollY;

            const fadeStart = window.innerHeight;
            const fadeEnd = -window.innerHeight;

            if (newY < fadeEnd) {
                newY += window.innerHeight * 2;
                bubble.style.left = `${Math.random() * 100}vw`;
                bubble.dataset.baseY = newY + currentScrollY;
            } else if (newY > fadeStart) {
                newY -= window.innerHeight * 2;
                bubble.style.left = `${Math.random() * 100}vw`;
                bubble.dataset.baseY = newY + currentScrollY;
            }

            const opacity = Math.min(1, Math.max(0, 1 - Math.abs(newY) / fadeStart));
            
            gsap.set(bubble, { 
                y: newY + deltaY, 
                opacity: opacity,
                force3D: true // Enable hardware acceleration
            });
        });

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(updateBubblePositions);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial position update
    updateBubblePositions()

    // Function to adjust bubble speed
    function adjustBubbleSpeed(speed) {
        bubbleAnimations.forEach((animation) => {
            animation.timeScale(speed)
        })
    }

    // Start with normal speed
    adjustBubbleSpeed(1.5)

    // Slow down bubbles after Slide 1 animation is complete
    gsap.delayedCall(1.8, () => {
        gsap.to({}, {
            duration: 0.4,
            onUpdate: function () {
                const progress = this.progress()
                const currentSpeed = 1 - (0.8 * progress)
                adjustBubbleSpeed(currentSpeed)
            },
            ease: "power2.out"
        })
    })

    ScrollTrigger.create({
        trigger: '#slide3',
        start: 'top center',
        onEnter: () => {
            gsap.to('#slide3', { 
                opacity: 1, 
                duration: 0.5,
                ease: "power2.out"
            });

            // Animate process steps sequentially
            gsap.from('.process-step', {
                  opacity: 0,
                   x: -50,
                  duration: 1,
                  stagger: 0.4, // Increased for smoother flow
                   ease: "power3.out" // More gradual easing
            });


            // Animate phase titles
            gsap.from('.phase-section h3', {
                   opacity: 0,
                   y: 30,
                   duration: 1,
                   delay: 0.8, // Ensures steps animate first
                   stagger: 0.3,
                   ease: "power3.out"
            });

        }
    });
})



// Add this to your script.js
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    // First, ensure nav exists
    if (!nav) {
        console.error('Navigation element not found');
        return;
    }

    // Set initial state
    nav.style.transition = 'all 0.3s ease';

    window.addEventListener('scroll', () => {
        // Use window.scrollY instead of pageYOffset (more modern)
        const currentScroll = window.scrollY;

        // Debug log (remove in production)
        // console.log('Scrolling', currentScroll);

        // Add/remove scrolled class for background change
        if (currentScroll > 50) {
            if (!nav.classList.contains('scrolled')) {
                nav.classList.add('scrolled');
            }
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide/show nav on scroll up/down with throttling
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down & past header
            requestAnimationFrame(() => {
                nav.style.transform = 'translateY(-100%)';
                nav.style.opacity = '0';
            });
        } else {
            requestAnimationFrame(() => {
                nav.style.transform = 'translateY(0)';
                nav.style.opacity = '1';
            });
        }

        lastScroll = currentScroll;
    }, { passive: true }); // Add passive flag for better scroll performance
});



