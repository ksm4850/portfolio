# CQ — ML 실험 자동화 플랫폼

## 개요

CQ는 연구자가 자신의 PC(GPU)를 워커로 등록하면, AI 에이전트(Claude Code, Codex 등)가 MCP를 통해
원격으로 ML 실험을 설계·실행·모니터링할 수 있는 플랫폼입니다.

기존 ML 실험 워크플로우의 문제를 풀기 위해 시작했습니다:

- 클라우드 GPU는 비용 부담이 크고, 놀고 있는 로컬 GPU는 활용이 어려움
- 실험 실행·기록·비교가 수동이라, 실험이 쌓일수록 "뭘 해봤는지"를 추적하기 어려움
- AI 에이전트로 실험을 자동화하려 해도, 에이전트가 원격 GPU 환경에 접근할 방법이 마땅치 않음

- 팀 구성: 2명 (본인은 웹 프론트엔드를 제외한 백엔드·인프라 전반 담당)
- 담당 영역: Go 기반 core(CLI·워커·MCP)·relay(API 서버), NATS 메시징, DB 설계, 배포 인프라

## 주요 기능

- **워커 등록** — CLI(`cq worker`)로 로컬 PC를 GPU 워커로 등록, 하트비트·GPU 메트릭 자동 수집
- **실험 실행** — AI 에이전트가 MCP 도구로 실험(job)을 제출하면, 큐를 거쳐 적합한 워커에서 실행
- **원격 접근** — 에이전트가 방화벽 뒤 워커의 파일시스템·셸에 접근 (read/write/bash)
- **실험 추적** — 실험 간 계보(parent), 태그, 관계(개선/비교/파생)를 지식 그래프로 관리
- **모니터링** — 웹 대시보드에서 실행 로그·GPU 사용률 실시간 확인, Slack/Dooray 알림

## 기술 스택

- **서버 (relay)**: Go (chi, Huma) — REST API + MCP 릴레이 (클라이언트 WebSocket ↔ 워커 NATS RPC 변환), Supabase(테이블 조회)
- **클라이언트 (CLI·워커 에이전트)**: Go (cobra, MCP SDK) — 사용자 PC에 설치되는 프로그램이라, 런타임 의존성 없이 단일 바이너리로 배포할 수 있는 Go를 선택 (GitHub Release로 5개 플랫폼 크로스컴파일 배포)
- **메시징**: NATS JetStream
- **DB**: Supabase (PostgreSQL + pgvector), Redis
- **인프라**: Docker, AWS ECS, S3 + CloudFront, GitLab CI
