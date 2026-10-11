
import { useState, useEffect } from 'react';
import './App.css';

const initialSkills = [
  { id: 1, name: 'Python', level: 35 },
  { id: 2, name: 'Java', level: 20 },
  { id: 3, name: 'React', level: 10 },
];

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [skills, setSkills] = useState(() =>
    loadData('studentHubSkills', initialSkills)
  );
  const [projects, setProjects] = useState(() =>
    loadData('studentHubProjects', [])
  );
  const [internships, setInternships] = useState(() =>
    loadData('studentHubInternships', [])
  );
  const [codingDays, setCodingDays] = useState(() =>
    loadData('studentHubCodingDays', 0)
  );

  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('10');
  const [message, setMessage] = useState('');

  const [projectName, setProjectName] = useState('');
  const [projectLink, setProjectLink] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');

  const [activeSection, setActiveSection] = useState('dashboard');

  // Resume details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [education, setEducation] = useState('');
  const [summary, setSummary] = useState('');

  // Automatically save app data
  useEffect(() => {
    localStorage.setItem('studentHubSkills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('studentHubProjects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(
      'studentHubInternships',
      JSON.stringify(internships)
    );
  }, [internships]);

  useEffect(() => {
    localStorage.setItem('studentHubCodingDays', JSON.stringify(codingDays));
  }, [codingDays]);

  // Save resume details too
  useEffect(() => {
    localStorage.setItem(
      'studentHubResume',
      JSON.stringify({ fullName, email, phone, location, education, summary })
    );
  }, [fullName, email, phone, location, education, summary]);

  // Load previously saved resume details
  useEffect(() => {
    const saved = loadData('studentHubResume', {});
    setFullName(saved.fullName || '');
    setEmail(saved.email || '');
    setPhone(saved.phone || '');
    setLocation(saved.location || '');
    setEducation(saved.education || '');
    setSummary(saved.summary || '');
  }, []);

  function addSkill(event) {
    event.preventDefault();
    const name = skillName.trim();

    if (!name) {
      setMessage('Please enter a skill name.');
      return;
    }

    if (skills.some(skill => skill.name.toLowerCase() === name.toLowerCase())) {
      setMessage('This skill already exists.');
      return;
    }

    setSkills(current => [
      ...current,
      { id: Date.now(), name, level: Number(skillLevel) },
    ]);

    setSkillName('');
    setSkillLevel('10');
    setMessage('Skill added successfully!');
  }

  function updateSkill(id, level) {
    setSkills(current =>
      current.map(skill =>
        skill.id === id ? { ...skill, level: Number(level) } : skill
      )
    );
  }

  function addProject(event) {
    event.preventDefault();
    if (!projectName.trim()) return;

    setProjects(current => [
      ...current,
      {
        id: Date.now(),
        name: projectName.trim(),
        link: projectLink.trim(),
      },
    ]);

    setProjectName('');
    setProjectLink('');
  }

  function addInternship(event) {
    event.preventDefault();
    if (!companyName.trim() || !role.trim()) return;

    setInternships(current => [
      ...current,
      {
        id: Date.now(),
        company: companyName.trim(),
        role: role.trim(),
        status,
      },
    ]);

    setCompanyName('');
    setRole('');
    setStatus('Applied');
  }

  function downloadPDF() {
    if (!fullName.trim()) {
      window.alert('Please enter your full name first.');
      return;
    }

    window.print();
  }

  const completedSkills = skills.filter(
    skill => skill.level === 100
  ).length;

  return (
    <div className="app">
      <style>{`
        .resume-form {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin: 18px 0 24px;
        }

        .resume-form input,
        .resume-form textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 12px;
          border: 1px solid #dce4df;
          border-radius: 9px;
          font: inherit;
          background: #fff;
          color: #25352d;
        }

        .resume-form textarea,
        .resume-form .full-width {
          grid-column: 1 / -1;
        }

        .resume-preview {
          background: #eef3f0;
          padding: 22px;
          border-radius: 12px;
          overflow-wrap: anywhere;
        }

        .resume-paper {
          max-width: 800px;
          min-height: 700px;
          margin: 0 auto;
          padding: 42px;
          background: white;
          color: #26352e;
          box-shadow: 0 3px 18px rgba(0,0,0,.08);
          font-family: Arial, sans-serif;
        }

        .resume-paper h2 {
          margin: 0 0 8px;
          color: #176b47;
          font-size: 28px;
          overflow-wrap: anywhere;
        }

        .resume-contact {
          color: #56655d;
          font-size: 13px;
          line-height: 1.8;
        }

        .resume-paper h3 {
          margin: 24px 0 9px;
          padding-bottom: 6px;
          border-bottom: 2px solid #24845a;
          color: #176b47;
          font-size: 14px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .resume-paper p,
        .resume-paper li {
          font-size: 13px;
          line-height: 1.65;
          white-space: pre-wrap;
        }

        .resume-paper ul {
          padding-left: 20px;
        }

        .resume-item {
          margin: 10px 0;
          break-inside: avoid;
        }

        .resume-item a {
          color: #176b47;
          overflow-wrap: anywhere;
        }

        .resume-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin: 16px 0;
        }

        @media (max-width: 600px) {
          .resume-form {
            grid-template-columns: 1fr;
          }

          .resume-form textarea,
          .resume-form .full-width {
            grid-column: auto;
          }

          .resume-paper {
            padding: 22px;
            min-height: auto;
          }

          .resume-preview {
            padding: 10px;
          }
        }

        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          body {
            background: white !important;
          }

          body * {
            visibility: hidden !important;
          }

          #resume-print-area,
          #resume-print-area * {
            visibility: visible !important;
          }

          #resume-print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }

          #resume-print-area .resume-paper {
            max-width: none !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }

          #resume-print-area .resume-actions,
          #resume-print-area .preview-heading {
            display: none !important;
          }

          #resume-print-area .resume-paper h3 {
            break-after: avoid;
          }

          #resume-print-area .resume-item {
            break-inside: avoid;
          }
        }
      `}</style>

      <aside className="sidebar">
        <h2>CareerHub</h2>
        <p className="menu-title">WORKSPACE</p>

        {[
          ['dashboard', '▦ Dashboard'],
          ['skills', '◎ My Skills'],
          ['coding', '⌨ Coding Tracker'],
          ['projects', '▣ My Projects'],
          ['resume', '▤ Resume Builder'],
          ['internships', '✉ Internships'],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === id ? 'active' : ''}
            onClick={() => setActiveSection(id)}
          >
            {label}
          </a>
        ))}

        <div className="sidebar-note">
          <span>🚀</span>
          <b>Keep growing!</b>
          <small>Small steps create big careers.</small>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="welcome">YOUR PERSONAL CAREER SPACE</p>
            <h1>Dashboard</h1>
          </div>
          <div className="profile">
            <div className="avatar">S</div>
            <span>Student</span>
          </div>
        </header>

        <section className="hero">
          <div>
            <p className="hero-label">YOUR CAREER JOURNEY</p>
            <h2>Build your future in tech.</h2>
            <p>
              Learn new skills, practise coding, build projects and get ready
              for your dream job.
            </p>
            <a className="hero-button" href="#skills">
              Explore My Skills →
            </a>
          </div>
          <div className="hero-icon">🚀</div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span className="stat-icon purple">▣</span>
            <p>Total Projects</p>
            <h2>{projects.length}</h2>
            <small>Your portfolio projects</small>
          </div>
          <div className="stat-card">
            <span className="stat-icon blue">⌨</span>
            <p>Coding Days</p>
            <h2>{codingDays}</h2>
            <small>Practice sessions recorded</small>
          </div>
          <div className="stat-card">
            <span className="stat-icon green">◎</span>
            <p>Skills Learning</p>
            <h2>{skills.length}</h2>
            <small>{completedSkills} skills completed</small>
          </div>
          <div className="stat-card">
            <span className="stat-icon orange">✉</span>
            <p>Internships</p>
            <h2>{internships.length}</h2>
            <small>Applications tracked</small>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel" id="skills">
            <div className="panel-heading">
              <div>
                <h3>My Skills</h3>
                <p>Add skills and update your learning progress.</p>
              </div>
              <span className="panel-symbol">✦</span>
            </div>

            <form className="feature-form" onSubmit={addSkill}>
              <input
                value={skillName}
                onChange={event => setSkillName(event.target.value)}
                placeholder="Enter skill (e.g. JavaScript)"
                aria-label="Skill name"
                maxLength={40}
              />
              <select
                value={skillLevel}
                onChange={event => setSkillLevel(event.target.value)}
                aria-label="Initial skill progress"
              >
                <option value="10">10% progress</option>
                <option value="25">25% progress</option>
                <option value="50">50% progress</option>
                <option value="75">75% progress</option>
                <option value="100">100% progress</option>
              </select>
              <button type="submit" className="primary-button">
                + Add Skill
              </button>
            </form>

            {message && <p className="form-message">{message}</p>}

            {skills.map(skill => (
              <div className="skill-row" key={skill.id}>
                <div className="skill-name">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="skill-actions">
                  <label>
                    Progress
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={skill.level}
                      onChange={event =>
                        updateSkill(skill.id, event.target.value)
                      }
                      aria-label={`${skill.name} progress`}
                    />
                  </label>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() =>
                      setSkills(current =>
                        current.filter(item => item.id !== skill.id)
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {skills.length === 0 && (
              <p className="empty-message">
                No skills yet. Add your first skill!
              </p>
            )}
          </div>

          <div className="panel" id="coding">
            <div className="panel-heading">
              <div>
                <h3>Coding Tracker</h3>
                <p>Record your coding practice sessions.</p>
              </div>
              <span className="panel-symbol">⌨</span>
            </div>
            <div className="coding-box">
              <span className="coding-emoji">💻</span>
              <h2>{codingDays} sessions</h2>
              <p>Every practice session helps you improve.</p>
              <button
                className="primary-button"
                type="button"
                onClick={() => setCodingDays(days => days + 1)}
              >
                + Record Practice
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => setCodingDays(0)}
              >
                Reset Count
              </button>
            </div>
            <p className="note">
              This tracker counts sessions, not unique calendar days.
            </p>
          </div>
        </section>

        <section className="panel bottom-panel" id="projects">
          <div className="panel-heading">
            <div>
              <h3>My Projects</h3>
              <p>Build a portfolio of your work.</p>
            </div>
            <span className="journey-icon">🛠️</span>
          </div>
          <form className="feature-form" onSubmit={addProject}>
            <input
              value={projectName}
              onChange={event => setProjectName(event.target.value)}
              placeholder="Project name"
              aria-label="Project name"
              maxLength={80}
              required
            />
            <input
              value={projectLink}
              onChange={event => setProjectLink(event.target.value)}
              placeholder="GitHub URL (optional)"
              aria-label="Project GitHub URL"
              type="url"
            />
            <button className="primary-button" type="submit">
              + Add Project
            </button>
          </form>

          <div className="item-list">
            {projects.map(project => (
              <div className="item-card" key={project.id}>
                <div>
                  <b>{project.name}</b>
                  <p>{project.link || 'No link added'}</p>
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    Open ↗
                  </a>
                )}
                <button
                  className="delete-button"
                  type="button"
                  onClick={() =>
                    setProjects(current =>
                      current.filter(item => item.id !== project.id)
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <p className="empty-message">
              No projects added yet. Add your first project above.
            </p>
          )}
        </section>

        <section className="panel bottom-panel" id="internships">
          <div className="panel-heading">
            <div>
              <h3>Internship Tracker</h3>
              <p>Keep track of your internship applications.</p>
            </div>
            <span className="journey-icon">💼</span>
          </div>
          <form className="feature-form" onSubmit={addInternship}>
            <input
              value={companyName}
              onChange={event => setCompanyName(event.target.value)}
              placeholder="Company name"
              aria-label="Company name"
              maxLength={80}
              required
            />
            <input
              value={role}
              onChange={event => setRole(event.target.value)}
              placeholder="Role (e.g. React Intern)"
              aria-label="Internship role"
              maxLength={80}
              required
            />
            <select
              value={status}
              onChange={event => setStatus(event.target.value)}
              aria-label="Application status"
            >
              <option>Applied</option>
              <option>Assessment</option>
              <option>Interview</option>
              <option>Selected</option>
              <option>Rejected</option>
            </select>
            <button className="primary-button" type="submit">
              + Track Application
            </button>
          </form>

          <div className="item-list">
            {internships.map(item => (
              <div className="item-card" key={item.id}>
                <div>
                  <b>{item.company}</b>
                  <p>{item.role}</p>
                </div>
                <span className="status-pill">{item.status}</span>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() =>
                    setInternships(current =>
                      current.filter(app => app.id !== item.id)
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {internships.length === 0 && (
            <p className="empty-message">
              No applications tracked yet. Add one above.
            </p>
          )}
        </section>

        <section className="panel bottom-panel" id="resume">
          <div className="panel-heading">
            <div>
              <h3>Professional Resume Builder</h3>
              <p>Enter your details and preview your resume live.</p>
            </div>
            <span className="journey-icon">📄</span>
          </div>

          <form
            className="resume-form"
            onSubmit={event => event.preventDefault()}
          >
            <input
              value={fullName}
              onChange={event => setFullName(event.target.value)}
              placeholder="Full name"
              aria-label="Full name"
              maxLength={100}
              required
            />
            <input
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              type="email"
              maxLength={150}
              required
            />
            <input
              value={phone}
              onChange={event => setPhone(event.target.value)}
              placeholder="Phone number"
              aria-label="Phone number"
              type="tel"
              maxLength={25}
              required
            />
            <input
              value={location}
              onChange={event => setLocation(event.target.value)}
              placeholder="City, State"
              aria-label="Location"
              maxLength={100}
            />
            <input
              className="full-width"
              value={education}
              onChange={event => setEducation(event.target.value)}
              placeholder="Education, college and graduation year"
              aria-label="Education"
              maxLength={250}
              required
            />
            <textarea
              className="full-width"
              value={summary}
              onChange={event => setSummary(event.target.value)}
              placeholder="Professional summary: your strengths and career goal"
              aria-label="Professional summary"
              rows={4}
              maxLength={1200}
              required
            />
          </form>

          <div id="resume-print-area" className="resume-preview">
            <div className="preview-heading">
              <h3>Live Resume Preview</h3>
              <p className="note">
                Changes to your details appear here automatically.
              </p>
            </div>

            <article className="resume-paper">
              <h2>{fullName.trim() || 'Your Full Name'}</h2>

              <div className="resume-contact">
                {email || 'your.email@example.com'}
                {phone && ` | ${phone}`}
                {location && ` | ${location}`}
              </div>

              <h3>Professional Summary</h3>
              <p>
                {summary.trim() ||
                  'Write a short summary about your skills, interests and career goals.'}
              </p>

              <h3>Education</h3>
              <p>
                {education.trim() ||
                  'Add your degree, college name and graduation year.'}
              </p>

              <h3>Technical Skills</h3>
              {skills.length ? (
                <ul>
                  {skills.map(skill => (
                    <li key={skill.id}>{skill.name}</li>
                  ))}
                </ul>
              ) : (
                <p>Add your skills in the My Skills section.</p>
              )}

              <h3>Projects</h3>
              {projects.length ? (
                projects.map(project => (
                  <div className="resume-item" key={project.id}>
                    <strong>{project.name}</strong>
                    {project.link && (
                      <p>
                        GitHub:{' '}
                        <a href={project.link}>{project.link}</a>
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p>Add your projects in the My Projects section.</p>
              )}

              <h3>Internship Experience</h3>
              {internships.length ? (
                internships.map(item => (
                  <div className="resume-item" key={item.id}>
                    <strong>{item.role}</strong>
                    <p>
                      {item.company} — Application status: {item.status}
                    </p>
                  </div>
                ))
              ) : (
                <p>Add internship details in the Internship Tracker.</p>
              )}
            </article>

            <div className="resume-actions">
              <button
                className="primary-button"
                type="button"
                onClick={downloadPDF}
              >
                Download / Save as PDF
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => {
                  document.getElementById('resume').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
              >
                Back to Resume Form
              </button>
            </div>
          </div>

          <p className="note">
            PDF tip: click Download / Save as PDF, choose “Save as PDF” in the
            print window, then click Save. Check your details before sharing
            your resume.
          </p>
        </section>

        <footer>Student IT Career Hub · Your future, your journey.</footer>
      </main>
    </div>
  );
}

export default App;
