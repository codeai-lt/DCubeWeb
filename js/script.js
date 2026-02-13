// ================================
// DCube - JavaScript Interactions
// ================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Mobile Menu Toggle =====
    const navToggle = document.getElementById('navToggle');
    const navbarNav = document.getElementById('navbarNav');
    
    if (navToggle && navbarNav) {
        navToggle.addEventListener('click', function() {
            navbarNav.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarNav.classList.remove('show');
                }
            });
        });
    }
    
    // ===== Sticky Nav Shadow =====
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Active Nav Highlighting =====
    const sections = document.querySelectorAll('section[id]');
    const navLinksForHighlight = document.querySelectorAll('.nav-link');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksForHighlight.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // ===== Intersection Observer for Scroll Animations =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // For timeline items, add staggered delay
                if (entry.target.classList.contains('timeline-item')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in-up, .timeline-item');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // ===== Animated Counters =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let counterAnimated = false;
    
    function animateCounters() {
        if (counterAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    // Format number based on size
                    if (target >= 1000000) {
                        stat.textContent = (current / 1000000).toFixed(1) + 'M+';
                    } else if (target >= 1000) {
                        stat.textContent = Math.floor(current).toLocaleString() + '+';
                    } else if (target % 1 !== 0) {
                        stat.textContent = current.toFixed(1) + '%';
                    } else {
                        stat.textContent = Math.floor(current) + '+';
                    }
                    
                    requestAnimationFrame(updateCounter);
                } else {
                    // Final value
                    if (target >= 1000000) {
                        stat.textContent = (target / 1000000).toFixed(1) + 'M+';
                    } else if (target >= 1000) {
                        stat.textContent = target.toLocaleString() + '+';
                    } else if (target % 1 !== 0) {
                        stat.textContent = target + '%';
                    } else {
                        stat.textContent = target + '+';
                    }
                }
            };
            
            updateCounter();
        });
        
        counterAnimated = true;
    }
    
    // Observe stats section
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        statsObserver.observe(statsSection);
    }
    
    // ===== FAQ Accordion =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.setAttribute('aria-expanded', 'false');
                    q.parentElement.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            this.setAttribute('aria-expanded', !isExpanded);
            faqItem.classList.toggle('active');
        });
    });
    
    // ===== Benefits Tabs =====
    const benefitTabs = document.querySelectorAll('.benefit-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    benefitTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            benefitTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // ===== Back to Top Button =====
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== Prevent default for empty anchor links =====
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
    
    // ===== Console welcome message =====
    console.log('%c🎓 Welcome to DCube!', 'font-size: 20px; color: #00bfa5; font-weight: bold;');
    console.log('%cCertificates made simple.', 'font-size: 14px; color: #1a237e;');
});
