# SimpleSite: A Dynamic Personal Portfolio Website

## Project Overview

SimpleSite is a modern, responsive personal portfolio website built using React.js, designed to showcase coding projects with a clean, intuitive interface and dynamic content generation.

## Key Features

### 1. Dynamic Project Management
- Automatically generates project listings from a `/projects` directory
- Supports markdown-based project descriptions
- Dynamically creates project pages based on directory structure

### 2. Responsive Design
- Mobile-friendly layout
- Adaptive typography
- Consistent styling across components

### 3. Theme Support
- Dark and light mode toggle
- Color scheme adapts dynamically
- Hover effects with consistent color palette

### 4. Interactive Components
- Sidebar with project navigation
- Hover effects on navigation links
- Project cards with interactive animations

## Technical Stack

- **Frontend**: React.js
- **Routing**: React Router
- **Deployment**: GitHub Pages
- **Content Management**: Markdown-based project descriptions

## Project Structure

```
/public
├── projects/
│   ├── project1.md
│   ├── project1_image.png
│   └── ...
├── projects.json
└── logo.svg

/src
├── components/
│   ├── TopBar.js
│   ├── Sidebar.js
│   └── ProjectCard.js
├── pages/
│   ├── HomePage.js
│   ├── AboutPage.js
│   └── ProjectDetailPage.js
└── App.js
```

## Notable Implementations

- Centralized content loading
- Dynamic hover effects
- Responsive design principles
- Dark/light mode support
- Fixed top navigation bar

## Future Improvements
- Add more interactive animations
- Implement advanced filtering for projects
- Enhance mobile responsiveness
- Add multilingual support

## Development Philosophy
SimpleSite emphasizes clean code, modular design, and user-friendly interactions, showcasing modern web development practices.