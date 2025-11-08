<<<<<<< HEAD
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
=======
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
>>>>>>> c4bbe91a3844da30f4619e79c9ca4241ad4bf7ee
    });