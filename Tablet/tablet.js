    // FAQ Toggle Functionality
    const faqBar = document.getElementById('faqBar');
    const faqContent = document.getElementById('faqContent');
    const faqIcon = faqBar.querySelector('.faq-icon');

    faqBar.addEventListener('click', () => {
      const isOpen = faqContent.classList.contains('open');
      faqContent.classList.toggle('open', !isOpen);
      faqBar.classList.toggle('active', !isOpen);
    });

    // Close FAQ when clicking outside
    document.addEventListener('click', (e) => {
      if (!faqBar.contains(e.target) && !faqContent.contains(e.target)) {
        faqContent.classList.remove('open');
        faqBar.classList.remove('active');
      }
    });

    // Optional: Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && faqContent.classList.contains('open')) {
        faqContent.classList.remove('open');
        faqBar.classList.remove('active');
      }
    });

    


    // ===========

    // Lazy load images when they enter viewport
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

// After rendering cards, observe all images
document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// =================

// Auto-scroll to results on mobile
function scrollToResults() {
  document.getElementById('results').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  // Optional: Add a tiny delay so user sees the scroll
  setTimeout(() => {
    window.scrollBy(0, -80); // Adjust for fixed header/theme toggle
  }, 600);
}


// ====================

function scrollAfterPageChange() {
  if (window.innerWidth <= 768) {
    // MOBILE: Scroll to TOP of #results container
    const results = document.getElementById('results');
    if (results && results.children.length > 0) {
      // Force scroll to the very top of the container
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // CRITICAL: Adjust for fixed header + padding
      setTimeout(() => {
        const headerOffset = 100; // Adjust if your header is taller/shorter
        const elementPosition = results.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  } else {
    // DESKTOP: Top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}


// Mobile-only staggered fade-in
if (window.innerWidth <= 768) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 30);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '50px' });

  setTimeout(() => {
    document.querySelectorAll('.brand-card, .price-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(6px)';
      card.style.transition = 'all 0.25s ease';
      observer.observe(card);
    });
  }, 100);
}

/* ---- MOBILE SCROLL TO RESULTS AFTER SEARCH / FILTER ---- */
function mobileScrollToResults() {
  if (window.innerWidth > 768) return;
  const results = document.getElementById('results');
  if (!results || results.children.length === 0) return;

  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    const headerOffset = 90;
    const pos = results.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: pos, behavior: 'smooth' });
  }, 100);
}
