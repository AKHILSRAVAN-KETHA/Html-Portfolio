// ===== DATA STRUCTURES (ES6) =====
const portfolioData = {
  projects: [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features dark mode support, smooth navigation, and optimized for all devices.",
      tags: ["HTML5", "CSS3", "JavaScript"],
      year: 2024,
    },
    {
      id: 2,
      title: "React E-Commerce App",
      description:
        "Full-featured e-commerce application with product filtering, cart management, and payment integration using React and Node.js backend.",
      tags: ["React", "Node.js", "MongoDB"],
      year: 2023,
    },
    {
      id: 3,
      title: "Task Management API",
      description:
        "RESTful API for task management with authentication, CRUD operations, and database integration. Built with Express.js and MongoDB.",
      tags: ["Node.js", "Express", "REST API"],
      year: 2023,
    },
    {
      id: 4,
      title: "Real-time Chat Application",
      description:
        "Real-time messaging platform with Socket.io integration, user authentication, and persistent message storage. Responsive UI with React.",
      tags: ["React", "Socket.io", "Node.js"],
      year: 2022,
    },
    {
      id: 5,
      title: "Analytics Dashboard",
      description:
        "Enterprise-level analytics dashboard displaying real-time data visualization. Built with React, D3.js, and backend API integration.",
      tags: ["React", "D3.js", "Express"],
      year: 2021,
    },
    {
      id: 6,
      title: "Inventory Management System",
      description:
        "Full-stack inventory management system with role-based access and real-time updates. Built with vanilla JavaScript and Node.js backend.",
      tags: ["JavaScript", "Node.js", "PostgreSQL"],
      year: 2020,
    },
  ],
  experience: [
    {
      id: 1,
      position: "Senior Application Engineer",
      company: "Oracle India",
      startYear: 2019,
      endYear: new Date().getFullYear(),
      description:
        "Led development of multiple enterprise applications. Optimized application performance, mentored junior developers, and implemented best practices in software development. Collaborated with cross-functional teams to deliver high-quality solutions.",
    },
    {
      id: 2,
      position: "Application Developer",
      company: "Oracle India",
      startYear: 2017,
      endYear: 2019,
      description:
        "Developed and maintained Java-based applications. Implemented responsive UI components using modern technologies. Participated in code reviews and contributed to technical documentation.",
    },
    {
      id: 3,
      position: "Junior Developer",
      company: "Oracle India",
      startYear: 2016,
      endYear: 2017,
      description:
        "Started my professional journey at Oracle. Learned best practices in software development, contributed to various projects, and developed strong fundamentals in programming.",
    },
    {
      id: 4,
      position: "Full Stack Developer",
      company: "Tech Solutions Ltd",
      startYear: 2020,
      endYear: 2023,
      description:
        "Built and maintained multiple client-facing web applications. Improved application load time by 40% through optimization. Led a team of 3 developers in agile environment.",
    },
  ],
};

// ===== TEMPLATE LITERAL FUNCTIONS =====
const renderProjectCard = ({ title, description, tags, year }) => `
  <div class="project-card">
    <h3>${title}</h3>
    <p>${description}</p>
    <div class="project-tags">
      ${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <small style="color: var(--accent); margin-top: 1rem; display: block;">${year}</small>
  </div>
`;

const renderExperienceItem = ({
  position,
  company,
  startYear,
  endYear,
  description,
}) => `
  <div class="experience-item">
    <h3>${position}</h3>
    <div class="position">${company}</div>
    <div class="date">${startYear} - ${endYear}</div>
    <p>${description}</p>
  </div>
`;

// ===== DOM RENDERING FUNCTIONS =====
const renderProjects = (projects) => {
  const projectsGrid = document.getElementById("projectsGrid");
  if (projectsGrid) {
    projectsGrid.innerHTML = projects
      .map((project) => renderProjectCard(project))
      .join("");
  }
};

const renderExperience = (experiences) => {
  const experienceContainer = document.getElementById("experienceContainer");
  if (experienceContainer) {
    experienceContainer.innerHTML = experiences
      .map((exp) => renderExperienceItem(exp))
      .join("");
  }
};

// ===== UTILITY FUNCTIONS (ES6) =====
const toggleTheme = () => {
  document.body.classList.toggle("dark-mode");
  const themeToggle = document.querySelector(".theme-toggle");
  const isDarkMode = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
};

const showSection = (sectionId) => {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });
  // Show selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");
    window.scrollTo(0, 0);
  }
};

const getCurrentYear = () => new Date().getFullYear();

const getYearsOfExperience = () => {
  const startYear = 2016;
  return getCurrentYear() - startYear;
};

// Arrow function to calculate experience statistics
const calculateExperienceStats = (experiences) => {
  const totalYears = experiences.reduce((sum, exp) => {
    return sum + (exp.endYear - exp.startYear);
  }, 0);
  return {
    totalYears,
    companies: new Set(experiences.map((exp) => exp.company)).size,
    positions: experiences.length,
  };
};

// ===== INITIALIZATION =====
const initializePortfolio = () => {
  // Render dynamic content
  renderProjects(portfolioData.projects);
  renderExperience(portfolioData.experience);

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.querySelector(".theme-toggle").textContent = "☀️";
  }

  // Log experience stats
  const stats = calculateExperienceStats(portfolioData.experience);
  console.log(`📊 Experience Overview:`, stats);
  console.log(`💼 Total Professional Years: ${getYearsOfExperience()}`);
};

// Run initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePortfolio);

// Expose functions globally for onclick handlers
window.toggleTheme = toggleTheme;
window.showSection = showSection;
