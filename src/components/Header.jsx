const NAV_ITEMS = [
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'career', label: 'Career' },
]

function Header() {
  return (
    <header className="header">
      <nav>
        <a href="#top" className="header-logo">
          Portfolio
        </a>
        <ul className="header-nav">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
