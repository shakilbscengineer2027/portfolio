// EDIT THIS FILE to customise the whole website.
// Anything marked PLACEHOLDER must be replaced with your real information.

export const profile = {
  name: "Shakil Miah",
  title: "Full-Stack Developer",
  badge: "MERN STACK DEVELOPER",
  brand: "MERN Stack Developer",
  intro:
    "I build modern, responsive, and scalable web applications using modern web technologies. I enjoy writing clean code and creating excellent user experiences.",
  // Put your photo in frontend/public/images/ and set e.g. "/images/portrait.jpg". Empty = placeholder.
  portrait: "",
  // Put your PDF in frontend/public/documents/ and set e.g. "/documents/resume.pdf". Empty = button hidden.
  resumePath: "",
  siteDescription: "Portfolio of Shakil Miah, a MERN stack developer building modern web applications.",
};

export const about = {
  biography: [
    "I am a MERN stack web developer who enjoys building web applications from the database to the user interface. I like designing clear APIs, responsive layouts, and interfaces that feel simple to use.",
    "I focus on clean, readable code and sensible project structure. I enjoy learning new tools in the JavaScript ecosystem and applying them to real problems.",
  ],
  // PLACEHOLDER values: replace with your real details.
  facts: [
    { label: "Education", value: "BSC Engineering in CSE" },
    { label: "Location", value: "Mirzapur, Tangail, Bangladesh" },
    { label: "Projects", value: "Add your project count" },
  ],
};

export const skills = [
  { name: "Tailwind CSS", icon: "tailwind", description: "Creating responsive, modern, and clean layouts quickly using utility-first styling." },
  { name: "JavaScript", icon: "javascript", description: "Writing efficient, modern, and optimized code for both frontend and backend logic." },
  { name: "React", icon: "react", description: "Building fast, interactive, and component-based UIs with clean state management." },
  { name: "Node.js", icon: "node", description: "Developing scalable backend logic and high-performance server-side applications." },
  { name: "MongoDB", icon: "mongodb", description: "Managing NoSQL databases with flexible schemas for high-performance data storage." },
  { name: "HTML5", icon: "html", description: "Creating clean, well-structured page layouts with semantic markup for accessibility and SEO." },
];

export const services = [
  { title: "Web Development", icon: "web", description: "Responsive websites and web apps built with React and Next.js." },
  { title: "Backend Development", icon: "backend", description: "Secure REST APIs and server logic using Node.js and Express." },
  { title: "UI/UX Design", icon: "design", description: "Clean, usable interfaces with consistent spacing and visual hierarchy." },
  { title: "API Integration", icon: "api", description: "Connecting your app to third-party services and payment providers." },
  { title: "Database Management", icon: "database", description: "MongoDB schema design, queries, and data modelling." },
  { title: "Bug Fixing & Support", icon: "bug", description: "Finding and fixing issues, plus help keeping your app healthy." },
  { title: "Performance Optimization", icon: "performance", description: "Faster load times, smaller bundles, and efficient queries." },
  { title: "Deployment & Hosting", icon: "deploy", description: "Putting your app online with environment setup and hosting." },
];

// SAMPLE projects. Replace them with your real work.
// Leave githubUrl / demoUrl as "" when a link does not exist; the button is then disabled.
export const projects = [
  {
    id: "task-manager",
    title: "Task Management Application",
    category: "Full-Stack",
    description: "Sample project: tasks with authentication, CRUD operations, and a responsive UI.",
    image: "", // e.g. "/images/task-manager.png"
    tags: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "",
    demoUrl: "",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    category: "Full-Stack",
    description: "Sample project: product listing, cart system, and a checkout flow.",
    image: "",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "",
    demoUrl: "",
  },
  {
    id: "finance-dashboard",
    title: "Personal Finance Dashboard",
    category: "Frontend",
    description: "Sample project: charts and summaries for income and expenses.",
    image: "",
    tags: ["React", "Tailwind CSS"],
    githubUrl: "",
    demoUrl: "",
  },
  {
    id: "portfolio-site",
    title: "Developer Portfolio Website",
    category: "Frontend",
    description: "Sample project: a responsive portfolio built with Next.js and Tailwind CSS.",
    image: "",
    tags: ["Next.js", "Tailwind CSS"],
    githubUrl: "",
    demoUrl: "",
  },
];

// PLACEHOLDER contact details. Empty values are hidden on the website.
export const contact = {
  heading: "Get in touch today",
  text: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
  email: "shakilbscengineer2027@gmail.com",
  phone: "+01792031534",
  location: "Mirzapur, Tangail, Bangladesh",
};

// Empty URL = link is hidden.
export const socialLinks = [
  { name: "GitHub", url: "https://github.com/shakilbscengineer2027" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/shakil-sikder-462a73438/" },
  { name: "Facebook", url: "https://www.facebook.com/share/1C5FceUChQ/" },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
