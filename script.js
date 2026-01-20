document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Smooth scroll for anchor links (safeguard for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes to elements
    const animatedElements = document.querySelectorAll('.card, .service-showcase-card, .feature-item, .step');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        // Add staggered delay for grid items
        if (el.classList.contains('card') || el.classList.contains('service-showcase-card')) {
            el.style.transitionDelay = `${(index % 3) * 100}ms`;
        }
        observer.observe(el);
    });

    // --- Hero Slider ---
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.slide-arrow.prev');
    const nextBtn = document.querySelector('.slide-arrow.next');
    let currentSlide = 1;
    let slideInterval;

    function goToSlide(slideNum) {
        // Remove active from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        // Add active to current slide and indicator
        const targetSlide = document.querySelector(`.slide[data-slide="${slideNum}"]`);
        const targetIndicator = document.querySelector(`.indicator[data-slide="${slideNum}"]`);

        if (targetSlide) targetSlide.classList.add('active');
        if (targetIndicator) targetIndicator.classList.add('active');

        currentSlide = slideNum;
    }

    function nextSlide() {
        const next = currentSlide >= slides.length ? 1 : currentSlide + 1;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = currentSlide <= 1 ? slides.length : currentSlide - 1;
        goToSlide(prev);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners for slider
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const slideNum = parseInt(indicator.dataset.slide);
            goToSlide(slideNum);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Start auto-sliding
    if (slides.length > 0) {
        startAutoSlide();
    }

    // --- Contact Form Handling (Formspree) ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get Formspree Endpoint from action attribute
            // We fallback to a placeholder if it's the default text to prevent real errors during dev
            let action = contactForm.getAttribute('action');
            if (action.includes('YOUR_FORM_ID')) {
                // If the user hasn't set their ID yet, we'll simulate a success for demonstration
                // In production, this would be a real fetch
                await simulateSubmission();
                return;
            }

            // Real Submission Logic
            const formData = new FormData(contactForm);
            const originalBtnContent = submitBtn.innerHTML;

            // set loading state
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-loading');
            submitBtn.innerHTML = '<i class="ph ph-spinner"></i> جاري الإرسال...';
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = "تم إرسال رسالتك بنجاح، سنقوم بالتواصل معك قريبًا";
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = "حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.";
                    }
                    formStatus.classList.add('error');
                }
            } catch (error) {
                formStatus.textContent = "حدث خطأ في الاتصال، يرجى التحقق من الإنترنت والمحاولة مرة أخرى.";
                formStatus.classList.add('error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-loading');
                submitBtn.innerHTML = originalBtnContent;
                formStatus.style.display = 'block';
            }
        });
    }

    // Helper to simulate submission if ID isn't set (For Dev Preview Only)
    async function simulateSubmission() {
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-loading');
        submitBtn.innerHTML = '<i class="ph ph-spinner"></i> جاري الإرسال...';

        // Fake delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        formStatus.textContent = "تم إرسال رسالتك بنجاح، سنقوم بالتواصل معك قريبًا (محاكاة)";
        formStatus.classList.add('success');
        formStatus.style.display = 'block';
        contactForm.reset();

        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-loading');
        submitBtn.innerHTML = originalBtnContent;
    }
});
