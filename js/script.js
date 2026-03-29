// ==========================================
// ADD BODY CLASS BASED ON CURRENT PAGE
// This enables page-specific color themes
// ==========================================
(function() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    const pageClassMap = {
        'index': 'home',
        '': 'home',
        'about': 'about',
        'projects': 'projects',
        'project-detail': 'project-detail',
        'skills': 'skills',
        'experience': 'experience',
        'contact': 'contact'
    };
    
    const bodyClass = pageClassMap[currentPage] || 'home';
    document.body.classList.add(bodyClass);
})();

// ==========================================
// MOBILE NAVIGATION TOGGLE
// ==========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ==========================================
const currentPageFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPageFile || 
        (currentPageFile === '' && linkHref === 'index.html') ||
        (currentPageFile === 'project-detail.html' && linkHref === 'projects.html')) {
        link.classList.add('active');
    }
});

// ==========================================
// PROJECT DATA FOR DYNAMIC LOADING
// ==========================================
const projectsData = {
    hackathon: {
        title: "Mood Mate",
        tagline: "AI-Powered Mood Enhancement Platform",
        context: "Hackathon Project | Code Red Hackathon 2025",
        description: "Participated in a 24-hour hackathon where I built a website that suggested music, YouTube videos and quotes depending on the user's mood. Collaborated with a team of 3 developers and implemented features using HTML, CSS and JS.",
        techStack: ["HTML", "CSS", "JavaScript"],
        features: [
            "Mood detection through user input and selections",
            "Personalized music recommendations based on emotional state",
            "Curated YouTube video suggestions for mood enhancement",
            "Inspirational quotes tailored to user's current mood",
            "Responsive design for seamless mobile experience",
            "Clean and intuitive user interface"
        ],
        challenges: [
            "Implementing mood-based content filtering within time constraints",
            "Creating an intuitive mood selection interface",
            "Managing multiple API integrations simultaneously",
            "Ensuring responsive design across all devices"
        ],
        learnings: [
            "Gained deep understanding of front-end web development",
            "Learned to prioritize features under tight deadlines",
            "Improved teamwork and communication skills",
            "Enhanced problem-solving abilities under pressure"
        ],
        githubLink: "https://github.com/TanishqGoyal05/MoodMate",
        liveLink: "",
        images: ["images/project1.jpg", "images/project1-2.jpg"]
    },

    workshop: {
        title: "AR/VR Interactive Experience",
        tagline: "Immersive Augmented & Virtual Reality Project",
        context: "Workshop Project | YISL AR/VR Workshop",
        description: "An interactive AR/VR application developed during an intensive workshop focusing on immersive technologies. This project demonstrates understanding of spatial computing, 3D interactions, and modern XR development principles.",
        techStack: ["HTML5", "CSS3", "JavaScript", "A-Frame", "AR.js", "Three.js"],
        features: [
            "Augmented reality marker detection and tracking",
            "Interactive 3D object manipulation",
            "Smooth animations and transitions in 3D space",
            "Mobile-first responsive AR experience",
            "Cross-platform compatibility",
            "Intuitive gesture-based controls"
        ],
        challenges: [
            "Understanding 3D coordinate systems and transformations",
            "Optimizing performance for mobile AR rendering",
            "Handling device camera permissions and access",
            "Creating intuitive user interactions in 3D space"
        ],
        learnings: [
            "Mastered A-Frame and AR.js frameworks",
            "Learned 3D modeling integration techniques",
            "Understood WebXR API fundamentals",
            "Improved spatial thinking and 3D design skills"
        ],
        githubLink: "https://github.com/TanishqGoyal05/AR_VR-Project",
        liveLink: "",
        images: ["images/project2.jpg", "images/project2-2.jpg"]
    },

    blockchain: {
        title: "Personal Locker DApp",
        tagline: "Decentralized Personal Storage Solution",
        context: "Blockchain Challenge | GDG Club Technical Assessment",
        description: "A decentralized application (DApp) built as part of a technical assessment for the GDG Club, showcasing smart contract development and Web3 integration. This project pushed me to learn Solidity and understand blockchain fundamentals within a week.",
        techStack: ["Solidity", "Hardhat", "Ethers.js", "React", "MetaMask", "IPFS"],
        features: [
            "Smart contract deployment on Ethereum testnet",
            "Web3 wallet integration with MetaMask",
            "Secure personal data storage on blockchain",
            "Decentralized file storage using IPFS",
            "Event logging and transaction monitoring",
            "User-friendly interface for blockchain interactions"
        ],
        challenges: [
            "Learning Solidity syntax and security best practices quickly",
            "Understanding gas optimization techniques",
            "Integrating Web3 with React frontend",
            "Implementing secure access control mechanisms"
        ],
        learnings: [
            "Solidity programming and smart contract security",
            "Ethereum blockchain architecture and EVM",
            "Web3.js and Ethers.js library usage",
            "Decentralized application design patterns",
            "IPFS integration for decentralized storage"
        ],
        githubLink: "https://github.com/TanishqGoyal05/gdg_blockchain_assignment/tree/personal-locker-assignment",
        liveLink: "",
        images: ["images/project3.jpg"]
    }
};

// ==========================================
// LOAD PROJECT DETAIL CONTENT
// ==========================================
function loadProjectDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const container = document.getElementById('projectDetailContent');
    
    if (!container || !projectId || !projectsData[projectId]) {
        // If project not found, show error or redirect
        if (container && projectId && !projectsData[projectId]) {
            container.innerHTML = `
                <section class="page-header">
                    <div class="container">
                        <h1>Project Not Found</h1>
                        <p>The project you're looking for doesn't exist.</p>
                        <a href="projects.html" class="btn btn-primary" style="margin-top: 1rem;">
                            ← Back to Projects
                        </a>
                    </div>
                </section>
            `;
        }
        return;
    }
    
    const project = projectsData[projectId];
    
    // Update page title
    document.title = `${project.title} - Tanishq Goyal`;
    
    container.innerHTML = `
        <section class="project-detail-hero">
            <div class="container">
                <span class="project-context-banner">
                    <i class="fas fa-tag"></i> ${project.context}
                </span>
                <h1 class="project-detail-title">${project.title}</h1>
                <p class="project-tagline">${project.tagline}</p>
                <p class="project-detail-description">${project.description}</p>
                <div class="project-detail-links">
                    <a href="${project.githubLink}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-github"></i> View Code
                    </a>
                    ${project.liveLink ? 
                        `<a href="${project.liveLink}" target="_blank" class="btn btn-secondary">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>` 
                        : ''}
                </div>
            </div>
        </section>

        <section class="project-detail-content">
            <div class="container">
                <div class="project-detail-section">
                    <h2><i class="fas fa-code"></i> Technologies Used</h2>
                    <div class="tech-stack">
                        ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>

                <div class="project-detail-section">
                    <h2><i class="fas fa-star"></i> Key Features</h2>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>

                <div class="project-detail-section">
                    <h2><i class="fas fa-mountain"></i> Challenges Faced</h2>
                    <ul>
                        ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>

                <div class="project-detail-section">
                    <h2><i class="fas fa-graduation-cap"></i> What I Learned</h2>
                    <ul>
                        ${project.learnings.map(learning => `<li>${learning}</li>`).join('')}
                    </ul>
                </div>

                ${project.images.length > 0 ? `
                <div class="project-detail-section">
                    <h2><i class="fas fa-images"></i> Screenshots</h2>
                    <div class="project-gallery">
                        ${project.images.map(img => `
                            <div class="gallery-item">
                                <img src="${img}" alt="${project.title}" onclick="openImageModal(this.src)">
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <div class="project-nav">
                    <a href="projects.html" class="btn btn-link">
                        <i class="fas fa-arrow-left"></i> Back to Projects
                    </a>
                    <div>
                        <a href="contact.html" class="btn btn-primary">
                            <i class="fas fa-comments"></i> Discuss This Project
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Add entrance animations to sections
    setTimeout(() => {
        document.querySelectorAll('.project-detail-section').forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    }, 100);
}

// ==========================================
// IMAGE MODAL FOR PROJECT SCREENSHOTS
// ==========================================
function openImageModal(imageSrc) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('imageModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeImageModal()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="closeImageModal()">
                    <i class="fas fa-times"></i>
                </button>
                <img src="" alt="Project Screenshot" id="modalImage">
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add modal styles dynamically
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .image-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
            }
            .image-modal.active {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                cursor: pointer;
            }
            .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                z-index: 1;
            }
            .modal-content img {
                max-width: 100%;
                max-height: 85vh;
                border-radius: 8px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }
            .modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: white;
                border: none;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.3s ease;
            }
            .modal-close:hover {
                transform: scale(1.1);
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormStatus('error', 'Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormStatus('error', 'Please enter a valid email address.');
            return;
        }
        
        try {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay (replace with actual backend integration)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success handling
            showFormStatus('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        } catch (error) {
            showFormStatus('error', 'Oops! Something went wrong. Please try again or email me directly.');
            
            // Reset button on error
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitBtn.disabled = false;
        }
    });
}

function showFormStatus(type, message) {
    if (!formStatus) return;
    
    formStatus.className = `form-status ${type}`;
    formStatus.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> 
        ${message}
    `;
    formStatus.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.querySelector('.navbar');

if (navbar) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScroll = currentScroll;
    });
}

// ==========================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-card, .experience-item, .activity-card, .cert-card, .education-card, .contact-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ==========================================
// TYPING EFFECT FOR HERO SECTION
// ==========================================
function initTypingEffect() {
    const typingElement = document.querySelector('.hero-subtitle');
    if (!typingElement) return;
    
    const roles = [
        'CSE Undergrad',
        'Blockchain Enthusiast',
        'Problem Solver',
        'Web Developer',
        'Tech Explorer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    // Store original text and create a span for typing
    const originalText = typingElement.textContent;
    
    // Only enable if you want typing effect (comment out to disable)
    // Uncomment below to enable typing effect
    /*
    typingElement.innerHTML = '<span class="typing-text"></span>';
    const typingText = typingElement.querySelector('.typing-text');
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
    */
}

// ==========================================
// SKILL CARDS HOVER EFFECT
// ==========================================
function initSkillCardsEffect() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
function initBackToTop() {
    // Create button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
        #backToTop {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color, #6366f1);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }
        #backToTop.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        #backToTop:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }
        
        /* Page-specific back to top colors */
        body.home #backToTop { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
        body.about #backToTop { background: linear-gradient(135deg, #f97316, #fb923c); }
        body.projects #backToTop, body.project-detail #backToTop { background: linear-gradient(135deg, #10b981, #34d399); }
        body.skills #backToTop { background: linear-gradient(135deg, #8b5cf6, #a78bfa); }
        body.experience #backToTop { background: linear-gradient(135deg, #ec4899, #f472b6); }
        body.contact #backToTop { background: linear-gradient(135deg, #06b6d4, #22d3ee); }
    `;
    document.head.appendChild(styles);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// PAGE LOAD PROGRESS BAR
// ==========================================
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'pageProgress';
    document.body.prepend(progressBar);
    
    const styles = document.createElement('style');
    styles.textContent = `
        #pageProgress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(to right, var(--primary-color, #6366f1), var(--secondary-color, #8b5cf6));
            z-index: 9999;
            transition: width 0.1s ease;
        }
        
        /* Page-specific progress bar colors */
        body.home #pageProgress { background: linear-gradient(to right, #6366f1, #8b5cf6); }
        body.about #pageProgress { background: linear-gradient(to right, #f97316, #fb923c); }
        body.projects #pageProgress, body.project-detail #pageProgress { background: linear-gradient(to right, #10b981, #34d399); }
        body.skills #pageProgress { background: linear-gradient(to right, #8b5cf6, #a78bfa); }
        body.experience #pageProgress { background: linear-gradient(to right, #ec4899, #f472b6); }
        body.contact #pageProgress { background: linear-gradient(to right, #06b6d4, #22d3ee); }
    `;
    document.head.appendChild(styles);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ==========================================
// INITIALIZE EVERYTHING ON DOM LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Load project details if on project detail page
    loadProjectDetail();
    
    // Initialize all features
    initScrollAnimations();
    initSkillCardsEffect();
    initBackToTop();
    initProgressBar();
    initTypingEffect();
    
    // Add loaded class for page transitions
    document.body.classList.add('loaded');
});

// ==========================================
// THEME-AWARE CONSOLE GREETING
// ==========================================
const themeColors = {
    home: '#6366f1',
    about: '#f97316',
    projects: '#10b981',
    'project-detail': '#10b981',
    skills: '#8b5cf6',
    experience: '#ec4899',
    contact: '#06b6d4'
};

const themeEmojis = {
    home: '🏠',
    about: '🙋',
    projects: '📂',
    'project-detail': '📂',
    skills: '🎯',
    experience: '💼',
    contact: '📧'
};

const currentTheme = document.body.classList[0] || 'home';
const themeColor = themeColors[currentTheme] || '#6366f1';
const themeEmoji = themeEmojis[currentTheme] || '🏠';

console.log(
    `%c ${themeEmoji} Welcome to Tanishq's Portfolio! `,
    `background: ${themeColor}; color: white; font-size: 16px; padding: 10px 15px; border-radius: 5px; font-weight: bold;`
);
console.log(
    `%c Currently viewing: ${currentTheme.toUpperCase().replace('-', ' ')} page `,
    `color: ${themeColor}; font-size: 12px; font-weight: bold;`
);
console.log(
    '%c Feel free to explore the code! Questions? Reach out via the contact page. ',
    'color: #6b7280; font-size: 11px;'
);