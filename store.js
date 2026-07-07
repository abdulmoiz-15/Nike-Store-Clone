document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.top-poster');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playPause = document.getElementById('pp');
    const dots = document.querySelectorAll('.dot-box .dot');
    const progressCircle = document.querySelector('.loading circle:nth-child(2)');
    
    let currentSlide = 1; // Start at 1 because position 0 is the clone
    const totalSlides = 4; // Number of real slides
    const allSlides = 6; // 4 real + 2 clones (total 6 slides)
    let autoPlayInterval;
    let progressInterval;
    let isPlaying = true;
    let progressStartTime;
    const progressDuration = 10000; // 10 seconds
    
    // Set initial position to show first real slide (position 1)
    slider.style.transform = 'translateX(-100%)';
    
    // Initialize autoplay
    startAutoPlay();
    
    // Function to animate progress circle using JavaScript
   // Function to animate progress circle using JavaScript
    function animateProgressCircle() {
        if (!progressCircle) return;
        
        // Clear any existing progress animation
        clearInterval(progressInterval);
        
        // Calculate appropriate values for mobile vs desktop
        const isMobile = window.innerWidth <= 960;
        const maxOffset = isMobile ? 75.39 : 113.097;
        
        // Reset to starting position
        progressCircle.style.strokeDashoffset = maxOffset + 'px';
        
        progressStartTime = Date.now();
        
        progressInterval = setInterval(function() {
            if (!isPlaying) return;
            
            const elapsed = Date.now() - progressStartTime;
            const progress = Math.min(elapsed / progressDuration, 1);
            const offset = maxOffset * (1 - progress);
            
            progressCircle.style.strokeDashoffset = offset + 'px';
            
            if (progress >= 1) {
                clearInterval(progressInterval);
                // When animation completes, reset properly for next time
                progressCircle.style.strokeDashoffset = maxOffset + 'px';
            }
        }, 16);
    }

    // Function to restart progress animation
    function restartProgressAnimation() {
        if (progressCircle) {
            // Completely reset the animation
            clearInterval(progressInterval);
            
            // Calculate appropriate values for mobile vs desktop
            const isMobile = window.innerWidth <= 960;
            const maxOffset = isMobile ? 75.39 : 113.097;
            
            progressCircle.style.strokeDashoffset = maxOffset + 'px';
            
            // Force reflow to ensure reset takes effect
            void progressCircle.offsetHeight;
            
            // Start new animation
            animateProgressCircle();
        }
    }
    
    slider.addEventListener('transitionend', () => {
        updateActiveSlide();
    });
    // Function to update active slide
    function updateActiveSlide() {
        const slides = document.querySelectorAll('.poster-slide');
        slides.forEach(slide => slide.classList.remove('active'));

        // Force reflow so CSS transitions restart properly
        void slider.offsetHeight;

        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
        }
    }


    // Function to update dots
    function updateDots() {
        // Map slide positions to dot indices (0-3)
        let dotIndex;
        if (currentSlide === 0 || currentSlide === allSlides - 1) {
            // These are clone positions, map to appropriate real slide
            dotIndex = currentSlide === 0 ? totalSlides - 1 : 0;
        } else {
            dotIndex = currentSlide - 1; // Adjust for clone at position 0
        }
        
        dots.forEach((dot, i) => {
            dot.style.color = i === dotIndex ? 'white' : 'darkgray';
        });
    }
    
    // Function to go to a specific slide
    function goToSlide(index) {
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
        restartProgressAnimation();
    }
    
    // Next slide function with seamless looping
    function nextSlide() {
        if (currentSlide === allSlides - 2) { // Second to last slide (last real slide)
            // Animate to the clone at the end
            currentSlide = allSlides - 1;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // After animation, instantly reset to first real slide
            setTimeout(() => {
                slider.style.transition = 'none';
                currentSlide = 1; // First real slide
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
                updateDots();
                updateActiveSlide();
                void slider.offsetHeight;
                slider.style.transition = 'transform 0.5s ease-in-out';
                
                restartProgressAnimation();
            }, 500);
        } else {
            currentSlide++;
            goToSlide(currentSlide);
        }
    }
    
    // Previous slide function with seamless looping
    function prevSlide() {
        if (currentSlide === 1) { // First real slide
            // Animate to the clone at the beginning
            currentSlide = 0;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // After animation, instantly reset to last real slide
            setTimeout(() => {
                slider.style.transition = 'none';
                currentSlide = allSlides - 2; // Last real slide
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
                updateDots();
                updateActiveSlide();
                void slider.offsetHeight;
                slider.style.transition = 'transform 0.5s ease-in-out';
                
                restartProgressAnimation();
            }, 500);
        } else {
            currentSlide--;
            goToSlide(currentSlide);
        }
    }
    
    // Start autoplay
    function startAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 10000);
        isPlaying = true;
        if (playPause) playPause.checked = false;
        restartProgressAnimation();
    }
    
    // Pause autoplay
    function pauseAutoPlay() {
        clearInterval(autoPlayInterval);
        clearInterval(progressInterval);
        isPlaying = false;
        if (playPause) playPause.checked = true;
    }
    
    // Toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            pauseAutoPlay();
        } else {
            startAutoPlay();
        }
    }
    
    // Event listeners for buttons
    if (nextBtn) nextBtn.addEventListener('click', function() {
        nextSlide();
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 10000);
    });
    
    if (prevBtn) prevBtn.addEventListener('click', function() {
        prevSlide();
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 10000);
    });
    
    if (playPause) {
        playPause.addEventListener('change', togglePlayPause);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 10000);
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 10000);
        } else if (e.key === ' ') {
            togglePlayPause();
            e.preventDefault();
        }
    });
    
    slider.style.transform = 'translateX(-100%)';

    // Mark correct slide as active
    updateActiveSlide();
    // Initialize dots
    updateDots();
    
    window.addEventListener('resize', function() {
        // Restart progress animation when screen size changes
        if (progressCircle) {
            restartProgressAnimation();
        }
    });
});
