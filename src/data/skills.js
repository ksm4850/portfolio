// 기술 스택 데이터. color는 각 기술의 시그니처(브랜드) 컬러.
// darkText: true면 밝은 배경색이라 글자를 어둡게 표시.
export const SKILL_CATEGORIES = [
  {
    category: 'Language',
    items: [
      { name: 'Python', color: '#3776AB' },
      { name: 'Go', color: '#00ADD8' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'JavaScript', color: '#F7DF1E', darkText: true },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'FastAPI', color: '#009688' },
      { name: 'Supabase', color: '#3ECF8E', darkText: true },
      { name: 'Huma', color: '#00758D' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'Redis', color: '#DC382D' },
      { name: 'NATS', color: '#27AAE1' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'Svelte', color: '#FF3E00' },
      { name: 'React', color: '#61DAFB', darkText: true },
      { name: 'Vite', color: '#646CFF' },
    ],
  },
  {
    category: 'DevOps / Infra',
    items: [
      { name: 'Docker', color: '#2496ED' },
      { name: 'Docker Swarm', color: '#1D63ED' },
      { name: 'AWS', color: '#FF9900', darkText: true },
      { name: 'NCP', color: '#03C75A' },
      { name: 'OpenTofu', color: '#FFDA18', darkText: true },
      { name: 'Nginx', color: '#009639' },
      { name: 'Traefik', color: '#24A1C1' },
      { name: 'GitLab', color: '#FC6D26' },
      { name: 'Linux', color: '#FCC624', darkText: true },
    ],
  },
]
