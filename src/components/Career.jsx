import { useState } from 'react'
import { CAREERS } from '../data/careers'
import ProjectModal from './ProjectModal'

function Career() {
  const [modal, setModal] = useState(null) // { project: work, mode: 'readme' | 'images' }

  return (
    <section id="career" className="section">
      <h2>Career</h2>
      <ul className="career-list">
        {CAREERS.map(({ company, period, description, roles, works }) => (
          <li key={company} className="career-item">
            <div className="career-head">
              <h3>{company}</h3>
              <span className="career-period">{period}</span>
            </div>
            <p className="career-desc">{description}</p>
            <ul className="career-roles">
              {roles.map((role) => (
                <li key={role} className="career-role-tag">
                  {role}
                </li>
              ))}
            </ul>
            <ul className="career-works">
              {works.map((work) => (
                <li key={work.title} className="career-work">
                  <h4>{work.title}</h4>
                  {work.period && (
                    <span className="career-work-period">{work.period}</span>
                  )}
                  {work.stacks?.length > 0 && (
                    <ul className="project-stacks">
                      {work.stacks.map((stack) => (
                        <li key={stack}>{stack}</li>
                      ))}
                    </ul>
                  )}
                  {work.content && (
                    <p className="career-work-content">{work.content}</p>
                  )}
                  {work.url && (
                    <a
                      className="career-work-url"
                      href={work.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      🔗 {work.url}
                    </a>
                  )}
                  {(work.readme || work.docs?.length > 0 || work.media?.length > 0) && (
                    <div className="project-links">
                      {(work.readme || work.docs?.length > 0) && (
                        <button
                          type="button"
                          onClick={() => setModal({ project: work, mode: 'readme' })}
                        >
                          README
                        </button>
                      )}
                      {work.media?.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setModal({ project: work, mode: 'media' })}
                        >
                          미디어
                        </button>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {modal && (
        <ProjectModal
          project={modal.project}
          mode={modal.mode}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  )
}

export default Career
