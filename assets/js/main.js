/**
 * PC10258 Store - Global Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Carousel Logic ---
    const carousel = document.getElementById('product-carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carousel && prevBtn && nextBtn) {
        const updateButtons = () => {
            const isAtStart = carousel.scrollLeft <= 5;
            const isAtEnd = carousel.scrollLeft >= (carousel.scrollWidth - carousel.offsetWidth - 10);

            prevBtn.disabled = isAtStart;
            nextBtn.disabled = isAtEnd;

            prevBtn.style.opacity = isAtStart ? '0.3' : '1';
            nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
        };

        // Navigation Buttons
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: carousel.offsetWidth * 0.7, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -carousel.offsetWidth * 0.7, behavior: 'smooth' });
        });

        carousel.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);

        // Initial state
        setTimeout(updateButtons, 100);

        // --- Mouse Drag Scroll ---
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            carousel.style.cursor = 'grabbing';
            carousel.style.scrollBehavior = 'auto';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        const stopDragging = () => {
            if (!isDown) return;
            isDown = false;
            carousel.classList.remove('active');
            carousel.style.cursor = 'grab';
            carousel.style.scrollBehavior = 'smooth';
        };

        carousel.addEventListener('mouseleave', stopDragging);
        carousel.addEventListener('mouseup', stopDragging);

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX);
            carousel.scrollLeft = scrollLeft - walk;
            updateButtons();
        });
    }
});

/**
 * Change main product image in product details page
 * @param {string} src - Image source URL
 */
function changeImg(src) {
    const mainImg = document.getElementById('main-product-img');
    if (mainImg) {
        mainImg.src = src;

        // Update active thumbnail border if any
        const thumbs = document.querySelectorAll('.product-thumb-container button');
        thumbs.forEach(btn => {
            if (btn.querySelector('img') && btn.querySelector('img').src === src) {
                btn.classList.add('border-blue-600');
                btn.classList.remove('border-transparent');
            } else {
                btn.classList.remove('border-blue-600');
                btn.classList.add('border-transparent');
            }
        });
    }
}
