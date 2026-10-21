# Example Private Project

> Sample documentation demonstrating how to configure and structure documentation for private projects in this portfolio.

---

## Overview

This directory (`public/docs/example-project/`) serves as a live blueprint for documenting **private projects** (such as proprietary client applications, enterprise software, or internal tools) whose source code is not publicly hosted on GitHub.

When a project is configured with `type: "private"` in `src/utils/data.js`, the portfolio renders the project detail modal using local documentation stored right here in `public/docs/<slug>/`.

---

## Directory Structure

To document a private project, create a folder under `public/docs/` matching your project's `slug` (or `readme`) field:

```
public/
└── docs/
    └── example-project/
        ├── README.md          # Primary / English documentation (default & fallback)
        ├── README-fa.md       # Persian documentation (loaded when language is set to fa)
        └── preview.png        # Local images, diagrams, screenshots
```

---

## Configuration in `src/utils/data.js`

Add or update your project entry in `PROJECTS`:

```javascript
{
  id: 10,
  title: "Enterprise Dashboard",
  description: "A comprehensive internal monitoring and operations dashboard.",
  image: false, // or import an image from src/assets/images/
  tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
  type: "private",
  slug: "example-project", // corresponds to public/docs/example-project/
  liveUrl: "https://demo.example.com", // optional live preview URL
  featured: true,
  category: "Full Stack",
}
```

### Key Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `type` | `"private"` | Flags the project as private. Automatically hides the GitHub button in the UI. |
| `slug` | `string` | The directory name inside `public/docs/` containing the markdown documentation. |
| `readme` | `string` | *(Optional)* Alias for `slug`. If both are provided, `readme` takes precedence. |
| `githubUrl` | `string` | *(Optional / Not needed)* Omitted or ignored for private projects. |
| `liveUrl` | `string` | *(Optional)* Displays a **Live Preview** button in the project detail view. |

---

## Adding Images and Assets

You can store screenshots, architecture diagrams, and mockups directly inside `public/docs/<slug>/`:

```markdown
![Architecture Diagram](./architecture.png)
```

The portfolio's Markdown renderer automatically resolves relative image paths against the current documentation folder (`/docs/<slug>/`).

---

## Multi-Language Support (i18n)

The documentation reader seamlessly adapts to the user's active language:

- **English (`en`)**: Loads `README.md`.
- **Persian (`fa`)**: Loads `README-fa.md`.
- **Fallback**: If `README-fa.md` does not exist, the renderer gracefully falls back to `README.md`.

---

## Sample Project Section

### Architecture & Tech Stack

```
[ Client App (React + Vite) ]
             │
             ▼
     [ API Gateway ]
       ├── Auth Service (JWT)
       ├── Analytics Engine
       └── Data Pipeline
             │
             ▼
     [ PostgreSQL DB ]
```

- **Frontend**: React 19, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, Redis
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Docker, Nginx, CI/CD with GitHub Actions

### Key Features

1. **Role-Based Access Control (RBAC)**: Fine-grained permissions for administrators, managers, and operators.
2. **Real-Time Telemetry**: WebSocket-driven telemetry charts with sub-second latency updates.
3. **Data Export & Reports**: Automated PDF and CSV report generation scheduled via background workers.
4. **Audit Logging**: Immutable event ledger tracking all critical administrative operations.
