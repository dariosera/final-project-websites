 // ===== HAMBURGER MENU FUNCTIONALITY =====
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
      });
  });
  
  // ===== COUNTDOWN TIMER =====
  function startCountdown() {
      // Target date: May 8, 2026 at 11:59 PM
      const targetDate = new Date('2026-05-08T23:59:59').getTime();
  
      function updateCountdown() {
          const now = new Date().getTime();
          const timeRemaining = targetDate - now;
  
          if (timeRemaining < 0) {
              document.getElementById('days').textContent = '0';
              document.getElementById('hours').textContent = '0';
              document.getElementById('minutes').textContent = '0';
              document.getElementById('seconds').textContent = '0';
              return;
          }
  
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
          document.getElementById('days').textContent = String(days).padStart(2, '0');
          document.getElementById('hours').textContent = String(hours).padStart(2, '0');
          document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
          document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
      }
  
      // Update immediately
      updateCountdown();
  
      // Update every second
      setInterval(updateCountdown, 1000);
  }
  
  // Start countdown when page loads
  startCountdown();
  
  // ===== IMAGE CAROUSEL =====
  const images = [
      'https://images.unsplash.com/photo-1503126613408-eca07ce68773?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1576092160589-2173dba999ef?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559027615-cd1628b63df4?w=600&h=400&fit=crop'
  ];
  
  const captions = [
      'Commuting made easy',
      'Never miss a connection',
      'Real-time updates for your journey',
      'Travel with confidence',
      'Join thousands of young commuters'
  ];
  
  let currentImageIndex = 0;
  
  function changeImage() {
      const carouselImage = document.getElementById('carouselImage');
      const galleryCaption = document.getElementById('galleryCaption');
  
      currentImageIndex = (currentImageIndex + 1) % images.length;
  
      // Fade out effect
      carouselImage.style.opacity = '0.5';
  
      setTimeout(() => {
          carouselImage.src = images[currentImageIndex];
          galleryCaption.textContent = captions[currentImageIndex];
          carouselImage.style.opacity = '1';
      }, 250);
  }
  
  // Change image every 1.5 seconds
  setInterval(changeImage, 1500);
  
  // Add smooth transition to carousel image
  const carouselImage = document.getElementById('carouselImage');
  carouselImage.style.transition = 'opacity 0.5s ease';
  
  // ===== CONTACT FORM SUBMISSION =====
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const age = document.getElementById('age').value.trim();
      const message = document.getElementById('message').value.trim();
  
      // Validate form
      if (!name || !email || !age) {
          alert('❌ Please fill in all required fields!');
          return;
      }
  
      if (age < 16 || age > 26) {
          alert('⚠️ Age must be between 16 and 26!');
          return;
      }
  
      // Show success message
      alert(`✅ Success! Thank you, ${name}!\n\nWe've received your message and will contact you at ${email} when TrackBus launches.\n\nGet ready to never miss a bus again! 🚌`);
  
      // Reset form
      contactForm.reset();
  
      // Optional: Scroll back to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
  
          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });
  