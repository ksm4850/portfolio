import ecsMigration from '../content/projects/ecs-migration.md?raw'
import googleHealth from '../content/projects/google-health.md?raw'
import slamLabeling from '../content/projects/slam-labeling.md?raw'
import slamFeatures from '../content/projects/slam-features.md?raw'
import slamTroubleshooting from '../content/projects/slam-troubleshooting.md?raw'
import cqOverview from '../content/projects/cq-overview.md?raw'
import cqArchitecture from '../content/projects/cq-architecture.md?raw'
import cqDecisions from '../content/projects/cq-decisions.md?raw'
import cqRetro from '../content/projects/cq-retro.md?raw'
import vukaAppApi from '../content/projects/vuka-app-api.md?raw'
import vukaClass from '../content/projects/vuka-class.md?raw'
import vukaSelfCheckin from '../content/projects/vuka-self-checkin.md?raw'
import vukaMobileReceipt from '../content/projects/vuka-mobile-receipt.md?raw'

// 경력 데이터. works: 회사에서 진행한 업무/프로젝트 단위.
// - title / period / content(한 줄 설명)는 필수(없으면 생략 렌더링)
// - stacks: 사용 기술 칩 (선택)
// - readme: src/content/projects/ 아래 md를 ?raw로 import (README 모달, 선택)
// - docs: [{ label, md }] 배열 — README 모달을 탭으로 구성 (readme 대신 사용, 선택)
// - media: public/projects/ 아래 이미지·영상 경로 배열 (미디어 모달, 선택)
// - url: 프로젝트 링크 (선택, content 아래에 표시)
export const CAREERS = [
  {
    company: '플레이아이디어랩',
    period: '2025.08 ~ 재직중',
    description: '"누구나 편하게 AI를 도입하기 위해"',
    roles: ['Backend', 'Infra'],
    works: [
      {
        title: 'Google Health API 기반 건강데이터 수집 백엔드 개발',
        content:
          'Google Health OAuth 연동, 환자정보 수집',
        stacks: ['GCP','Google Health API','Python', 'FastAPI', 'PostgreSQL'],
        readme: googleHealth,
        media: [
          'projects/medias/play/health_chart.png',
        ],
      },
      {
        title: 'ML 실험 자동화 플랫폼 개발',
        period: '2026.05 ~ 진행중',
        content: '로컬 GPU를 워커로 등록해 AI 에이전트가 실험을 설계·실행·추적하는 ML 실험 자동화 플랫폼. 웹 프론트를 제외한 백엔드·인프라 전반 담당',
        stacks: ['Go', 'TypeScript', 'NATS', 'Redis', 'Supabase', 'MCP', 'Claude Code'],
        url: 'http://cq.pilab.co.kr',
        docs: [
          { label: '개요', md: cqOverview },
          { label: '아키텍처', md: cqArchitecture },
          { label: '기술적 고민', md: cqDecisions },
          { label: '회고', md: cqRetro },
        ],
        media: [
          'projects/medias/play/cq-project.png',
          'projects/medias/play/cq-worker.png',
          'projects/medias/play/cq-drive.png',
          'projects/medias/play/cq-graph.png',
        ]
      },
      {
        title: 'AWS 인프라 구축·운영',
        period: '2026.01 ~ 현재',
        content:
          'ECS, EC2, RDS, S3, CloudFront, Route53 운영 및 Docker 기반 컨테이너 환경 구축',
        stacks: ['AWS', 'OpenTofu (Terraform)', 'S3', 'Docker', 'CloudWatch', 'Route53', 'Claude Code'],
      },
      {
        title: '서버 배포환경 ECS 전환',
        period: '2026.01 ~ 현재',
        content:
          'NCP 개별 서버 운영 → Docker Swarm 통합(비용 최적화) → AWS ECS 전환(운영 편의성·안정성)으로 단계적 개선. IaC(OpenTofu) 도입 및 배포 자동화',
        stacks: ['Docker Swarm', 'Traefik', 'AWS ECS', 'ALB', 'OpenTofu (Terraform)'],
        readme: ecsMigration,
      },
      {
        title: '이미지 라벨링 서비스 개발',
        period: '2025.08 ~ 진행중',
        content: '2D/3D 라벨링 툴 및 모델 생성 서비스 및 온프레미스 환경 구축',
        stacks: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'Redis', 'RabbitMQ', 'MinIO'],
        docs: [
          { label: '개요', md: slamLabeling },
          { label: '기능 개발', md: slamFeatures },
          { label: '문제 해결', md: slamTroubleshooting },
        ],
        media: [
          'projects/medias/play/autolabeling.mp4',
          'projects/medias/play/smartpolygon.mp4'
        ],
        url : 'https://slam.pilab.co.kr'
      },
    ],
  },
  {
    company: '한국미용데이터',
    period: '2023.02 ~ 2024.05',
    description: '미용관련 CRM, 자사몰, 미용강의 서비스 플랫폼',
    roles: ['Backend', 'Frontend', 'Infra'],
    works: [
      {
        title: '앱 API 개발 및 유지보수',
        period: '2023.02 ~ 퇴사',
        content:
          'CRM, 미용마켓, 클래스를 제공하는 자사 앱의 API 개발. Classic ASP 레거시를 FastAPI로 마이그레이션하고 본인인증 기반 계정 통합, 소셜 로그인, 간편결제를 개발',
        stacks: ['Python', 'FastAPI', 'MSSQL', 'PostgreSQL', 'AWS'],
        readme: vukaAppApi,
        media: [
          'projects/medias/kbd/app1.jpg',
          'projects/medias/kbd/app2.jpg',
          'projects/medias/kbd/app3.jpg',
          'projects/medias/kbd/app4.jpg'
        ],
        url : 'https://pro.vuka.co.kr'
      },
      {
        title: '미용 인터넷 강의',
        period: '2023.10 ~ 퇴사',
        content:
          '앱 내 미용 인터넷 강의 플랫폼. 앱을 제외한 백엔드·관리자 페이지를 초기 설계부터 개발, 배포까지 단독 담당',
        stacks: ['Python', 'FastAPI', 'Svelte', '인앱결제', 'Vimeo'],
        readme: vukaClass,
        media: [
          'projects/medias/kbd/class1.jpg',
          'projects/medias/kbd/class2.jpg',
          'projects/medias/kbd/class3.jpg',
          'projects/medias/kbd/class4.jpg',
          'projects/medias/kbd/class5.png',
          'projects/medias/kbd/class6.png',
          'projects/medias/kbd/class7.png',
        ],
      },
      
      {
        title: '셀프체크인',
        period: '2023.06 ~ 2023.07',
        content:
          '1인 미용 매장을 위한 태블릿 전용 셀프체크인 앱. 웹 프론트와 API 개발',
        stacks: ['Python', 'FastAPI', 'Classic ASP', 'jQuery', 'MSSQL'],
        readme: vukaSelfCheckin,
        media:[
          'projects/medias/kbd/self1.jpg',
          'projects/medias/kbd/self2.jpg',
          'projects/medias/kbd/self3.jpg',
          'projects/medias/kbd/self4.jpg',
          'projects/medias/kbd/self5.jpg',
          'projects/medias/kbd/self6.jpg',
          'projects/medias/kbd/self7.jpg',
        ]
      },
      {
        title: '모바일영수증',
        period: '2023.06 ~ 2023.07',
        content:
          '매장 결제 완료 시 고객에게 모바일영수증 알림톡을 발송하는 기능. 단독 개발',
        stacks: ['Python', 'FastAPI', 'Jinja2', 'MSSQL', 'PostgreSQL'],
        readme: vukaMobileReceipt,
        media: [
          'projects/medias/kbd/receipt1.jpg',
          'projects/medias/kbd/receipt2.jpg',
          'projects/medias/kbd/receipt3.png',
        ],
      },
    ],
  },
  {
    company: '모은넷',
    period: '2022.04 ~ 2023.01',
    description: 'MVNO 알뜰폰 통신 솔루션 개발사',
    roles: ['Backend', 'Frontend'],
    works: [
      {
        title: '알뜰폰 솔루션 유지보수 및 개발',
        period: '2022.04 ~ 퇴사',
        stacks: [ 'ASP.NET', 'MSSQL' ],
        content: '',
      },
      {
        title: '티플러스 고객센터 앱 개발',
        period: '2022.09 ~ 퇴사',
        content: '고객사 알뜰폰 고객센터 앱 개발',
      },
    ],
  },
]
