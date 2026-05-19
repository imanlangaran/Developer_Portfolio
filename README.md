# Developer Portfolio

A personal developer portfolio website built with React and Vite.

This project includes multiple portfolio sections such as hero, skills, projects, about, and contact pages, along with animations, multilingual support, and responsive UI components.

## Live Demo

* Portfolio Website: [https://imanlangaran.github.io/Developer_Portfolio/](https://imanlangaran.github.io/Developer_Portfolio/)

## Features

* React + Vite setup
* Responsive portfolio layout
* Animated UI using Framer Motion
* Multilingual support with i18next
* Contact functionality using EmailJS
* Project showcase section
* Skills section
* About section
* Custom loading screen
* React Router integration
* Tailwind CSS styling

## Tech Stack

### Frontend

* React 19
* Vite
* React Router DOM
* Tailwind CSS
* Framer Motion
* Lucide React
* React Icons

### Internationalization

* i18next
* react-i18next

### Utilities

* EmailJS Browser
* marked
* marked-base-url

## Project Structure

```bash
Developer_Portfolio/
├── public/
├── src/
│   ├── Components/
│   ├── assets/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .github/workflows/
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Installation

Clone the repository:

```bash
git clone https://github.com/imanlangaran/Developer_Portfolio.git
```

Navigate into the project directory:

```bash
cd Developer_Portfolio
```

Install dependencies:

```bash
npm install
```

## Running the Project

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Available Scripts

| Script            | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Starts the Vite development server    |
| `npm run build`   | Creates a production build            |
| `npm run preview` | Previews the production build locally |
| `npm run lint`    | Runs ESLint                           |

## Dependencies

```json
{
  "@emailjs/browser": "^4.4.1",
  "@tailwindcss/vite": "^4.3.0",
  "framer-motion": "^12.19.1",
  "i18next": "^25.3.1",
  "lucide-react": "^0.523.0",
  "marked": "^18.0.3",
  "marked-base-url": "^1.1.9",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-i18next": "^15.6.0",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.15.0",
  "tailwindcss": "^4.3.0"
}
```

## Deployment

The project is deployed using GitHub Pages.

