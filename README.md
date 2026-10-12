# 🎓 Student IT Career Hub

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Core%20Features%20Complete-success)

A student-friendly web dashboard that helps IT students organize their career preparation in one place: skills, projects, internships, daily coding practice, and a live-preview resume builder.

---

## 📌 About the Project

Preparing for an IT career usually means juggling scattered notes, spreadsheets, and documents. **Student IT Career Hub** brings everything into a single dashboard so students can track their progress and generate a professional resume without switching tools.

## ✨ Features

| Feature | Description |
| --- | --- |
| 📊 **Student Dashboard** | Overview of career preparation progress at a glance |
| 💻 **Skills Management** | Add, update, and delete technical skills |
| 🚀 **Project Management** | Maintain a personal list of projects |
| 🏢 **Internship Tracker** | Record and manage internship opportunities |
| 🔥 **Coding Practice Tracker** | Log coding practice days and build consistency |
| 📄 **Resume Builder** | Enter personal, educational, and professional details |
| 👀 **Live Resume Preview** | See the resume update in real time while editing |
| 📥 **PDF Download** | Save the resume as a PDF via the browser's print feature |
| 💾 **Local Data Storage** | Data persists in the browser using LocalStorage |

## 🛠️ Tech Stack

- **Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3
- **Build Tool:** Vite
- **Storage:** Browser LocalStorage
- **Linting:** ESLint

## 📸 Screenshots

> Add screenshots here (Dashboard, Skills, Resume Builder, Resume Preview).

```md
![Dashboard](./screenshots/dashboard.png)
![Resume Builder](./screenshots/resume-builder.png)
```

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Kasthuri-001/StudentITCareerHub.git

# 2. Move into the project folder
cd StudentITCareerHub

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open the URL shown in your terminal, usually `http://localhost:5173/`.

### Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
StudentITCareerHub/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and icons
│   ├── App.jsx          # Main application component
│   ├── App.css          # Component styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 💾 Data Storage

All data is stored in your browser's **LocalStorage**. This means:

- Data survives page refreshes in the same browser.
- Data is **not** synced across devices or browsers.
- Clearing browser data will remove saved information.

## 🎯 Project Objectives

- Help students organize their IT career preparation
- Encourage consistent coding practice
- Keep skills and project details in one place
- Track internship opportunities
- Make professional resume creation simple

## 🚀 Future Enhancements

- [ ] Student login and authentication
- [ ] Cloud database integration
- [ ] Multiple resume templates and customization
- [ ] Internship notifications and application status updates
- [ ] Career progress analytics
- [ ] Online deployment for public access

## 👩‍💻 Author

**Kasthuri**
Final-year B.Tech Information Technology student, VSB College of Engineering Technical Campus, Coimbatore

- GitHub: [@Kasthuri-001](https://github.com/Kasthuri-001)

## 🤝 Contributing

Suggestions and improvements are welcome. Fork the repository, create a feature branch, and open a pull request.

## 📄 License

This project is available for educational and personal use. Add a `LICENSE` file (for example, MIT) to make the terms explicit.

---

⭐ If you find this project useful, consider giving it a star!
