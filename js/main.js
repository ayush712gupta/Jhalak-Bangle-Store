// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Testimonial slider
  const testimonialSlider = document.querySelector('.testimonials-slider');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
    testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
    
    // Update active dot
    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentTestimonial = index;
  }
  
  // Dot click event
  testimonialDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showTestimonial(i);
    });
  });
  
  // Auto slide testimonials
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
    showTestimonial(currentTestimonial);
  }, 5000);

  // Scroll to top button
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Initialize cart count
  document.querySelector('.cart-count').textContent = '0';
});