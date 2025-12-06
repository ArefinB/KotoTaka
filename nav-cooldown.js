// Navigation Cooldown System - Persistent Across Pages
// Prevents spam clicking on Mobile/Tablet navigation buttons using localStorage

(function () {
    const COOLDOWN_DURATION = 10000; // 1 minute in milliseconds
    const CLICK_THRESHOLD = 5; // Number of clicks before cooldown triggers
    const CLICK_WINDOW = 10000; // Time window to count clicks (10 seconds)

    const STORAGE_KEYS = {
        CLICK_HISTORY: 'navClickHistory',
        COOLDOWN_END: 'navCooldownEnd'
    };

    let cooldownTimer = null;
    let notification = null;

    // Get click history from localStorage
    const getClickHistory = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.CLICK_HISTORY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    };

    // Save click history to localStorage
    const saveClickHistory = (history) => {
        try {
            localStorage.setItem(STORAGE_KEYS.CLICK_HISTORY, JSON.stringify(history));
        } catch (e) {
            console.error('Failed to save click history:', e);
        }
    };

    // Get cooldown end time from localStorage
    const getCooldownEndTime = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.COOLDOWN_END);
            return stored ? parseInt(stored, 10) : null;
        } catch (e) {
            return null;
        }
    };

    // Save cooldown end time to localStorage
    const saveCooldownEndTime = (endTime) => {
        try {
            if (endTime) {
                localStorage.setItem(STORAGE_KEYS.COOLDOWN_END, endTime.toString());
            } else {
                localStorage.removeItem(STORAGE_KEYS.COOLDOWN_END);
            }
        } catch (e) {
            console.error('Failed to save cooldown end time:', e);
        }
    };

    // Create cooldown notification element
    const createCooldownNotification = () => {
        const notif = document.createElement('div');
        notif.id = 'navCooldownNotification';
        notif.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 69, 0, 0.95);
            color: white;
            padding: 24px 32px;
            border-radius: 16px;
            font-weight: 600;
            font-size: 1.1rem;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            display: none;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(notif);
        return notif;
    };

    // Add animation styles
    const addStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -60%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
            
            @keyframes shake {
                0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
                25% { transform: translate(-50%, -50%) rotate(-5deg); }
                75% { transform: translate(-50%, -50%) rotate(5deg); }
            }
            
            .nav-link-disabled {
                opacity: 0.5;
                cursor: not-allowed !important;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    };

    // Update cooldown timer display
    const updateCooldownDisplay = () => {
        const cooldownEndTime = getCooldownEndTime();

        if (!cooldownEndTime) {
            clearCooldown();
            return;
        }

        const now = Date.now();
        const remainingMs = cooldownEndTime - now;

        if (remainingMs <= 0) {
            clearCooldown();
            return;
        }

        const remainingSeconds = Math.ceil(remainingMs / 1000);
        notification.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 12px;">⏱️</div>
            <div style="font-size: 1.2rem; margin-bottom: 8px;">থামো ভাই! একটু ধৈর্য ধরো!</div>
            <div style="font-size: 2rem; font-weight: 700; margin-bottom: 8px;">${remainingSeconds} সেকেন্ড</div>
            <div style="font-size: 0.9rem; opacity: 0.9;">এত দ্রুত ক্লিক করার দরকার কি? 😅</div>
        `;
        notification.style.display = 'block';
        // notification.style.animation = 'shake 0.5s ease-in-out';

        // setTimeout(() => {
        //     notification.style.animation = 'slideIn 0.3s ease-out';
        // }, 500);
    };

    // Clear cooldown
    const clearCooldown = () => {
        saveCooldownEndTime(null);

        if (cooldownTimer) {
            clearInterval(cooldownTimer);
            cooldownTimer = null;
        }

        if (notification) {
            notification.style.display = 'none';
        }

        // Re-enable nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('nav-link-disabled');
        });
    };

    // Start cooldown
    const startCooldown = () => {
        const endTime = Date.now() + COOLDOWN_DURATION;
        saveCooldownEndTime(endTime);

        // Disable nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.add('nav-link-disabled');
        });

        // Update display immediately
        updateCooldownDisplay();

        // Update every second
        cooldownTimer = setInterval(updateCooldownDisplay, 1000);
    };

    // Check if currently in cooldown
    const isInCooldown = () => {
        const cooldownEndTime = getCooldownEndTime();
        if (!cooldownEndTime) return false;

        const now = Date.now();
        if (now >= cooldownEndTime) {
            clearCooldown();
            return false;
        }

        return true;
    };

    // Handle navigation click
    const handleNavClick = (e) => {
        // ALWAYS prevent default first, we'll navigate manually if allowed
        e.preventDefault();

        // If already in cooldown, just show the notification
        if (isInCooldown()) {
            updateCooldownDisplay();
            return;
        }

        const now = Date.now();

        // Get click history and filter old clicks
        let clickHistory = getClickHistory();
        clickHistory = clickHistory.filter(time => now - time < CLICK_WINDOW);

        // Add current click
        clickHistory.push(now);
        saveClickHistory(clickHistory);

        // Check if threshold exceeded
        if (clickHistory.length >= CLICK_THRESHOLD) {
            // Trigger cooldown BEFORE navigation
            startCooldown();
            saveClickHistory([]); // Reset click history
            return; // Don't navigate!
        }

        // If not in cooldown and under threshold, allow navigation
        const href = e.currentTarget.getAttribute('href');
        if (href && href !== '#') {
            window.location.href = href;
        }
    };

    // Initialize cooldown system
    const init = () => {
        addStyles();
        notification = createCooldownNotification();

        // Check if there's an active cooldown from a previous page
        if (isInCooldown()) {
            startCooldown();
        }

        // Add click handlers to nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', handleNavClick);
        });
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
