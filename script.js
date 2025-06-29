document.addEventListener('DOMContentLoaded', function() {

  // Initialize Typed.js
  const typed = new Typed('.typing', {
    strings: ['', 'Using AI to solve real-world problems.', 'Building intelligent systems.', 'Creating innovative solutions.'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    startDelay: 500,
    loop: true
  });

  // Mobile menu functionality
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const menuOverlay = document.querySelector('.menu-overlay');

  if (menuBtn && navLinks && menuOverlay) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuOverlay.classList.toggle('active');
    });

    menuOverlay.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuOverlay.classList.remove('active');
    });
  }

  // Project carousel functionality
  const carousel = document.querySelector('.project-carousel');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.dot');
  
  if (carousel && prevBtn && nextBtn) {
    let scrollAmount = 0;
    const cardWidth = 350 + 32; // card width + gap
    
    prevBtn.addEventListener('click', () => {
      scrollAmount = Math.max(scrollAmount - cardWidth, 0);
      carousel.scrollLeft = scrollAmount;
      updateDots();
    });
    
    nextBtn.addEventListener('click', () => {
      scrollAmount = Math.min(scrollAmount + cardWidth, carousel.scrollWidth - carousel.clientWidth);
      carousel.scrollLeft = scrollAmount;
      updateDots();
    });
    
    // Update active dot based on scroll position
    function updateDots() {
      if (!dots.length) return;
      
      const index = Math.round(scrollAmount / cardWidth);
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
    
    // Click on dots to navigate
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        scrollAmount = i * cardWidth;
        carousel.scrollLeft = scrollAmount;
        updateDots();
      });
    });
    
    // Update dots on scroll
    carousel.addEventListener('scroll', () => {
      scrollAmount = carousel.scrollLeft;
      updateDots();
    });
  }

  // 3D card tilt effect for skill cards
  const cards = document.querySelectorAll('.skill-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      setTimeout(() => {
        card.style.transition = '';
      }, 300);
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.1s ease';
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Glitching text effect for name
  const glitchText = document.querySelector('.glitch-wrapper h1:first-of-type');
  if (glitchText) {
    setInterval(() => {
      const originalText = glitchText.textContent;
      // Create a scrambled version with some characters replaced
      let scrambled = '';
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() > 0.9) {
          scrambled += String.fromCharCode(33 + Math.floor(Math.random() * 94));
        } else {
          scrambled += originalText[i];
        }
      }
      
      // Apply the scrambled text briefly
      glitchText.textContent = scrambled;
      
      // Reset to original after a brief moment
      setTimeout(() => {
        glitchText.textContent = originalText;
      }, 100);
    }, 3000);
  }

  // Reveal animations on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  // Observe all sections for scroll animations
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
  });
});

// Add this CSS for reveal animations
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
`);
document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');
  
  const appearOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px"
  };
  
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
      entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('active');
          appearOnScroll.unobserve(entry.target);
      });
  }, appearOptions);
  
  faders.forEach(fader => {
      appearOnScroll.observe(fader);
  });
});

/* Script to add neural network particles */
document.addEventListener('DOMContentLoaded', function() {
  // Create synapses container
  const synapses = document.createElement('div');
  synapses.className = 'synapses';
  document.body.appendChild(synapses);
  
  // Create neural nodes
  for (let i = 0; i < 50; i++) {
      const synapse = document.createElement('div');
      synapse.className = 'synapse';
      synapse.style.top = `${Math.random() * 100}%`;
      synapse.style.left = `${Math.random() * 100}%`;
      synapse.style.animationDuration = `${3 + Math.random() * 5}s`;
      synapse.style.animationDelay = `${Math.random() * 2}s`;
      synapses.appendChild(synapse);
  }
});

// Handling the form submission using AJAX
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Show loading state
  const submitBtn = this.querySelector('.submit-btn');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Sending...';
  submitBtn.disabled = true;
  
  // Get response message element
  const responseMessage = document.getElementById('responseMessage');
  responseMessage.innerText = '';
  responseMessage.className = 'response-message';
  
  // Collect form data
  let formData = new FormData(this);
  
  // Send data to the server using fetch
  fetch('contact.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    // Display success message
    responseMessage.innerText = data;
    responseMessage.className = 'response-message success';
    
    // Reset form if successful
    if (data.includes('success')) {
      this.reset();
    }
    
    // Reset button state
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  })
  .catch(error => {
    // Display error message
    responseMessage.innerText = 'Something went wrong. Please try again.';
    responseMessage.className = 'response-message error';
    
    // Reset button state
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  });
});
// Handling the form submission using AJAX
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Show loading state
  const submitBtn = this.querySelector('.submit-btn');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Sending...';
  submitBtn.disabled = true;
  
  const responseMessage = document.getElementById('responseMessage');
  responseMessage.innerHTML = '';
  responseMessage.className = 'response-message';
  
  // Collect form data
  let formData = new FormData(this);
  
  // Send data to the server using fetch
  fetch('contact.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Reset button
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
    
    if (data.status === 'success') {
      // Display success message
      responseMessage.className = 'response-message success';
      responseMessage.innerText = data.message;
      
      // Reset form
      document.getElementById('contactForm').reset();
    } else {
      // Display error message
      responseMessage.className = 'response-message error';
      responseMessage.innerText = data.message;
    }
  })
  .catch(error => {
    // Reset button
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
    
    // Display error message
    responseMessage.className = 'response-message error';
    responseMessage.innerText = 'Something went wrong. Please try again.';
  });
});