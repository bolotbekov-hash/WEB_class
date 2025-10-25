// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  loadThemePreference();
  initializeFormHandling();
  initBurgerMenu();
  initScrollTop();
  simpleTypeEffect('.hero h1', 80);
});

// ============================================
// 1. NAVIGATION & SCROLLING
// ============================================

// Setup smooth scrolling for all nav links
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      smoothScrollToSection(targetId);
      updateActiveNavLink();
    });
  });
}

// Smooth scroll animation to section
function smoothScrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });

    // Update active nav link after scroll
    setTimeout(updateActiveNavLink, 800);
  }
}

// Update which nav link is marked as active
function updateActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  let currentSection = null;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Track scroll and update nav
window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// 2. THEME TOGGLE (Dark/Light Mode)
// ============================================

// Toggle between dark and light themes
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');

  body.classList.toggle('light-mode');

  // Save theme preference
  const isDarkMode = !body.classList.contains('light-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

  // Update icon
  updateThemeIcon();

  console.log('Theme toggled to:', isDarkMode ? 'dark' : 'light');
}

// Update the theme toggle button icon
function updateThemeIcon() {
  const themeToggle = document.querySelector('.theme-toggle');
  const isDarkMode = !document.body.classList.contains('light-mode');
  themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
}

// Load saved theme preference from localStorage
function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }

  updateThemeIcon();
}

// ============================================
// 3. RESUME DOWNLOAD
// ============================================

// Generate and download resume file
function downloadResume() {
  const resumeContent = `
ALIBEK BOLOTBEKOV
Java Developer | Backend Specialist
Email: AlibekBolotbekov@gmail.com
Location: Bishkek, Kyrgyzstan

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFESSIONAL SUMMARY
Junior backend developer with a strong foundation in Java and the Spring ecosystem.
Passionate about creating efficient, scalable, and secure backend solutions.
Currently a 2nd-year student at Ala-Too International University.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TECHNICAL SKILLS
Backend Development:
  • Java (Core, OOP, Collections, Streams)
  • Spring Framework (Spring Boot, Spring Security)
  • Maven (Build automation & dependency management)
  • REST API Design & Implementation
  • Database Management (PostgreSQL, SQLite, SQL)

Frontend Development:
  • HTML5 & CSS3
  • JavaScript (ES6+, DOM manipulation)
  • Responsive Web Design

Development Tools:
  • Git & GitHub (Version control)
  • JDBC (Database connectivity)
  • IDE: IntelliJ IDEA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROJECTS

1. Kindergarten Management System
   Technology: Java, Spring Boot, Spring Security, PostgreSQL
   Description: Comprehensive web application for managing children, groups, teachers,
   and payment systems in kindergarten. Built with REST API architecture and secured
   authentication layers.

2. Library Management System
   Technology: Java, SQLite, JDBC
   Description: Desktop application for managing books, authors, and rentals.
   Implements full CRUD operations and persistent data storage.

3. Personal Portfolio Website
   Technology: HTML5, CSS3, JavaScript
   Description: Fully responsive portfolio showcasing projects, skills, and contact.
   Features smooth scrolling, theme toggle, and project filtering.

4. REST API for Student Management
   Technology: Java, Spring Boot, Maven, Git
   Description: RESTful API for managing student data with pagination, sorting,
   and authentication features.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EDUCATION
Ala-Too International University
Program: Computer Science
Year: 2nd Year Student
Expected Graduation: 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COURSES & CERTIFICATIONS
• Backend Development Specialization (Completed)
• Spring Boot & Spring Security (In Progress)
• Data Structures & Algorithms (Completed)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LANGUAGES
• Kyrgyz (Native)
• English (Fluent)
• Russian (Fluent)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

  // Create blob and download
  const blob = new Blob([resumeContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Alibek_Bolotbekov_Resume.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  console.log('Resume downloaded successfully');
}

// ============================================
// 4. CONTACT FORM HANDLING
// ============================================

// Initialize form submission handling
function initializeFormHandling() {
  const contactForm = document.querySelector('form');

  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmission);
  }
}

// Handle form submission
function handleFormSubmission(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Collect form data
  const data = {
    name: form.querySelector('input[type="text"]').value,
    email: form.querySelector('input[type="email"]').value,
    service: form.querySelector('select').value,
    message: form.querySelector('textarea').value,
    timestamp: new Date().toLocaleString()
  };

  // Log submission (in real app, would send to server)
  console.log('Form submitted:', data);

  // Show success message
  showSuccessMessage();

  // Clear form
  form.reset();

  // Store in memory (optional - for demonstration)
  storeFormSubmission(data);
}

// Display success message after form submission
function showSuccessMessage() {
  // Create success message element if it doesn't exist
  let messageSent = document.getElementById('messageSent');
  
  if (!messageSent) {
    messageSent = document.createElement('div');
    messageSent.id = 'messageSent';
    messageSent.textContent = '✓ Message sent successfully!';
    messageSent.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #00b4d8;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(messageSent);
  }

  // Show message
  setTimeout(() => {
    messageSent.style.opacity = '1';
  }, 100);

  // Hide message after 4 seconds
  setTimeout(() => {
    messageSent.style.opacity = '0';
  }, 4000);

  console.log('Success message displayed');
}

// Store form submissions in memory
const formSubmissions = [];

function storeFormSubmission(data) {
  formSubmissions.push(data);
  console.log('Total submissions:', formSubmissions.length);
  console.log('All submissions:', formSubmissions);
}

// ============================================
// 5. BUTTON EVENT HANDLERS
// ============================================

// Handle "Contact Me" button clicks
function contactMe() {
  smoothScrollToSection('contact');
}

// ============================================
// 6. SCROLL TO TOP BUTTON
// ============================================

function initScrollTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '↑';
  document.body.appendChild(btn);

  // Show button when scrolled down 300px
  function toggleVisibility() {
    const visible = window.scrollY > 300;
    btn.style.opacity = visible ? '1' : '0';
    btn.style.pointerEvents = visible ? 'auto' : 'none';
  }

  // Smooth scroll to top on click
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Add hover animation
  btn.addEventListener('mouseenter', () => btn.classList.add('scroll-top--hover'));
  btn.addEventListener('mouseleave', () => btn.classList.remove('scroll-top--hover'));

  // Track scroll
  window.addEventListener('scroll', toggleVisibility);

  // Check initial state on load
  toggleVisibility();
}

// ============================================
// 7. TYPING EFFECT
// ============================================

function simpleTypeEffect(selector = '.hero h1', speed = 80) {
  const el = document.querySelector(selector);
  if (!el) return;               
  const text = el.textContent.trim();
  if (!text) return;              

  el.textContent = '';         
  let i = 0;

  function step() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(step, speed);
    }
  }
  step();
}

// ============================================
// 8. BURGER MENU
// ============================================

function initBurgerMenu() {
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  if (!burger || !menu) return;

  // Toggle menu on burger click
  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('open');
  });

  // Close menu when clicking on a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    });
  });

  // Close menu when clicking contact button in mobile menu
  menu.querySelectorAll('.cta-button').forEach(btn => {
    btn.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    });
  });

  // Close menu on window resize to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      burger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    }
  });
}

// ============================================
// CONSOLE GREETING
// ============================================

console.log('%c👋 Welcome to my portfolio!', 'color: #00b4d8; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore the code!', 'color: #999; font-size: 14px;');
