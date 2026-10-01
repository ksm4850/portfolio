# 디지털 피노타이핑 연구 플랫폼

## 개요

연구 참가자의 스마트폰 센서·시스템 이벤트와 웨어러블(Google Health) 데이터를 수집하고,
연구자가 어드민 대시보드에서 연구·참여자·설문·자료를 관리하는 연구 플랫폼입니다.
현재 운영 중이며 실데이터를 수집하고 있습니다.

- 수집 대상: 화면, 앱 사용, 알림, 통화·문자, 위치, 텍스트 입력 등 스마트폰 이벤트 + 웨어러블 건강데이터
- 구성: Android 수집 앱 / 수집 서버(FastAPI) / 어드민 대시보드(React)
- 담당: **백엔드 전담**, 프론트엔드 약 30~40%, 배포 인프라·참여자 앱 배포 (Android 앱 개발은 담당 외)

## 주요 기능

- **스마트폰 데이터 수집** - QR 등록 코드로 기기를 등록하고, 센서·시스템 이벤트를 대량 수집
- **웨어러블 연동** - Google Health OAuth 동의 후 심박·활동·수면 데이터를 스케줄링으로 동기화
- **수집 타임라인** - 참가자별로 여러 센서·웨어러블 레인을 한 화면에서 시간축으로 확인
- **지표 산출** - 원자료를 일 단위 지표(앱 사용 시간, 신체활동, 수면 등)로 서버에서 계산
- **설문/EMA** - 알림 시각별 응답 가능 시간, 조건부 문항, 시각·숫자 문항, 부분 응답 기록
- **자료 내보내기** - 지표별 가공 표를 CSV/엑셀/ZIP으로 생성해 S3에 보관, 연구·참여자·설문 회차 단위
- **운영** - 참여자 엑셀 일괄 등록, 연구원 계정 관리(Keycloak), 웨어러블 기기 대장, 앱 APK 배포

## 기술 스택

- **백엔드**: Python 3.14, FastAPI, SQLAlchemy 2.0(asyncio)/asyncpg, Alembic, dependency-injector, APScheduler, orjson, openpyxl, uv
- **DB**: PostgreSQL + TimescaleDB(hypertable, 압축 정책)
- **인증**: Keycloak(OIDC, JWKS 로컬 검증), Google OAuth
- **외부 연동**: Google Health API, S3(boto3)
- **품질**: pytest + testcontainers(실제 TimescaleDB), ruff, mypy, import-linter
- **프론트**: React 18, TypeScript, Vite, Ant Design, TanStack React Query, ECharts, Playwright
- **인프라**: Docker, AWS ECS(Graviton)·ECR·ALB, S3 + CloudFront
