// Fade-in Animation on Scroll
document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Fade-in sections on scroll
    const sections = document.querySelectorAll('section:not(#home)');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isVisible = navLinks.getAttribute('data-visible') === 'true';
            navLinks.setAttribute('data-visible', !isVisible);
            menuToggle.setAttribute('aria-expanded', !isVisible);
        });
    }

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (scrollTopBtn) {
        const scrollFunction = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };

        window.addEventListener('scroll', scrollFunction);

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }


    // Carousel Logic
    const carouselSlide = document.querySelector('.carousel-slide');
    if (carouselSlide) {
        const carouselImages = document.querySelectorAll('.carousel-slide img');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');

        let counter = 0;
        let size = carouselImages.length > 0 ? carouselImages[0].clientWidth : 0;

        const updateCarousel = () => {
            if (carouselSlide) {
                carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            }
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (counter >= carouselImages.length - 1) {
                    counter = 0; // Loop back to the start
                } else {
                    counter++;
                }
                updateCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (counter <= 0) {
                    counter = carouselImages.length - 1; // Loop to the end
                } else {
                    counter--;
                }
                updateCarousel();
            });
        }

        window.addEventListener('resize', () => {
            size = carouselImages.length > 0 ? carouselImages[0].clientWidth : 0;
            updateCarousel();
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = new FormData(e.target);
            formStatus.textContent = 'Mengirim...';

            try {
                const response = await fetch(e.target.action, {
                    method: e.target.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = "Terima kasih! Pesan Anda telah terkirim.";
                    contactForm.reset();
                } else {
                    formStatus.textContent = "Oops! Terjadi masalah saat mengirim pesan.";
                }
            } catch (error) {
                formStatus.textContent = "Oops! Terjadi masalah koneksi.";
            }
        });
    }

    // Menu Modal Logic
    const modal = document.getElementById('menu-modal');
    const menuLinks = document.querySelectorAll('.menu-item-link');
    const closeModalBtn = document.querySelector('.modal-close');

    if (modal && menuLinks.length > 0 && closeModalBtn) {
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalPrice = document.getElementById('modal-price');
        const modalDesc = document.getElementById('modal-desc');

        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Populate modal with data from the clicked link
                modalImg.src = link.dataset.img;
                modalImg.alt = link.dataset.title;
                modalTitle.textContent = link.dataset.title;
                modalPrice.textContent = link.dataset.price;
                modalDesc.textContent = link.dataset.desc;

                modal.style.display = 'block';
            });
        });

        // Function to close the modal
        const closeModal = () => {
            modal.style.display = 'none';
        };

        closeModalBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Smooth fade-in for lazy-loaded images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        // If the image is already loaded (e.g., from cache), make it visible immediately.
        if (img.complete) {
            img.style.opacity = 1;
        } else {
            // Otherwise, add an event listener to fade it in when it's done loading.
            img.addEventListener('load', () => {
                img.style.opacity = 1;
            }, { once: true }); // Use { once: true } to automatically remove the listener.
        }
    });
});
