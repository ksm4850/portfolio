import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Career from './components/Career'
import Footer from './components/Footer'
import './App.css'

function App() {
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
