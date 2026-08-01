import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Career from './components/Career'
import Footer from './components/Footer'
import PrintView from './components/PrintView'
import './App.css'

// ?print 진입 시 PDF용 인쇄 뷰(모달 없이 전체 펼침)를 렌더한다.
const isPrint = new URLSearchParams(window.location.search).has('print')

function App() {
  if (isPrint) return <PrintView />

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Career />
      </main>
      <Footer />
    </>
  )
}

export default App
