         // Initialize GSAP
        gsap.registerPlugin(ScrollTrigger);
        
        // Global variables
        let currentPage = 'home';
        
        // Page Navigation
        function showPage(pageId) {
            // Hide current page
            document.getElementById(currentPage).classList.remove('active');
            
            // Show new page
            setTimeout(() => {
                document.getElementById(pageId).classList.add('active');
                currentPage = pageId;
                
                // Update navigation
                updateNavigation(pageId);
                
                // Scroll to top
                window.scrollTo(0, 0);
                
                // Initialize page animations
                initPageAnimations();
                
                // Close mobile menu
                closeMobileMenu();
            }, 100);
        }
        
        function updateNavigation(activePageId) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === activePageId) {
                    link.classList.add('active');
                }
            });
        }
        
        // Navigation event listeners
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                if (pageId) {
                    showPage(pageId);
                }
            });
        });
        
        // Footer navigation event listeners
        document.querySelectorAll('footer a[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                if (pageId) {
                    showPage(pageId);
                }
            });
        });
        
        // Dropdown navigation event listeners
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = item.getAttribute('data-page');
                if (pageId) {
                    showPage(pageId);
                }
            });
        });
        
        // Mobile menu
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileServicesToggle = document.getElementById('mobileServicesToggle');
        const mobileServicesMenu = document.getElementById('mobileServicesMenu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Mobile services dropdown
        if (mobileServicesToggle && mobileServicesMenu) {
            mobileServicesToggle.addEventListener('click', (e) => {
                e.preventDefault();
                mobileServicesToggle.classList.toggle('active');
                mobileServicesMenu.classList.toggle('active');
            });
        }
        
        function closeMobileMenu() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            if (mobileServicesToggle && mobileServicesMenu) {
                mobileServicesToggle.classList.remove('active');
                mobileServicesMenu.classList.remove('active');
            }
        }
        
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        let isDarkMode = true;
        
        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Animated counters
        function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
        
        // Portfolio filter
        function initPortfolioFilter() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Filter items
                    const filter = btn.getAttribute('data-filter');
                    
                    portfolioItems.forEach(item => {
                        const category = item.getAttribute('data-category');
                        
                        if (filter === 'all' || category === filter) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    });
                });
            });
        }
        
        // Contact form
        function initContactForm() {
            const form = document.getElementById('contactForm');
            if (!form) return;
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))';
                        submitBtn.disabled = false;
                        form.reset();
                    }, 2000);
                }, 1500);
            });
        }
        
        // Newsletter form
        function initNewsletterForm() {
            const form = document.getElementById('newsletterForm');
            if (!form) return;
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                const emailInput = form.querySelector('input[type="email"]');
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Subscribing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Subscribed!';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = 'linear-gradient(135deg, #14b8a6, #06b6d4)';
                        submitBtn.disabled = false;
                        emailInput.value = '';
                    }, 2000);
                }, 1500);
            });
        }
        
        // GSAP Animations
        function initPageAnimations() {
            // Fade up animations
            gsap.fromTo('.fade-up', 
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    stagger: 0.2,
                    ease: "power2.out"
                }
            );
            
            // Fade in animations
            gsap.fromTo('.fade-in', 
                { opacity: 0 },
                { 
                    opacity: 1, 
                    duration: 1, 
                    stagger: 0.1,
                    ease: "power2.out"
                }
            );
            
            // Scale up animations
            gsap.fromTo('.scale-up', 
                { opacity: 0, scale: 0.8 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.6, 
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }
            );
        }
        
        // Floating elements animation
        function createFloatingElements() {
            const container = document.querySelector('.floating-elements');
            if (!container) return;
            
            setInterval(() => {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.style.left = Math.random() * 100 + '%';
                element.style.fontSize = (Math.random() * 2 + 1) + 'rem';
                element.style.animationDuration = (Math.random() * 10 + 10) + 's';
                element.textContent = ['💻', '🚀', '⚡', '🎯', '💡', '🌟', '🔥', '💎'][Math.floor(Math.random() * 8)];
                
                container.appendChild(element);
                
                setTimeout(() => {
                    element.remove();
                }, 15000);
            }, 2000);
        }
        
        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Hide loading screen
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);
            
            // Initialize animations
            initPageAnimations();
            
            // Initialize portfolio filter
            initPortfolioFilter();
            
            // Initialize contact form
            initContactForm();
            
            // Initialize newsletter form
            initNewsletterForm();
            
            // Start floating elements
            createFloatingElements();
            
            // Animate counters when they come into view
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        counterObserver.disconnect();
                    }
                });
            });
            
            const countersSection = document.querySelector('.counter');
            if (countersSection) {
                counterObserver.observe(countersSection.parentElement);
            }
            
            // Scroll animations
            ScrollTrigger.batch('.fade-up', {
                onEnter: (elements) => {
                    gsap.fromTo(elements, 
                        { opacity: 0, y: 50 },
                        { 
                            opacity: 1, 
                            y: 0, 
                            duration: 0.8, 
                            stagger: 0.2,
                            ease: "power2.out"
                        }
                    );
                }
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add some interactive effects
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            }
        });
        
        // Add hover effects to cards
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this, { scale: 1.02, duration: 0.3, ease: "power2.out" });
            });
            
            card.addEventListener('mouseleave', function() {
                gsap.to(this, { scale: 1, duration: 0.3, ease: "power2.out" });
            });
        });
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'964dd9b1d4eac7aa',t:'MTc1MzQ2OTUwNS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script>