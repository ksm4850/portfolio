# 아키텍처

## 전체 구조

- **Android 수집 앱 → 수집 서버** - 기기 토큰으로 인증해 센서·이벤트를 배치 업로드하고,
  주기적인 폴링 한 번으로 참가자·연구·설문 설정을 모두 받아갑니다(앱이 서버 푸시를 받지 않음).
- **어드민 대시보드 → 수집 서버** - Keycloak 로그인 후 httpOnly 쿠키로 API 호출.
- **수집 서버 → 외부** - Google Health API로 웨어러블 데이터를 스케줄링 수집하고, 내보내기 파일은 S3에 보관.
- **배포** - 백엔드는 AWS ECS, 프론트는 S3 + CloudFront. CloudFront가 `/api/*`는 ALB(백엔드)로, 나머지는 S3로 보냄.

## 백엔드 계층 구조

```
src/
├── interfaces/      # FastAPI 앱, 스케줄러, 워커 진입점
├── usecases/        # 모듈 간 흐름 조합 + 트랜잭션 경계 (약 24개)
├── modules/         # 도메인 모듈 (subjects, studies, surveys, responses, events,
│   │                #   metrics, devices, wearables, google_health, exports ...)
│   └── <module>/    #   router → service → repository → models
└── infrastructure/  # DB 세션, Keycloak, Google, S3 클라이언트
```

- **모듈은 서로 의존하지 않음** - 여러 모듈이 엮이는 흐름은 usecases 계층에서만 조합하고, 트랜잭션 경계도 여기서 잡습니다.
- **조인 기준** - 한 행이 여러 테이블에서 오는 경우에만 유즈케이스에서 ORM 조인을 사용. 이전에는 각 모듈에서 따로 불러와
  앱에서 합치다 보니 페이지네이션·필터가 어긋나는 오류가 있었는데, 기준을 세워 이를 없앴습니다.
- **규칙을 도구로 강제** - 계층 방향을 문서로만 두지 않고 import-linter·ruff로 CI에서 차단, mypy로 타입 검사.

## 인증 - 사용 주체별 분리

- **어드민(연구자)** - Keycloak Authorization Code 흐름. 토큰은 JWKS로 로컬 검증해 매 요청마다 Keycloak을 호출하지 않고,
  httpOnly 쿠키로 전달. L1~L3 역할로 권한 구분.
- **수집 기기** - 참가자가 QR 등록 코드로 기기를 등록하면 기기 토큰 발급. 만료 없이 **폐기로만 무효화**해
  장기간 무인 수집이 끊기지 않게 하고, 재설치 시 재등록·토큰 재발급, 비활성 참가자 차단을 지원.

## 테스트 구조

테스트를 목적에 따라 3계층으로 재구성했습니다.

- **integration** - HTTP 요청 + 실제 DB로 API 전체 흐름 검증
- **services** - 저장소를 목으로 대체해 비즈니스 로직만 검증
- **repositories** - testcontainers로 띄운 실제 TimescaleDB에서 쿼리 검증, 테스트마다 롤백으로 격리
