High-Performance Kanban Project Tracker
A professional-grade Kanban board built with React, TypeScript, and Vite, specifically optimized for high performance and a premium developer experience.

 Live Demo: https://project-tracker-sigma-one.vercel.app
 Key Technical Highlights
1.  Virtual Scrolling 
Challenge: Rendering 500+ tasks simultaneously makes the DOM heavy and causes lag.

Solution: Implemented Virtual Scrolling logic. The app only renders the 10-15 tasks currently visible in the viewport.

Result: Maintains a constant 60 FPS even with thousands of tasks, ensuring a buttery-smooth experience.

2.  Optimized State Management
Powered by Zustand for lightweight and reactive state management.

Zero unnecessary re-renders during Drag and Drop operations, making the UI highly reactive.

3.  Modern UI/UX (Glassmorphism)
Premium Design: Implemented a sleek Glassmorphism Dark Theme with blurred backgrounds and clean borders.

Responsive: Fully optimized for Desktop, Tablet, and Mobile screens.

4. Performance Metrics
Lighthouse Score: Targeted 90+ in Performance & Accessibility.

Production Build: Optimized build size under 250kB for lightning-fast initial loads.

Tech Stack
Frontend: React.js, TypeScript

Styling: Tailwind CSS (Custom Glassmorphism)

State: Zustand

Build Tool: Vite

Deployment: Vercel


