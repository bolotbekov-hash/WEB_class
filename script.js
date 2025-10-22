// ============================================
// 1. NAVIGATION & SCROLLING
// ============================================

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  loadThemePreference();
  initializeFormHandling();
  initializeProjectFiltering();
});

// Setup smooth scrolling for all nav links
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const contactButtons = document.querySelectorAll('[onclick*="Contact"]');

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

    // обновляем активный пункт навигации чуть позже
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
// 4. PROJECT FILTERING
// ============================================

// Initialize project filtering functionality
function initializeProjectFiltering() {
  const filterTags = document.querySelectorAll('.tag');

  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const category = tag.textContent.toLowerCase();
      filterProjects(category);

      // Update active tag styling
      filterTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
    });
  });
}

// Filter projects based on selected category
function filterProjects(category) {
  const projectCards = document.querySelectorAll('.project-card');
  let visibleCount = 0;

  projectCards.forEach(card => {
    const cardCategories = card.dataset.category.toLowerCase().split(' ');

    if (category === 'all' || cardCategories.includes(category)) {
      card.style.display = 'block';
      card.style.animation = 'fadeIn 0.3s ease-in';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  console.log(`Filtered to category: ${category}, showing ${visibleCount} projects`);
}

// ============================================
// 5. CONTACT FORM HANDLING
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

  // Store in localStorage (optional - for demonstration)
  storeFormSubmission(data);
}

// Display success message after form submission
function showSuccessMessage() {
  const messageSent = document.getElementById('messageSent');

  if (messageSent) {
    messageSent.classList.add('show');

    // Remove message after 4 seconds
    setTimeout(() => {
      messageSent.classList.remove('show');
    }, 4000);

    console.log('Success message displayed');
  }
}

// Store form submissions in memory
const formSubmissions = [];

function storeFormSubmission(data) {
  formSubmissions.push(data);
  console.log('Total submissions:', formSubmissions.length);
  console.log('All submissions:', formSubmissions);
}

// ============================================
// 6. BUTTON EVENT HANDLERS
// ============================================

// Handle "Contact Me" button clicks
function contactMe() {
  smoothScrollToSection('contact');
}

// Handle "View All" projects button
function viewAllProjects() {
  console.log('View all projects clicked');
  alert('More projects coming soon! Stay tuned for updates.');
}

// ============================================
// 7. UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Log portfolio initialization
console.log('Portfolio JavaScript loaded successfully');
console.log('Version: 1.0.0');
console.log('Author: Alibek Bolotbekov');

// ============================================
// 8. PAGE PERFORMANCE MONITORING
// ============================================

// Monitor page performance
function monitorPerformance() {
  if (window.performance) {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page loaded in: ${pageLoadTime}ms`);
    });
  }
}

monitorPerformance();

// ============================================
// 9. ACCESSIBILITY FEATURES
// ============================================

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Alt + S: scroll to services
  if (e.altKey && e.key === 's') {
    smoothScrollToSection('services');
  }
  // Alt + P: scroll to projects
  if (e.altKey && e.key === 'p') {
    smoothScrollToSection('projects');
  }
  // Alt + C: scroll to contact
  if (e.altKey && e.key === 'c') {
    smoothScrollToSection('contact');
  }
});

console.log('Keyboard shortcuts enabled: Alt+S (Services), Alt+P (Projects), Alt+C (Contact)');

// ============================================
// 10. ANALYTICS & TRACKING
// ============================================

// Track user interactions
const analytics = {
  pageViews: 1,
  interactions: {
    navClicks: 0,
    buttonClicks: 0,
    formSubmissions: formSubmissions.length,
    themeToggles: 0
  },

  recordNavClick() {
    this.interactions.navClicks++;
    console.log('Nav clicks:', this.interactions.navClicks);
  },

  recordButtonClick() {
    this.interactions.buttonClicks++;
    console.log('Button clicks:', this.interactions.buttonClicks);
  },

  getAnalytics() {
    return {
      pageViews: this.pageViews,
      interactions: this.interactions,
      timestamp: new Date().toLocaleString()
    };
  }
};

// Log analytics on page close
window.addEventListener('beforeunload', () => {
  console.log('Session analytics:', analytics.getAnalytics());
});