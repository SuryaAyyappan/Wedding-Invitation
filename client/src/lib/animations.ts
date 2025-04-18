import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Create heart particles animation
export function createHeartParticles(containerElement: HTMLElement) {
  // Cleanup function to clear any existing intervals
  let heartInterval: number | undefined;
  
  const createHeart = () => {
    const heart = document.createElement('span');
    heart.innerHTML = '❤';
    heart.className = 'text-rose';
    heart.style.position = 'absolute';
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.opacity = '0';
    heart.style.animation = 'heartFloat 4s ease-in forwards';
    
    // Define the keyframes animation in JavaScript
    const animKeyframes = [
      { opacity: 0, transform: 'translateY(0) scale(0.5)' },
      { opacity: 1, transform: 'translateY(-50px) scale(1.0) rotate(10deg)' },
      { opacity: 0.7, transform: 'translateY(-75px) scale(1.1) rotate(15deg)' },
      { opacity: 0, transform: 'translateY(-100px) scale(1.2) rotate(20deg)' }
    ];
    
    const animTiming = {
      duration: 4000,
      easing: 'ease-in-out',
      fill: 'forwards'
    };
    
    heart.animate(animKeyframes, animTiming);
    
    containerElement.appendChild(heart);
    
    // Remove the heart element after animation completes
    setTimeout(() => {
      heart.remove();
    }, 4000);
  };
  
  // Create hearts at regular intervals
  heartInterval = window.setInterval(createHeart, 300) as unknown as number;
  
  // Return cleanup function
  return () => {
    if (heartInterval) {
      clearInterval(heartInterval);
    }
  };
}

// Initialize smooth scrolling
export function initSmoothScroll() {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const href = this.getAttribute('href');
      if (!href) return;
      
      const targetElement = document.querySelector(href);
      if (!targetElement) return;
      
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth'
      });
    });
  });
  
  // Set up scroll animations
  gsap.utils.toArray('.section-fade-in').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element as HTMLElement,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
    });
  });
}
