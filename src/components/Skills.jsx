import { SKILL_CATEGORIES } from '../data/skills'

function Skills() {
  return (
    <section id="skills" className="section">
      <h2>Skills</h2>
      <div className="skills-grid">
        {SKILL_CATEGORIES.map(({ category, items }) => (
          <div key={category} className="skills-row">
            <h3>{category}</h3>
            <ul className="skills-badges">
              {items.map(({ name, color, darkText }) => (
                <li
                  key={name}
                  className="skill-badge"
                  style={{
                    backgroundColor: color,
                    color: darkText ? '#1a1a1a' : '#ffffff',
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
