const ABOUT_ITEMS = [
  { label: '이름', value: '김상명' },
  { label: '생년월일', value: '97.03.25' },
  { label: '거주지', value: '경기 화성시 효행구' },
  { label: '이메일', value: 'ksm4850@gmail.com' },
  { label: '연락처', value: '010-6357-4850' },
  { label: '학력', value: '수원과학대학교 컴퓨터정보과(2년)' },
]

function About() {
  return (
    <section id="about" className="section">
      <h2>About Me</h2>
      <ul className="about-grid">
        {ABOUT_ITEMS.map(({ label, value }) => (
          <li key={label} className="about-item">
            <span className="about-label">{label}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default About
