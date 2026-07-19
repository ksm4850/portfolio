import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// mode: 'readme' | 'media'
// readme 모달은 project.docs([{ label, md }])가 있으면 탭으로, 없으면 project.readme 단일 문서로 표시
function ProjectModal({ project, mode, onClose }) {
  const [index, setIndex] = useState(0)
  const [tab, setTab] = useState(0)
  const bodyRef = useRef(null)
  const images = project.media ?? []
  const docs =
    project.docs ?? (project.readme ? [{ label: 'README', md: project.readme }] : [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (mode === 'media' && images.length > 1) {
        if (e.key === 'ArrowLeft')
          setIndex((i) => (i - 1 + images.length) % images.length)
        if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, mode, images.length])

  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0)
  }, [tab])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{project.title}</h3>
          <button type="button" className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        {mode === 'readme' && docs.length > 1 && (
          <div className="modal-tabs">
            {docs.map(({ label }, i) => (
              <button
                key={label}
                type="button"
                className={tab === i ? 'active' : ''}
                onClick={() => setTab(i)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
        <div className="modal-body" ref={bodyRef}>
          {mode === 'readme' ? (
            <div className="markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {docs[tab]?.md}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="carousel">
              {/\.(mp4|webm|mov)$/i.test(images[index]) ? (
                <video src={images[index]} controls key={images[index]} />
              ) : (
                <img src={images[index]} alt={`${project.title} ${index + 1}`} />
              )}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="carousel-nav carousel-prev"
                    onClick={() =>
                      setIndex((i) => (i - 1 + images.length) % images.length)
                    }
                    aria-label="이전 미디어"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="carousel-nav carousel-next"
                    onClick={() => setIndex((i) => (i + 1) % images.length)}
                    aria-label="다음 미디어"
                  >
                    ›
                  </button>
                  <span className="carousel-counter">
                    {index + 1} / {images.length}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
