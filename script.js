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

// =====================

// MOBILE-ONLY: Debounce search + throttle clicks
// if (window.innerWidth <= 768) {
//   let searchTimeout;
//   const debouncedSearch = () => {
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       // Your existing search logic
//       const query = searchInput.value.toLowerCase().trim();
//       clearBtn.style.display = query ? 'block' : 'none';
//       autocompleteDiv.innerHTML = '';
//       results.innerHTML = '';
//       sortControls.style.display = query ? 'flex' : 'none';
//       currentBrand = null;
//       currentPriceRange = null;
//       currentChipset = null;
//       document.querySelectorAll('.brand-card, .price-card, .chipset-select').forEach(c => c.classList.remove('selected'));
//       if (!query || !phones.length) return;

//       const queryWords = query.split(/\s+/);
//       const filtered = phones.filter(p =>
//         queryWords.every(q => p.searchWords.some(w => w.startsWith(q)))
//       );
//       const uniqueNames = [...new Set(filtered.map(p => p.name))].slice(0, 10);
//       uniqueNames.forEach(name => {
//         const div = document.createElement('div');
//         div.classList.add('autocomplete-item');
//         div.textContent = name;
//         div.addEventListener('click', () => {
//           searchInput.value = name;
//           clearBtn.style.display = 'block';
//           autocompleteDiv.innerHTML = '';
//           let searchResults = filtered.filter(p => p.name === name);
//           showAllVariants(applySort(searchResults));
//           updatePageMeta(name, `Latest price for ${name} in Bangladesh from local shops.`);
//         });
//         autocompleteDiv.appendChild(div);
//       });
//     }, 280);
//   };

//   // Replace original input listener
//   searchInput.replaceWith(searchInput.cloneNode(true));
//   const newInput = document.getElementById('search');
//   newInput.addEventListener('input', debouncedSearch);

//   // Throttle brand/price card clicks
//   const throttle = (fn, delay) => {
//     let last = 0;
//     return (...args) => {
//       const now = Date.now();
//       if (now - last >= delay) {
//         last = now;
//         fn(...args);
//       }
//     };
//   };

//   // Re-attach throttled listeners after render
//   const reattachThrottledClicks = () => {
//     document.querySelectorAll('.brand-card, .price-card').forEach(card => {
//       card.replaceWith(card.cloneNode(true));
//       const newCard = document.querySelector(`[data-brand="${card.dataset.brand}"], [data-min="${card.dataset.min}"]`) || card;
//       newCard.addEventListener('click', throttle(() => {
//         newCard.click(); // trigger original click
//       }, 300));
//     });
//   };

//   // Call after render
//   const originalRenderBrand = renderBrandCards;
//   renderBrandCards = function(...args) {
//     originalRenderBrand(...args);
//     setTimeout(reattachThrottledClicks, 50);
//   };
// }

// ===

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
