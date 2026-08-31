// PDF(인쇄) 전용 큐레이션 데이터. 웹 careers.js와 별개로, 각 프로젝트를
// 슬라이드 한 장 분량으로 추린 핵심(highlights)·대표 이미지·성과 지표를 담는다.
// md 원문을 그대로 넣지 않고 요약해 재구성한다.

export const PROFILE = {
  name: '김상명',
  tagline: '본질에 집중하는 개발자',
  roles: ['Backend', 'Infra'],
  contacts: [
    { label: 'Email', value: 'ksm4850@gmail.com' },
    { label: 'Phone', value: '010-6357-4850' },
    { label: '거주', value: '경기 화성시' },
    { label: '학력', value: '수원과학대학교 컴퓨터정보과' },
  ],
}

// media 경로는 public/ 기준(영상 제외).
// - hero: 설명 페이지 오른쪽에 싣는 대표 이미지 (선택 — 넣거나 빼기 가능)
// - images: 설명 페이지 뒤 갤러리 페이지에 2열로 싣는 이미지들 (선택)
// hero와 images는 서로 독립적이다.
export const DECK = [
  {
    company: '플레이아이디어랩',
    period: '2025.08 ~ 재직중',
    description: '"누구나 편하게 AI를 도입하기 위해"',
    projects: [
      {
        title: 'Google Health API 기반 건강데이터 수집 백엔드 개발',
        stacks: ['Google Health API', 'OAuth', 'Cron', 'FastAPI', 'PostgreSQL'],
        highlights: [
          {
            head: 'Google Health OAuth 연동',
            body: 'Google Health OAuth(서버사이드 authorization code) 연동',
          },
          {
            head: '수집 자동화',
            body: '매시 오늘치 재수집 + 매일 04시 전날 확정 크론으로 수집 자동화 — 덮어쓰기 방식이라 실패해도 다음 틱에 자가복구',
          },
        ],
      },
      {
        title: 'ML 실험 자동화 플랫폼',
        period: '2026.05 ~ 진행중',
        role: '웹 프론트 제외 백엔드·인프라 전반',
        summary:
          '로컬 GPU를 워커로 등록하면 AI 에이전트가 MCP로 원격 ML 실험을 설계·실행·추적하는 플랫폼',
        stacks: ['Go', 'NATS', 'Redis', 'Supabase', 'MCP', 'AWS ECS', 'Claude Code'],
        highlights: [
          {
            head: '단일 바이너리로 CLI·MCP·워커 제공',
            body: 'Go 단일 바이너리 하나가 CLI·MCP 서버·워커 에이전트를 모두 담당 — 런타임 의존성 없이 5개 플랫폼(Linux·macOS·Windows)으로 크로스컴파일해 GitHub Release·설치 스크립트로 배포',
          },
          {
            head: '방화벽 뒤 워커 원격 제어',
            body: '워커·릴레이 모두 NATS에 아웃바운드로만 연결하도록 토폴로지를 역전 — 인바운드 포트 없이 request-reply·JetStream으로 실행·로그를 처리',
          },
          {
            head: 'LLM이 짠 코드의 안전 실행',
            body: '실행 경로를 하네스로 강제해 임의 명령을 차단, 격리·재현 가능한 실험만 배정된 GPU에서 실행',
          },
          {
            head: '실험 지식 그래프',
            body: '태그·계보·관계 3계층 + 어휘·임베딩 하이브리드 검색(RRF)으로 이름이 달라도 유사 실험 탐색',
          },
          
        ],
        hero: 'projects/medias/play/cq-main.png',
        images: [
          'projects/medias/play/cq-project.png',
          'projects/medias/play/cq-graph.png',
          'projects/medias/play/cq-worker.png',
          'projects/medias/play/cq-drive.png',
        ],
        url: 'http://cq.pilab.co.kr',
      },
      {
        title: '서버 배포환경 ECS 전환',
        period: '2026.01 ~ 현재',
        role: '단독 담당',
        summary:
          'NCP 개별 서버 → Docker Swarm 통합(비용) → AWS ECS 전환(운영 편의)으로 단계적 개선',
        stacks: ['Docker Swarm', 'Traefik', 'AWS ECS', 'ALB', 'OpenTofu'],
        highlights: [
          {
            head: '1차 · Swarm 통합',
            body: '수동 서버 배치를 스케줄러 기반으로 전환, Traefik 단일 진입점·RDS 일원화·네트워크 격리로 서버 수와 유휴 리소스 절감',
          },
          {
            head: '2차 · ECS 전환',
            body: 'Graviton bin-packing·ALB+ACM·EFS·SSM 등 관리형으로 대체해 EC2 프로비저닝·로깅·모니터링 자체 운영 부담 축소',
          },
          {
            head: 'IaC 전면 도입 (OpenTofu)',
            body: '기존 VPC·RDS는 참조만, task definition ignore_changes로 배포와 인프라 경계를 분리, 시크릿은 SSM에만 보관',
          },
        ],
        // hero: 
        images: [
          'projects/medias/play/infra_ncp.png',
          'projects/medias/play/infra_swarm.png',
          'projects/medias/play/infra_ecs.png',
        ],
      },
      {
        title: '이미지 라벨링 서비스',
        period: '2025.08 ~ 진행중',
        role: '백엔드·인프라 전반',
        summary:
          '라벨링하면 자동으로 AI 모델이 학습되는 2D/3D 라벨링 플랫폼. 온프레미스 원박스 배포까지 담당',
        stacks: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'RabbitMQ'],
        highlights: [
          {
            head: '스마트·오토 라벨링',
            body: '객체를 선택하면 자동으로 폴리곤이 그려지는 스마트 라벨링(모델 학습 전에도 기본 객체탐지)과, 학습된 모델로 클래스별 객체를 자동 탐지하는 오토 라벨링 기능 개발',
          },
          {
            head: '라벨링 연동 자동 모델 학습',
            body: '라벨링 작업이 쌓이면 AI 모델이 자동 학습되는 파이프라인과 파일 드라이브(데이터셋 업로드·export) 백엔드 담당 — 2D Detection·Segmentation 지원',
          },
          {
            head: 'DGX-Spark 온프레미스 원박스 배포',
            body: '폐쇄망에서 부팅 시 호스트 IP를 자동 감지하는 init 스크립트로, 재부팅만으로 전 스택이 새 IP에 맞춰 기동',
          },
        ],
        hero: 'projects/medias/play/slam_main.png',
        images: [
          'projects/medias/play/slam_tool.png',
        ],
        url: 'https://slam.pilab.co.kr',
      },
      {
        title: 'AWS 인프라 구축·운영',
        period: '2026.01 ~ 현재',
        role: '단독 담당',
        summary:
          'ECS·EC2·RDS·S3·CloudFront·Route53 운영 및 Docker 기반 컨테이너 환경 구축',
        stacks: ['AWS', 'OpenTofu', 'Docker', 'CloudWatch', 'Route53'],
        highlights: [
          {
            head: '관리형 인프라 운영',
            body: 'ECS·RDS·S3·CloudFront 등 AWS 전반을 운영하며 배포·모니터링을 관리형으로 일원화',
          },
          {
            head: 'IaC 기반 운영',
            body: 'OpenTofu로 인프라를 코드화해 변경을 리뷰·이력으로 추적, 배포 자동화',
          },
        ],
      },
    ],
  },
  {
    company: '한국미용데이터',
    period: '2023.02 ~ 2024.05',
    description: '미용 CRM·자사몰·미용강의 서비스 플랫폼',
    projects: [
      {
        title: '앱 API 개발 및 유지보수',
        period: '2023.02 ~ 퇴사',
        role: '백엔드 (2인)',
        summary:
          'CRM·미용마켓·클래스를 한 곳에서 제공하는 자사 앱 API. Classic ASP 레거시를 FastAPI로 마이그레이션',
        stacks: ['Python', 'FastAPI', 'MSSQL', 'PostgreSQL', 'AWS'],
        highlights: [
          {
            head: '레거시 마이그레이션',
            body: 'Classic ASP+IIS → FastAPI+Ubuntu로 이전, 인프라도 AWS(ECS·RDS·S3)로 이관',
          },
          {
            head: '본인인증 기반 계정 통합',
            body: '전화번호 식별의 한계를 나이스 본인인증 CI값 기준으로 흩어진 계정 통합, 간편결제 개발',
          },
          {
            head: '소셜 로그인',
            body: '카카오·애플 간편 로그인 개발 및 레거시(ASP·jQuery) 유지보수 병행',
          },
        ],
        // hero: 
        images: [
          'projects/medias/kbd/app1.jpg',
          'projects/medias/kbd/app2.jpg',
          'projects/medias/kbd/app3.jpg',
          'projects/medias/kbd/app4.jpg',
        ],
        url: 'https://pro.vuka.co.kr',
      },
      {
        title: '미용 인터넷 강의',
        period: '2023.10 ~ 퇴사',
        role: '앱 제외 전 영역 단독 (초기 설계~배포)',
        summary: '앱 안에서 미용 인터넷 강의를 수강하는 플랫폼. 백엔드·웹 프론트·관리자 단독 담당',
        stacks: ['Python', 'FastAPI', 'Svelte', '인앱결제', 'Vimeo'],
        highlights: [
          {
            head: '강의 API + Vimeo 연동',
            body: 'FastAPI 기반 클래스 API와 Vimeo API를 이용한 강의 영상 처리(웹뷰)',
          },
          {
            head: '관리자 페이지 단독 개발',
            body: 'Svelte+FastAPI로 강좌·카테고리·배너 관리, 문자/알림톡/푸시 발송 기능 개발',
          },
          {
            head: '인앱결제',
            body: '구글·애플 인앱결제 영수증 검증 후 자사 서비스 연동. git init부터 배포까지 전체 사이클을 처음으로 단독 진행',
          },
        ],
        // hero: 
        images: [
          'projects/medias/kbd/class1.jpg',
          'projects/medias/kbd/class2.jpg',
          'projects/medias/kbd/class3.jpg',
          'projects/medias/kbd/class4.jpg',
        ],
      },
      {
        title: '셀프체크인 · 모바일영수증',
        period: '2023.06 ~ 2023.07',
        role: '웹 프론트·API 담당 / 단독',
        summary: '1인 매장용 태블릿 셀프체크인 앱과, 결제 완료 시 모바일영수증 알림톡 발송 기능',
        stacks: ['Python', 'FastAPI', 'jQuery', 'Jinja2', 'MSSQL'],
        highlights: [
          {
            head: '셀프체크인 (태블릿 하이브리드 앱)',
            body: '셀프체크인 웹 프론트(jQuery)·API(FastAPI) 개발, 체크인 완료 시 미용사 알림톡 발송 연동',
          },
          {
            head: '모바일영수증 (단독 개발)',
            body: '결제 완료 시 영수증 저장·알림톡 발송, 현금영수증 발급 시 정보 업데이트, Jinja2 기반 영수증 웹 페이지 개발',
          },
        ],
        // hero: 
        images: [
          'projects/medias/kbd/self1.jpg',
          'projects/medias/kbd/self2.jpg',
          'projects/medias/kbd/receipt1.jpg',
          'projects/medias/kbd/receipt2.jpg',
        ],
      },
    ],
  },
  {
    company: '모은넷',
    period: '2022.04 ~ 2023.01',
    description: 'MVNO 알뜰폰 통신 솔루션 개발사',
    projects: [
      {
        title: '알뜰폰 솔루션 · 고객센터 앱',
        period: '2022.04 ~ 퇴사',
        role: 'Backend / Frontend',
        summary: '알뜰폰 통신 솔루션 유지보수·개발 및 티플러스 고객센터 앱 개발',
        stacks: ['ASP.NET', 'MSSQL'],
        highlights: [
          {
            head: '알뜰폰 솔루션 유지보수·개발',
            body: 'MVNO 통신 솔루션의 기능 개발과 유지보수 담당',
          },
          {
            head: '티플러스 고객센터 앱',
            body: '고객사 알뜰폰 고객센터 앱 개발',
          },
        ],
      },
    ],
  },
]

export const SKILLS = [
  { category: 'Language', items: ['Python', 'Go', 'TypeScript', 'JavaScript'] },
  { category: 'Backend', items: ['FastAPI', 'Supabase', 'PostgreSQL', 'Redis', 'NATS'] },
  { category: 'Frontend', items: ['Svelte', 'React', 'Vite'] },
  {
    category: 'DevOps / Infra',
    items: ['Docker', 'AWS', 'NCP', 'MinIO', 'OpenTofu', 'Nginx', 'Traefik', 'GitHub', 'GitLab'],
  },
]
