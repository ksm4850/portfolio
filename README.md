# Portfolio

김상명 개인 포트폴리오 웹사이트. React + Vite로 제작했으며, GitHub Actions를 통해 GitHub Pages에 자동 배포됩니다.

## 기술 스택

- **Frontend:** React 19, Vite 8
- **Markdown 렌더링:** react-markdown, remark-gfm
- **Lint:** Oxlint
- **배포:** GitHub Pages (GitHub Actions)

## 개발

```bash
pnpm install   # 의존성 설치
pnpm dev       # 개발 서버 실행
pnpm build     # 프로덕션 빌드 (dist/)
pnpm preview   # 빌드 결과 미리보기
pnpm lint      # 린트
```

## 배포

`main` 브랜치에 push하면 `.github/workflows/deploy.yml` 워크플로우가 자동으로 빌드 후 GitHub Pages에 배포합니다.

## 구조

```
src/
├── components/        # UI 컴포넌트 (Hero, About, Skills, Career 등)
├── content/projects/  # 프로젝트 상세 내용 (Markdown)
└── data/              # 경력·기술 스택 데이터
```
