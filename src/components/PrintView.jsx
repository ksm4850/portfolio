import { Fragment } from 'react'
import { PROFILE, DECK, SKILLS } from '../data/print'
import '../print.css'

// PDF 전용 슬라이드 덱. 웹 컴포넌트를 재활용하지 않고 인쇄용으로 새로 구성한다.
// 표지 → 프로필/스킬 → 프로젝트(한 장씩) 순. 데이터는 print.js에서 큐레이션.

function Cover() {
  return (
    <section className="slide slide-cover">
      <div className="cover-inner">
        <p className="cover-eyebrow">Portfolio</p>
        <h1 className="cover-name">{PROFILE.name}</h1>
        <p className="cover-tagline">{PROFILE.tagline}</p>
        <div className="cover-roles">
          {PROFILE.roles.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
        <ul className="cover-contacts">
          {PROFILE.contacts.map(({ label, value }) => (
            <li key={label}>
              <span className="cover-contact-label">{label}</span>
              {value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function SkillsSlide() {
  return (
    <section className="slide slide-skills">
      <h2 className="slide-section-title">Skills</h2>
      <div className="skills-block">
        {SKILLS.map(({ category, items }) => (
          <div key={category} className="skills-line">
            <h3>{category}</h3>
            <div className="skills-chips">
              {items.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectSlide({ company, project, showCompany }) {
  const { title, period, role, summary, stacks, highlights, hero, url, metric } =
    project
  return (
    <section className="slide slide-project">
      {showCompany && (
        <div className="slide-company">
          {company.company}
          <span className="slide-company-desc">{company.description}</span>
        </div>
      )}

      <header className="proj-head">
        <div className="proj-title-row">
          <h2>{title}</h2>
          <span className="proj-period">{period}</span>
        </div>
        <div className="proj-meta">
          {role && <span className="proj-role">{role}</span>}
          {url && (
            <a className="proj-url" href={url}>
              🔗 {url}
            </a>
          )}
        </div>
        <p className="proj-summary">{summary}</p>
        <div className="proj-stacks">
          {stacks.map((s) => (
            <span key={s} className="chip chip-outline">
              {s}
            </span>
          ))}
        </div>
      </header>

      <div className="proj-body">
        <div className="proj-body-main">
          {metric && (
            <div className="proj-metric">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          )}
          <ul className="proj-highlights">
            {highlights.map(({ head, body }) => (
              <li key={head}>
                <p className="hl-head">{head}</p>
                <p className="hl-body">{body}</p>
              </li>
            ))}
          </ul>
        </div>

        {hero && (
          <figure className="proj-figure">
            <img src={hero} alt={title} />
          </figure>
        )}
      </div>
    </section>
  )
}

function GallerySlide({ title, images }) {
  return (
    <section className="slide slide-gallery">
      <div className="gallery-head">
        {title} <span>화면</span>
      </div>
      <div className="gallery-grid">
        {images.map((src) => (
          <figure key={src}>
            <img src={src} alt={title} />
          </figure>
        ))}
      </div>
    </section>
  )
}

function PrintView() {
  return (
    <div className="deck">
      <Cover />
      <SkillsSlide />
      {DECK.map((company) =>
        company.projects.map((project, i) => {
          const gallery = project.images ?? []
          return (
            <Fragment key={project.title}>
              <ProjectSlide
                company={company}
                project={project}
                showCompany={i === 0}
              />
              {gallery.length > 0 && (
                <GallerySlide title={project.title} images={gallery} />
              )}
            </Fragment>
          )
        }),
      )}
    </div>
  )
}

export default PrintView
