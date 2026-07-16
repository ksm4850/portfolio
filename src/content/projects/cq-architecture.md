# 아키텍처

## 전체 구조

![아키텍처](projects/medias/play/cq-architecture.png)

통신은 크게 두 갈래로 나뉩니다.

- **클라이언트(CLI·웹) → 백엔드** — 역할에 따라 붙는 곳이 다르다.
  **Relay**에는 워커 실시간 상태·조작(job 제어, 터미널 등)을 위해 붙는다 — CLI는 WebSocket(MCP)·REST,
  웹은 REST API. **Supabase**에는 저장된 데이터(실험 정의·run·수집된 메트릭 이력) 조회를 위해 REST로 붙는다.
- **워커 ↔ 백엔드** — 워커와 Relay의 런타임 통신은 **전부 NATS**로만 이뤄진다(REST는 워커 등록 등
  컨트롤 플레인 한정). 워커가 방화벽 뒤에서 아웃바운드로 NATS에 붙기 때문에 인바운드 포트가 필요 없다.

## 프로젝트 구조

도메인 단위로 분리한 모노레포다.

```
workflow-pilot/
├── core/       # Go - CLI · MCP 서버 · 워커 에이전트(harness)
├── relay/      # Go - REST API · MCP 릴레이 · NATS 인증 콜아웃
├── nats/       # NATS JetStream 설정 · NKey/JWT 인증
├── supabase/   # PostgreSQL 마이그레이션, RPC, Edge Functions(임베딩·검색)
└── web/        # React - 홈페이지
```

## 구성요소

- **core (Go)** — 사용자 PC에 설치되는 CLI + 워커 에이전트 + MCP 서버.
  워커 실행 엔진(harness)이 GPU 풀 할당(CUDA_VISIBLE_DEVICES), preflight 환경 검증(Python/CUDA/디스크),
  PTY 셸 실행, 아티팩트 자동 수집을 담당. MCP 서버는 에이전트의 read/write/bash 요청을 처리
- **relay (Go)** — REST API(job 제출·워커 관리) + **MCP 릴레이**(클라이언트 WebSocket 요청을
  NATS RPC로 변환해 워커에 전달) + **NATS 인증 콜아웃**(워커별 JWT 동적 발급). job 큐잉·상태 전이,
  메트릭 집계를 담당. 상태 캐시로 Redis, 이력 저장으로 Supabase를 사용
- **NATS JetStream** — relay ↔ 워커 간 **유일한 런타임 통신 채널**. job 명령과 워커 RPC(MCP)는
  request-reply(`wp.worker.{id}.rpc`)로, 실행 progress·디버그 로그는 JetStream 스트림
  (`JOB_PROGRESS`·`WORKER_STREAMS`)으로 처리. 메시지 지속성으로 relay 재시작 중에도 유실 방지
- **Supabase (PostgreSQL + pgvector)** — 실험 정의·run·수집된 메트릭 이력·지식 그래프 저장,
  사용자·CLI 인증(Auth). Edge Function으로 실험 임베딩(`embed-jobs`)·하이브리드 검색(`hybrid-search`) 제공
- **Redis** — 워커 하트비트·가용 VRAM 등 고빈도 갱신 상태 캐시. Relay 수평 확장 시 공유 상태 역할
- **web (React)** — 브라우저 대시보드(S3+CloudFront 호스팅). Supabase에 REST로 저장된 실험·run·메트릭을
  조회하고, Relay REST API로 워커·job을 관리·조작한다. (본인 담당 영역 아님)

## 데이터 흐름 (실험 1회 실행)

1. 에이전트가 MCP 도구로 job 제출 → relay가 큐에 등록
2. relay가 NATS로 대상 워커에 실행 명령 발행 (워커는 자기 subject를 구독)
3. 워커가 GPU 할당 → 환경 검증 → 실행, progress·로그를 NATS 스트림으로 발행하고 relay가 수신
4. 완료 시 아티팩트 수집·업로드, job 상태 전이 (QUEUED → RUNNING → DONE/FAILED)
5. run은 특정 코드 커밋(스토리지 기반 content-addressed 스냅샷)을 참조해 실행되므로, 같은 커밋으로 되돌려 재현 가능
